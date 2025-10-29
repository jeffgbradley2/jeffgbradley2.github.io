---
layout: post
date: 2025-10-27
title: Markov Chains
---

Bayesian modeling plays a big role in MetaReason, where it's used as part of LLM evaluation to calculate a high density interval for the "true" score. 

Bayesian inference is cool, but it isn't alone. In fact, I find Markov chain Monte Carlo to be equally interesting. 

I learned about MCMC as I studied PyMC, the Python library for Bayesian inference. It is used in PyMC models to create simulated samples. So we can pass in our "observed" data (the samples) into the model, tell it how many "draws" we want, and PyMC will run the MCMC and generate our samples for us efficiently, which represent the posterior distribution.

It uses Markov Chains to accomplish this.

## What Are Markov Chains

A Markov Chain is a mathematical system in which state transitions are dependent solely on the current state. This makes MC "memoryless". The concept was first invented by Andrey Markov in 1906 to study sequences of dependent events. Since then, Markov Chains have been used extensively throughout science and mathematics. 

Markov Chains consist of states and transitions. The transitions between states represent a matrix called a Transition Matrix, and we can use vector math to compute the probability of being at a particular state after n transitions by multiplying the current state s by the transition matrix T raised to the power of n (sT^n).

The canonical example of a simple Markov chain is the following model of weather. Given two states of Sunny and Rainy, with transition probabilities as shown below, and a starting state of sunny, what is the weather likely to be in 10 days?

```python
import numpy as np

T = np.array([
    [.9, .1], # when sunny, there is a 90% chance next day is sunny, and 10% chance next day is rainy
    [.8, .2] # when rainy, there is a 80% chance the next day is sunny, and 20% chance next day is rainy
])

s_0 = np.array([1., 0.])

T_10 = np.linalg.matrix_power(T, 10)
s_10 = s_0 @ T_10

print(f"P(Sunny in 10 days): {s_10[0]:.3f}")
print(f"P(Rainy in 10 days): {s_10[1]:.3f}")

```

```
P(Sunny in 10 days): 0.889
P(Rainy in 10 days): 0.111
```

## Non-Irreducible Chains

A chain is non-irreducible if it has states that you can't get out of.

Many chains, like the weather chain above, are irreducible, meaning that all states are recurrent and can continue forever. Some processes we would model with markov chains are not irreducible, meaning that at least one state in the chain is absorbing (once you enter, you can never leave). 

The Gambler's Ruin is a type of problem that can be modeled with markov chains and which is not irreducible. Let's assume that a gambler starts with $2 and plays a gambling game. If they accumulate up to $4, they win and game is over. Likewise, if they lose all their money the game is over.

There are two states in the chain which are absorbing. We can model this in the transition matrix and visualize with matplotlib.

```python
import numpy as np
import matplotlib.pyplot as plt


states = [0, 1, 2, 3, 4]

T = np.array([
    [1, 0, 0, 0, 0],
    [.5, 0, .5, 0, 0],
    [0, .5, 0, .5, 0],
    [0, 0, .5, 0, .5], 
    [0, 0, 0, 0, 1]
])


def take_step(current_state):
    probabilities = T[current_state]
    next_state = np.random.choice(states, p=probabilities)
    return next_state

def run_simulation(num_steps):
    current_state = 2
    history = [current_state]
    for _ in range(num_steps):
        next_step = take_step(current_state)
        history.append(next_step)
        current_state = next_step

    return np.array(history)

simulations = [run_simulation(50) for _ in range(6)]

fig, axes = plt.subplots(3, 2, figsize=(12, 8))
for i in range(6):
    row = i // 2
    col = i % 2
    axes[row, col].plot(simulations[i])
plt.suptitle("Trace of Gambler's Ruin Chain")
plt.tight_layout()
plt.show()

```

We can see that all chains quickly find a absorbing state. 

![Gambler's Ruin Plots](/assets/images/2025-10-27-gamblers-ruin.png)

## Irreducibility

For a final example, let's model user interaction with a website with just 3 pages: home page (landing), a product page, and a blog page. We don't know the long-term traffic distribution, but we do know the click probabilities, which is our transition matrix. Here are those probabilities:

- From Homepage (0): 10% go to Products, 20% go to Blog, 70% stay (e.g., refresh).
- From Product Page (1): 40% go to Homepage, 50% stay, 10% go to Blog.
- From Blog (2): 30% go to Homepage, 30% go to Product Page, 40% stay.

This website model is an example of an irreducible chain. All states communicate with each other, and because it's irreducible and finite, all states are recurrent, meaning the chain will never get stuck and will run forever. Eventually, irreducible chains converge on a stationary distribution, which are the states that, when multiplied with the transition matrix, result in equilibrium. 

```python
states = [0, 1, 2]
T = np.array([
    [.7, .1, .2],
    [.4, .5, .1],
    [.3, .3, .4]
])

num_steps = 10_000
current_state = 0
history = [current_state]

for _ in range(num_steps - 1):
    next_state = take_step(current_state)
    history.append(next_state)
    current_state = next_state

history_array = np.array(history)

print("--- Final distribution (after 10,000 steps) ---")
frac_home = np.mean(history_array == 0)
frac_prod = np.mean(history_array == 1)
frac_blog = np.mean(history_array == 2)

print(f"Fraction of time on Homepage (State 0): {frac_home:.4f}")
print(f"Fraction of time on Product (State 1): {frac_prod:.4f}")
print(f"Fraction of time on Blog (State 2): {frac_blog:.4f}")

is_on_home = (history_array == 0).astype(int)
cum_sum = np.cumsum(is_on_home)
running_avg = [cum_sum[i] / (i + 1) for i in range(num_steps)]

plt.figure(figsize=(15, 4))
plt.plot(running_avg)
plt.title("Running Average: Fraction of Time on Homepage")
plt.xlabel("Step Number")
plt.ylabel("Fraction of Time")
plt.grid(True)
plt.axhline(y=frac_home, color='r', linestyle='--', label=f'Final Value ({frac_home:.4f})')
plt.legend()
plt.show()
```
![Convergence Plot](/assets/images/2025-10-27-homepage.png)

## MCMC in MetaReason

MetaReason uses MCMC under the hood as part of the Bayesian inference layer. It is _mostly_ abstracted away, and PyMC uses an optimized sampler called NUTS (No U-Turn Sampler) that ensures efficient samples are generated.

But it is still using Markov Chains, along with many, _many_ other practical applications. 

It is so interesting to me that intractable problems can be approximated using methods like this. 