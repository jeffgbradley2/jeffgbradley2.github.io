---
layout: post
title: "Intro to Discrete Distributions"
date: 2025-08-18
tags: [statistics]
---

Ever wondered about the math behind flipping a coin, rolling a die, or predicting how many emails you’ll get in the next hour? The answer to that is **random variables**. Bayesian modeling, and much of probability, is all about random variables.

If you are a programmer, you probably associate a variable with a dynamic value, but in probability and statistics, it means something completely different. Random variables, in the mathematical sense, are functions that map outcomes to numerical probabilities. And, in Bayesian modeling, those outcomes are a distribution, not single values.

So random variables output the probability distributions we care about. And these variables come in two types: **discrete** and **continuous**. For this post, we'll focus on the former, which represent countable outcomes, like dice rolls, versus variables that can take on any value in a range.

Let’s walk through the three most common discrete distributions out there: Discrete Uniform, Binomial, and Poisson.

---

## Discrete Uniform: When Every Outcome is Equal

A uniform distribution is like saying “there is an equal chance of any of these outcomes.” This is the case in *many* real-world instances, but we’ll use the simple dice roll for our walk-through. A (fair) six-sided die has an equal probability of landing on any of its six sides.

Here’s the mathematical equation for the probability mass function (PMF) of the discrete random variable:

$$P(X=k) = \frac{1}{n}$$

And here is some Python code that uses SciPy to sample from the uniform distribution of the six-sided die:

```python
from scipy import stats
import matplotlib.pyplot as plt
import numpy as np

# stats.randint assigns equal probability to each random choice but expects contiguous values (1-6)
rv = stats.randint(low=1, high=7) # values 1, 2,3, 4, 5, 6
samples = rv.rvs(size=100) # simulate 1000 dice rolls
print(f"Probability of rolling a 3: {rv.pmf(3):.2f}")
print(f"Probability of rolling a 4 or less: {rv.cdf(4):.2f}")

x = np.arange(1, 7)

fig, ax = plt.subplots(1, 2, figsize=(15, 6))
markerline, stemlines, baseline = ax[0].stem(x,
                                          rv.pmf(x),
                                          linefmt='b--',
                                          markerfmt='bo',
                                          basefmt=' ')

ax[0].set_ylabel("PMF(x)")
ax[0].set_xlabel("x")
plt.suptitle("Fair Six-Sided Die Roll Probability Distribution")

# or we can use rv_discrete and specify the weight manually for each outcome and doesn't have to be contiguous
rv = stats.rv_discrete(values=([1,2,3,4,5,6], [1/6] * 6))
sample = rv.rvs(size=100)
print(f"Probability of rolling a 3: {rv.pmf(3):.2f}")
print(f"Probability of rolling a 4 or less: {rv.cdf(4):.2f}")

markerline, stemlines, baseline = ax[1].stem(x,
                                          rv.pmf(x),
                                          linefmt='b--',
                                          markerfmt='bo',
                                          basefmt=' ')
```

![Discrete Uniform Distribution - Fair Six-Sided Die](/assets/images/2025-08-18-uniform-discrete.png)

The discrete uniform distribution is a good choice for Bayesian modeling when your prior (P(A)) should be “objective” or uninformative, and in plenty of other modeling scenariors (like dice!).

## Binomial: Counting Successes and Failures

The binomial distribution models two discrete values, like on/off, pass/fail, yes/no, etc. It turns out that this distribution is extremely useful in real world scenarios, and we’ll use it here to model coin flips (classic\!). 
But first: for a problem to be a good candidate for a binomial distribution it must meet the following criteria:

1.  **B**inary: Only two possible outcomes
2.  **I**ndependent: Outcomes of one trial doesn’t affect another
3.  **N**umber: The number of trials (n) is fixed
4.  **S**uccess: The probability of success (p) is the same for each trial

Here's the mathematical equation for the binomial distribution:

$$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$$

And here it is in python

```python
from scipy import stats
import numpy as np
import matplotlib.pyplot as plt

n = 10 # coin tosses
p = .5 # fair coin!

rv = stats.binom(n=n, p=p)

print(f"The probability of flipping 8 heads is: {rv.pmf(8)}")
print(f"The probability of getting 8 or more heads: {rv.sf(7)}")

fig, axes = plt.subplots(2, 2, figsize=(12, 10))

for ax, n_tosses in zip(axes.flat, [5, 10, 20, 50]):
    coin = stats.binom(n=n_tosses, p=0.5)
    x = np.arange(0, n_tosses + 1)
    pmf = coin.pmf(x)

    ax.stem(x, pmf, basefmt=' ')
    ax.set_title(f'{n_tosses} Coin Tosses')
    ax.set_xlabel('Number of Heads')
    ax.set_ylabel('Probability')
    ax.axvline(n_tosses/2, color='red', linestyle='--',
                alpha=0.5, label='Expected')

plt.tight_layout()
plt.show()
```

![Binomial Distribution - Coin Tosses](/assets/images/2025-08-18-binomial.png)

The binomial distribution is a good choice for predicting defects, churn rate, or valid LLM outputs ;-).

## Poisson: Modeling Events in Time and Space

The Poisson Distribution models the number of times an event occurs over a specified interval, like time or distance. It's best for situations where an event can happen many times, but the chance of it happening in any one tiny instant is very small. We know the average rate, but the events themselves are random and independent.

Think of it like your email: you know your average hourly email rate, but the events themselves (the emails) are independent and somewhat random.

Here is the equation for the Poisson distribution:

$$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

And here it is with SciPy:

```python
from scipy import stats
import matplotlib.pyplot as plt
import numpy as np

historical_emails = [12, 15, 10, 18, 14, 16, 11, 13, 17, 15,
                      14, 12, 16, 15, 13, 14, 18, 11, 15, 16]

lambda_ = np.mean(historical_emails)
rv = stats.poisson(mu=lambda_)

print(f"Probability of exactly 15 emails in the next hour: {rv.pmf(15):.2f}")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

ax1.hist(historical_emails, bins=range(8, 22), density=True,
        alpha=0.7, color='skyblue', edgecolor='black', label='Historical Data')

x_range = np.arange(5, 25)
pmf_values = rv.pmf(x_range)
ax1.plot(x_range, pmf_values, 'ro-', markersize=8,
        linewidth=2, label=f'Poisson Model (λ={lambda_:.1f})')

ax1.set_xlabel('Emails per Hour')
ax1.set_ylabel('Probability')
ax1.set_title('Historical Data vs Fitted Poisson Distribution')
ax1.legend()
ax1.grid(True, alpha=0.3)

email_counts = np.arange(0, 30)
probabilities = rv.pmf(email_counts)

bars = ax2.bar(email_counts, probabilities, color='lightgray', edgecolor='black')

lower = rv.ppf(0.025)
upper = rv.ppf(0.975)
for i, bar in enumerate(bars):
    if lower <= i <= upper:
        bar.set_color('green')
        bar.set_alpha(0.7)

ax2.axvline(x=lambda_, color='red', linestyle='--',
            linewidth=2, label=f'Expected: {lambda_:.1f}')

ax2.set_xlabel('Number of Emails')
ax2.set_ylabel('Probability')
ax2.set_title('Prediction for Next Hour (95% CI in green)')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

![Poisson Distribution - Email Frequency](/assets/images/2025-08-18-poisson.png)

The poisson distribution is good for modeling things like emails in an hour, car accidents in a city per day, or typos in each page of a book.

## Wrap Up

This was a fast coverage of these distributions, and the examples are simple but hopefully instructive. Each of these distributions is critical in Bayesian modeling and probability in general: Uniform for fairness, Binomial for success/failure, and Poisson for event rates. They aren’t just abstract formulas either, but powerful tools in making sense of randomness and making predictions. I’ve even used them to predict the confidence in LLM outputs\!
