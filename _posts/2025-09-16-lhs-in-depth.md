---
layout: post
title: "Latin Hypercube Sampling In Depth"
date: 2025-09-16
tags: [statistics, metareason]
---

Tonight I got home after work and sat down in my office to do a little work on MetaReason. It has been a couple weeks since I worked on the core. I went through the code, reviewing things, and landed on the implementation of [Latin Hypercube Sampling](https://en.wikipedia.org/wiki/Latin_hypercube_sampling).

It has been a while since I thought about LHS so I decided to do a deep dive. Let's take a look.

## High Level LHS

Latin Hypercube sampling is a Monte Carlo technique of evenly sampling randomly from a distribution or sample space. Where normal random sampling is like throwing random darts over a space, LHS is like playing Sudoku, where a square is evenly divided into a grid. LHS ensures that a sample is placed in every single row and column, kind of like bins. That is how I implemented it in the simple LHS sampler in a previous post. 

This sampling technique offers superior coverage and is very valuable for running experiments, like those I'm doing in MetaReason. 

Here is a simple LHS implementation that uses the Latin Hypercube class from [Scipy.stats.qmc](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.qmc.LatinHypercube.html) and compares to random sampling.

```python

import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import qmc

n_samples = 50
n_dimensions = 2

sampler = qmc.LatinHypercube(d=n_dimensions, seed=42)
lhs_samples = sampler.random(n=n_samples)
random_samples = np.random.rand(n_samples, n_dimensions)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6), sharex=True, sharey=True)

ax1.scatter(lhs_samples[:, 0], lhs_samples[:, 1], c='blue', s=50, alpha=0.7)
ax1.set_title(f'Latin Hypercube Sampling ({n_samples} points)', fontsize=14)
ax1.set_xlabel('Parameter 1')
ax1.set_ylabel('Parameter 2')
ax1.set_aspect('equal', adjustable='box')
ax1.grid(True, which='both', linestyle='--', linewidth=0.5)
ax1.set_xticks(np.linspace(0, 1, n_samples + 1), minor=True)
ax1.set_yticks(np.linspace(0, 1, n_samples + 1), minor=True)
ax1.grid(which='minor', color='gray', linestyle=':', linewidth=0.5)

ax2.scatter(random_samples[:, 0], random_samples[:, 1], c='red', s=50, alpha=0.7)
ax2.set_title(f'Simple Random Sampling ({n_samples} points)', fontsize=14)
ax2.set_xlabel('Parameter 1')
ax2.set_aspect('equal', adjustable='box')
ax2.grid(True, which='both', linestyle='--', linewidth=0.5)

plt.tight_layout()
plt.show()

```

## Optimized LHS

The LHS Sampler in MetaReason is pretty complex. It samples across multiple categorical and continuous axes, each with multiple values and weights. For this demonstration we'll use a simpler version that focuses just on continuous values, which we will optimize with maximin. 

### LHS Class Definition

The first thing we'll do is define the class and an additional class used throughout that will store the continuous values, and we'll go ahead and add all the necessary imports.

```python

from typing import Any, Dict, List, Literal
from pydantic import BaseModel

import numpy as np
from scipy.stats import beta, norm, truncnorm
from scipy.stats.qmc import LatinHypercube
from scipy.spatial.distance import pdist


class ContinuousAxis(BaseModel):
    """Configuration class for continuous distribution of values."""
    name: str
    distribution: Literal["uniform", "normal", "truncnorm", "beta"]
    params: Dict[str, float] = {}


class LhsSampler:
    def __init__(self, axes: List[ContinuousAxis], random_seed: int = 42):
        self.axes = axes
        self.rng = np.random.default_rng(seed=random_seed)

```

### Transforming to a Distribution

The Latin Hypercube sampler from SciPy is excellent, but it only generates samples on a uniform [0, 1] grid. To be useful, we need to map these uniform points onto our desired statistical distributions, like a Normal or Beta distribution.

This is the perfect job for the [Percent Point Function (PPF)](https://en.wikipedia.org/wiki/Quantile_function), which is the inverse of the [Cumulative Distribution Function (CDF)](https://en.wikipedia.org/wiki/Cumulative_distribution_function). While a CDF takes a value and tells you its cumulative probability (e.g., "a value of X occurs 75% of the time"), the PPF does the opposite. It takes a probability (a value between 0 and 1) and returns the corresponding value from the distribution.

In our case, we can treat each uniform sample from our LHS as a percentile. By feeding these percentiles into the PPF of a target distribution, we transform our evenly spaced grid into an evenly spaced sample of that distribution's shape.

```python

    def _transform_to_distribution(self, uniform_samples: np.ndarray, axis: ContinuousAxis) -> np.ndarray:
        distribution = axis.distribution
        params = axis.params or {}

        if distribution == 'uniform':
            min_val = params.get("min", 0.0)
            max_val = params.get("max", 0.0)
            return min_val + uniform_samples * (max_val - min_val)
        
        if distribution == 'normal':
            mu = params.get("mu", 0.0)
            sigma = params.get("sigma", 1.0)
            return norm.ppf(uniform_samples, loc=mu, scale=sigma)

        if distribution == "truncnorm":
            mu = params.get("mu", 0.0)
            sigma = params.get("sigma", 1.0)
            min_val = params.get("min", -2.0)
            max_val = params.get("max", 2.0)
            a = (min_val - mu) / sigma
            b = (max_val - mu) / sigma
            return truncnorm.ppf(uniform_samples, a, b, loc=mu, scale=sigma)

        if distribution == "beta":            
            a = params.get("alpha", 1.0)
            b = params.get("beta", 1.0)
            return beta.ppf(uniform_samples, a, b)

        else:
            raise ValueError(f"Unknown distribution {distribution}")

```

### Optimization

While standard LHS provides good coverage, it doesn't guarantee that points are maximally spread out; you can still get unlucky and have a few points cluster together. To fix this, we can optimize our sample by generating several candidate sets and choosing the best one.

We'll use a [maximin](https://search.r-project.org/CRAN/refmans/lhs/html/maximinLHS.html) approach. The goal is to find the sample set that maximizes the minimum distance between any two points. To score each candidate set, we need to calculate the distance between every single pair of points. While we could do this with a slow nested loop, SciPy offers a highly optimized function called scipy.spatial.distance.pdist (pairwise distance). It quickly computes the distances between all pairs of points in the set. The lowest of these distances is our score.

We then generate a few candidate sample sets and keep the one with the highest score, ensuring our points are as far apart as possible.

```python

    def _optimize_lhs_maximin(self, samples: np.ndarray, sampler: LatinHypercube) -> np.ndarray:
        n_candidates = 10
        best_samples = samples
        best_score = self._calculate_maximin_score(samples)

        for _ in range(n_candidates - 1):
            candidate_samples = sampler.random(samples.shape[0])
            score = self._calculate_maximin_score(candidate_samples)

            if score > best_score:
                best_score = score
                best_samples = candidate_samples
            
        return best_samples

    def _calculate_maximin_score(self, samples: np.ndarray) -> float:
        distances = pdist(samples)
        return np.min(distances) if len(distances) > 0 else 0.0

```

### Generate Samples

Finally, we can implement the main method of the class, which generates the samples and creates a matrix of return values, evenly spaced across the sample space. 

```python

    def generate_samples(self, n_samples: int) -> List[Dict[str, Any]]:
        if not self.axes:
            raise ValueError("Axis is required to perform LHS sampling.")

        samples = []        
        n_dims = len(self.axes)
        lhs_sampler = LatinHypercube(d=n_dims, seed=self.rng.bit_generator)
        lhs_samples = lhs_sampler.random(n_samples)
        lhs_samples = self._optimize_lhs_maximin(lhs_samples, lhs_sampler)    
        continuous_samples = np.zeros_like(lhs_samples)

        for i, axis in enumerate(self.axes):
            uniform_samples = lhs_samples[:, i]
            continuous_samples[:, i] = self._transform_to_distribution(uniform_samples, axis)

        for i in range(n_samples):
            sample = {}

            for j, axis in enumerate(self.axes):
                sample[axis.name] = continuous_samples[i, j]
           
            samples.append(sample)

        return samples
```

### Full Implementation

Here is the entire implementation.

```python

from typing import Any, Dict, List, Literal
from pydantic import BaseModel

import numpy as np
from scipy.stats import beta, norm, truncnorm
from scipy.stats.qmc import LatinHypercube
from scipy.spatial.distance import pdist


class ContinuousAxis(BaseModel):
    """Configuration class for continuous distribution of values."""
    name: str
    distribution: Literal["uniform", "normal", "truncnorm", "beta"]
    params: Dict[str, float] = {}


class LhsSampler:
    def __init__(self, axes: List[ContinuousAxis], random_seed: int = 42):
        self.axes = axes
        self.rng = np.random.default_rng(seed=random_seed)

    def generate_samples(self, n_samples: int) -> List[Dict[str, Any]]:
        if not self.axes:
            raise ValueError("Axis is required to perform LHS sampling.")

        samples = []        
        n_dims = len(self.axes)
        lhs_sampler = LatinHypercube(d=n_dims, seed=self.rng.bit_generator)
        lhs_samples = lhs_sampler.random(n_samples)
        lhs_samples = self._optimize_lhs_maximin(lhs_samples, lhs_sampler)    
        continuous_samples = np.zeros_like(lhs_samples)

        for i, axis in enumerate(self.axes):
            uniform_samples = lhs_samples[:, i]
            continuous_samples[:, i] = self._transform_to_distribution(uniform_samples, axis)

        for i in range(n_samples):
            sample = {}

            for j, axis in enumerate(self.axes):
                sample[axis.name] = continuous_samples[i, j]
           
            samples.append(sample)

        return samples

    def _transform_to_distribution(self, uniform_samples: np.ndarray, axis: ContinuousAxis) -> np.ndarray:
        distribution = axis.distribution
        params = axis.params or {}

        if distribution == 'uniform':
            min_val = params.get("min", 0.0)
            max_val = params.get("max", 1.0)
            return min_val + uniform_samples * (max_val - min_val)
        
        if distribution == 'normal':
            mu = params.get("mu", 0.0)
            sigma = params.get("sigma", 1.0)
            return norm.ppf(uniform_samples, loc=mu, scale=sigma)

        if distribution == "truncnorm":
            mu = params.get("mu", 0.0)
            sigma = params.get("sigma", 1.0)
            min_val = params.get("min", -2.0)
            max_val = params.get("max", 2.0)
            a = (min_val - mu) / sigma
            b = (max_val - mu) / sigma
            return truncnorm.ppf(uniform_samples, a, b, loc=mu, scale=sigma)

        if distribution == "beta":            
            a = params.get("alpha", 1.0)
            b = params.get("beta", 1.0)
            return beta.ppf(uniform_samples, a, b)

        else:
            raise ValueError(f"Unknown distribution {distribution}")

    def _optimize_lhs_maximin(self, samples: np.ndarray, sampler: LatinHypercube) -> np.ndarray:
        n_candidates = 10
        best_samples = samples
        best_score = self._calculate_maximin_score(samples)

        for _ in range(n_candidates - 1):
            candidate_samples = sampler.random(samples.shape[0])
            score = self._calculate_maximin_score(candidate_samples)

            if score > best_score:
                best_score = score
                best_samples = candidate_samples
            
        return best_samples

    def _calculate_maximin_score(self, samples: np.ndarray) -> float:
        distances = pdist(samples)
        return np.min(distances) if len(distances) > 0 else 0.0
```

## When to LHS

LHS is useful in machine learning for hyperparameter tuning. Being an efficient Monte Carlo method that samples evenly, it is more efficient than RandomizedSearchCV for exploring the hyperparameter search space. 

LHS is also useful in Uncertainty Quantification by sampling from parameter distributions. That is how I am using it in MetaReason. And it allows for Design of Experiments that get the most information from the fewest possible runs. 

## Conclusion

LHS is an advanced technique for exploring a sample space. It provides superior coverage and efficiency compared to random sampling. Although it is complex, simple use cases can be implemented without too much of a lift. It is worth a day of struggle to replace random sampling, resulting in a more robust and efficient engine for the uncertainty quantification I'm performing in MetaReason.