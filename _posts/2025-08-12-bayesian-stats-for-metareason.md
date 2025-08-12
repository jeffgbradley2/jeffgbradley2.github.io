---
layout: post
title: "Bayesian Modeling In MetaReason"
date: 2025-08-12
description: "Exploring how Bayes' Theorem and Bayesian inference power MetaReason's confidence scoring system for LLMs, demonstrated through the classic Monty Hall problem."
keywords: "Bayesian inference, MetaReason, LLM confidence scoring, Bayes theorem, Monty Hall problem, AI governance, statistical modeling"
author: "Jeff Bradley"
canonical_url: "https://jeffgbradley2.github.io/2025/08/12/bayesian-stats-for-metareason.html"
og:
  type: "article"
  title: "Bayesian Modeling In MetaReason"
  description: "Exploring how Bayes' Theorem and Bayesian inference power MetaReason's confidence scoring system for LLMs"
  image: "/assets/images/2025-08-12-monty-hall.png"
twitter:
  card: "summary_large_image"
  title: "Bayesian Modeling In MetaReason"
  description: "Exploring how Bayes' Theorem and Bayesian inference power MetaReason's confidence scoring system for LLMs"
  image: "/assets/images/2025-08-12-monty-hall.png"
---

[Bayesian inference](https://en.wikipedia.org/wiki/Bayesian_inference) blow my mind all the time. Just the fact that Thomas Bayes derived his rule (now known as[ Bayes' Theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem)) almost 300 years ago is crazy on its own. It has absolutely stood the test of time, and is as applicable now as ever in history. Here is the theorem, in all its glory:

```
P(H|E) = P(E|H) × P(H) / P(E)
```

Where:
- **P(H\|E)** is the posterior probability (probability of hypothesis H given evidence E)
- **P(E\|H)** is the likelihood (probability of evidence E given hypothesis H)  
- **P(H)** is the prior probability (initial belief about hypothesis H)
- **P(E)** is the marginal probability (total probability of evidence E)

But it isn't easy to grasp, even after a college education. For some reason, applying the theory to real world problem takes a lot of practice. I like word problems as much as anyone, but something about Bayesian problems can vex even me. 

## A Bayesian Riddle

Take the classic Monty Hall problem: Suppose you are a contestant on Let's Make a Deal, and you have the opportunity to win a car that is behind one of three doors. The other two doors have some wonderful goats (which I would like to have!). You get to choose a door, and then the host, ol' Monty, opens another one. 

In the scenario, you chose door 1, and then Monty opens door 2 and reveals a goat. Now, per the rules of the game, you have a choice: keep your current selection, or switch. But there is a catch: Monty will not open the door with the car. 

The first thing anyone thinks of, even knowing the answer, is that there is no reason to switch: it's 50/50 chance, so why switch? But that isn't right, and we can apply some Bayesian inference to tell us why.

## What's Your Hypothesis

The purpose of Bayesian inference is to generate a "posterior distribution", which is a fancy way of saying a list of probabilities, each associated with a particular hypothesis. To compute that posterior distribution, we have to figure out a few parameters, which aren't always (often!) obvious. Luckily for us, in this classic problem, they are.

First, we need to determine what our hypotheses are. In this case, they are that the car is behind a particular door. There are 3 doors, so there are three hypothesis: Door 1, Door 2, and Door 3.

| Hypothesis |
|------------|
| Door 1     |
| Door 2     |
| Door 3     |

## Prior Belief

Now that we know what we are trying to figure out, we can work on the rest of the parameters. Bayesian logic is all about priors, which are prior belief about the probability of the hypothesis being true, before any additional data or events have occurred. In the case of the three doors, before we know anything else, we just know there is a 1 in 3 chance a door hides the car, so our priors are uniformly 1/3 for each hypothesis. 

This is known as an "informative" prior, because we actually know something, enough to put some numbers down that mean something and are useful. If we didn't, we would use an "uninformative prior", something like a list of ones. Surprisingly, given enough data, the prior doesn't matter so much, so as long as we have a lot of data, an uninformative prior is fine. 

But in our case, we don't have much data, and we do know the prior probability. So we can use that. 

| Hypothesis | Prior |
|------------|-------|
| Door 1     | 1/3   |
| Door 2     | 1/3   |
| Door 3     | 1/3   |

## Likelihood

Next we need to compute the likelihood of seeing the event or data given the hypothesis is true, and here is where it gets interesting. In our case, since we chose Door 1, and Monty chose Door 2, we can determine the following probability of seeing the data (Monty choses door 2) given the hypothesis (car behind each door)
- If behind door 1, then there is a 50/50 chance Monty choses door 2 or door 3.
- If the car were behind door 2, then Monty wouldn't open it, but he did, so the likelihood of door 2 is now 0
- If the car is behind door 3, then Monty has to chose door 2, because he can't chose door 1 (our door). So the likelihood is 1, his only choice.

| Hypothesis | Prior | Likelihood |
|------------|-------|------------|
| Door 1     | 1/3   | 1/2        |
| Door 2     | 1/3   | 0          |
| Door 3     | 1/3   | 1          |

## Bayesian Computation

To find our posterior probability, we multiply the Prior by the Likelihood for each hypothesis. This gives us the "Unnormalized" posterior, which we can then normalize (by making the sum of the probabilities equal to 1) to get the final Posterior. The point should be clear: our choice and Monty's are not independent, and so we should actually change our door to Door 3, which is the most likely given the new data.


| Hypothesis | Prior | Likelihood | Unnormalized | Posterior |
|------------|-------|------------|--------------|----------|
| Door 1     | 1/3   | 1/2        | 1/6          | 1/3      |
| Door 2     | 1/3   | 0          | 0            | 0        |
| Door 3     | 1/3   | 1          | 1/3          | 2/3      |


It still hurts my head. Here is some nice, clean python to make things better, which you can run yourself if you are a nerd like me. But if not, don't worry: all we are doing here is running lots of simulations, randomizing the door the car is behind, and comparing strategies. 

```python
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

def monty_hall_simulation(n_trials=10000, switch=True):
    """
    Simulate the Monty Hall problem using scipy.stats
    
    Parameters:
    n_trials: number of simulations to run
    switch: whether the contestant switches doors (True) or stays (False)
    
    Returns:
    win_rate: proportion of wins
    """
    wins = 0
    
    for _ in range(n_trials):
        # Randomly place the car behind one of 3 doors (0, 1, or 2)
        car_door = stats.randint.rvs(0, 3)
        
        # Contestant initially picks door 0
        initial_choice = 0
        
        # Host opens a door with a goat (not the car door, not the contestant's door)
        possible_doors = [door for door in range(3) if door != car_door and door != initial_choice]
        host_opens = np.random.choice(possible_doors)
        
        if switch:
            # Switch to the remaining unopened door
            final_choice = [door for door in range(3) if door != initial_choice and door != host_opens][0]
        else:
            # Stay with initial choice
            final_choice = initial_choice
        
        # Check if contestant wins
        if final_choice == car_door:
            wins += 1
    
    return wins / n_trials

# Run simulations
n_trials = 100000
switch_win_rate = monty_hall_simulation(n_trials, switch=True)
stay_win_rate = monty_hall_simulation(n_trials, switch=False)

print(f"Monty Hall Simulation Results ({n_trials:,} trials)")
print(f"Win rate when switching: {switch_win_rate:.4f}")
print(f"Win rate when staying: {stay_win_rate:.4f}")
print(f"Theoretical switch win rate: 2/3 = {2/3:.4f}")
print(f"Theoretical stay win rate: 1/3 = {1/3:.4f}")

# Test if simulation results are significantly different from theoretical
switch_successes = int(switch_win_rate * n_trials)
stay_successes = int(stay_win_rate * n_trials)

switch_test = stats.binomtest(switch_successes, n_trials, 2/3, alternative='two-sided')
stay_test = stats.binomtest(stay_successes, n_trials, 1/3, alternative='two-sided')

print(f"\nStatistical Tests (H0: simulation = theory):")
print(f"Switch strategy p-value: {switch_test.pvalue:.4f}")
print(f"Stay strategy p-value: {stay_test.pvalue:.4f}")
print(f"Significance level: 0.05")

if switch_test.pvalue > 0.05 and stay_test.pvalue > 0.05:
    print("✓ Simulation results are consistent with theoretical predictions")
else:
    print("⚠ Simulation results may differ significantly from theory")

# Visualization
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Bar chart comparing strategies
strategies = ['Stay', 'Switch']
simulated = [stay_win_rate, switch_win_rate]
theoretical = [1/3, 2/3]

x = np.arange(len(strategies))
width = 0.35

ax1.bar(x - width/2, simulated, width, label='Simulated', alpha=0.8)
ax1.bar(x + width/2, theoretical, width, label='Theoretical', alpha=0.8)
ax1.set_ylabel('Win Probability')
ax1.set_title('Monty Hall: Simulation vs Theory')
ax1.set_xticks(x)
ax1.set_xticklabels(strategies)
ax1.legend()
ax1.grid(True, alpha=0.3)

# Convergence plot
trial_sizes = np.logspace(2, 4, 10).astype(int)  # Reduced for faster execution
switch_rates = []
stay_rates = []

for size in trial_sizes:
    switch_rate = monty_hall_simulation(size, switch=True)
    stay_rate = monty_hall_simulation(size, switch=False)
    switch_rates.append(switch_rate)
    stay_rates.append(stay_rate)

ax2.semilogx(trial_sizes, switch_rates, 'b-', label='Switch (simulated)', alpha=0.7)
ax2.semilogx(trial_sizes, stay_rates, 'r-', label='Stay (simulated)', alpha=0.7)
ax2.axhline(y=2/3, color='blue', linestyle='--', label='Switch (theory)')
ax2.axhline(y=1/3, color='red', linestyle='--', label='Stay (theory)')
ax2.set_xlabel('Number of Trials')
ax2.set_ylabel('Win Rate')
ax2.set_title('Convergence to Theoretical Values')
ax2.legend()
ax2.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()
```

The result is pretty clear in favor of switching:

![Bayesian Inference Results](/assets/images/2025-08-12-monty-hall.png)

## Bayesian Reasoning

Bayesian computation is perfect for the problem that MetaReason is intent on solving: quantifying confidence scores for LLM and agentic workflows. As we can see with this toy example, given enough trials, we can come up with a confidence interval using Bayesian statistics. And this example we have walked through is really just the beginning. There is so much more in the world of Bayes to explore and use with MetaReason. I'll talk about all that soon enough. 

For now, I'm happy that, although it still warps my brain sometimes, Bayes' Theorem exists. It is proving invaluable for calculating a confidence score for LLMs, and that is like putting a risk measurement on every single task that I deploy an LLM for in production. The implications of this are exciting to me, which is why I started MetaReason, and the branching possibilities are full of potential. 