---
layout: post
title: "Latin Hypercube Sampling"
date: 2025-08-07
tags: [statistics, metareason]
---

As I was exploring the [Monte Carlo method](https://en.wikipedia.org/wiki/Monte_Carlo_method) for generating random samples, I came across something that wasn't in my statistics classes in college: [Latin Hypercube Sampling](https://en.wikipedia.org/wiki/Latin_hypercube_sampling), or LHS for short. The name is so cool. I was immediately intrigued.

LHS is a statistical method for generating random samples, based on Monte Carlo. Unlike Monte Carlo, however, the samples are not purely random but instead are "stratified" across n dimensions, which is a fancy way of saying that they are evenly distributed. It's been around since the 70's, so no idea why they didn't teach it to me in college. 

It turns out that LHS is commonly used for computer experiments, and this is how I came across it. For MetaReason, I need to generate many permutations of a test case, varied over multiple axis. My initial thought was Monte Carlo, but as I researched I found LHS.

## A Simple Implementation 

Here is a simple example of LHS where we create n random samples from a uniform distribution using LHS.

```python
import numpy as np

def lhs_uniform(n, min_val, max_val):
  """Generate Latin Hypercube Samples from a uniform distribution.
    
  Creates n samples that are evenly distributed across the range [min_val, max_val]
  using Latin Hypercube Sampling (LHS). This ensures better space-filling properties
  than pure random sampling by dividing the range into n equal intervals and 
  randomly sampling once from each interval.
  
  Args:
      n: Number of samples to generate. The range is divided into n equal intervals.
      min_val: Lower bound of the sampling range (inclusive).
      max_val: Upper bound of the sampling range (inclusive).
  
  Returns:
      numpy.ndarray: 1D array of length n containing the LHS samples, scaled to
          the range [min_val, max_val]. Each sample comes from a different interval
          to ensure even distribution across the range.
  
  Example:
      >>> samples = lhs_uniform(5, 0, 10)
      >>> print(samples)
      [1.23, 3.87, 5.42, 7.91, 9.15]  # One sample from each fifth of [0, 10]
  """

  # Create n+1 evenly spaced points from 0 to 1 to define n equal-width bins
  bins = np.linspace(0, 1, n + 1)
  
  # Sample randomly within each bin: bins[:-1] are lower bounds, bins[1:] are upper bounds
  dist = np.random.uniform(low=bins[:-1], high=bins[1:])
  
  # Scale the [0, 1] samples to the desired range [min_val, max_val]
  scaled = min_val + dist * (max_val - min_val)
  return scaled
```

The comments take up more space than the code of course, since this is a simple example. However, it is helpful to see, nonetheless. Let's generate some random Monte Carlo samples and compare the results with LHS.

## Comparing LHS to Monte Carlo

```python
import matplotlib.pyplot as plt

n = 100
mc_samples = np.random.uniform(0, 10, n)
lhs_samples = lhs_uniform(n, 0, 10)

fi, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.hist(mc_samples, bins=20, edgecolor='black', alpha=0.7)
ax1.set_title('Monte Carlo Sampling')
ax1.set_xlabel('Value')
ax1.set_ylabel('Frequency')
ax1.grid(True, alpha=0.3)

ax2.hist(lhs_samples, bins=20, edgecolor='black', alpha=0.7, color='orange')
ax2.set_title('LHS Sampling')
ax2.set_xlabel('Value')
ax2.set_ylabel('Frequency')
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()

```

![Monte Carlo vs LHS Sampling](/assets/images/2025-08-07-lhs-sampling.png)

## Why LHS Matters for AI Testing

LHS matters because it allows us to use far less samples, often 10x, than Monte Carlo for the same coverage. This matters when time or cost is a factor, as is the case with testing LLMs. And when testing LLM confidence across multiple parameters (temperature, prompt complexity, token length), LHS ensures I'm not accidentally clustering my tests in one corner of the parameter space.

## Next Steps

I've found LHS to be very useful in my work and am looking forward to exploring more advanced use cases and implementations. I'm particularly interested in the LHS implementation from [scikit-optimize](https://scikit-optimize.github.io/stable/modules/generated/skopt.sampler.Lhs.html?highlight=lhs#skopt.sampler.Lhs), as well as from [SciPy](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.qmc.LatinHypercube.html). 