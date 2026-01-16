---
layout: post
title: "Back to Binomial Basics"
date: 2025-09-29
tags: [statistics]
---

Sometimes it's good to get back to basics. Having spent months deep in Bayesian modeling and statistics, it felt like a good time to revisit a foundational topic. This gave me an opportunity to write some simple but fundamental probability code.

It isn't much, but it's the bedrock of probability, and it's what I played around with tonight. I decided to simulate coin flips to visualize how the distribution of outcomes changes with more trials. Sharing is caring, so here it is.

```python
from collections import defaultdict
from itertools import product
import matplotlib.pyplot as plt

def get_weighted_samples(num_flips):
    weighted_sample = defaultdict(int)
    for coin_flips in product([0, 1], repeat=num_flips):
        total = sum(coin_flips)
        weighted_sample[total] += 1
    return weighted_sample

def plot(samples):
    weighted_samples = get_weighted_samples(samples)
    x = sorted(k for k in weighted_samples)
    x_freq = [i / samples for i in x]
    y = [weighted_samples[k] / sum(weighted_samples.values()) for k in x]
    y_rel = [prob * samples for prob in y]
    plt.plot(x_freq, y_rel, label=f"{samples} flips")

plot(10)
plot(20)

plt.legend()
plt.xlabel('Head Frequency')
plt.ylabel('Relative Probability')
plt.title("Relative Frequencies of Heads")
plt.show()
```

So, what do we have here that's worth our time? The code creates weighted sample spaces for two binomial distributions of different sizes (10 and 20 flips) and then plots their relative probabilities on the same chart.

<div class="tenor-gif-embed" data-postid="13199396" data-share-method="host" data-aspect-ratio="1.77914" data-width="100%"><a href="https://tenor.com/view/why-huh-but-why-gif-13199396">Why Huh GIF</a>from <a href="https://tenor.com/search/why-gifs">Why GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

Not only does writing code like this exercise the brain, but it also helps visualize key concepts. Plotting these two distributions together brings home an important principle: the law of large numbers. Notice how the distribution for 20 flips is narrower and more peaked around the 0.5 frequency. With more trials, the results cluster more tightly around the expected value.

![Relative Frequencies](/assets/images/2025-09-29-relative-freqs.png)

And, sometimes I just like writing simple code with a hot cup of tea late at night.
