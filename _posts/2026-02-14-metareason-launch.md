---
layout: post
title: MetaReason Is Public
date: 2026-02-14
tags: [personal, ai, governance]
---

MetaReason is finally _live_!

Website: [metareason.ai](https://www.metareason.ai)

Repo: [metareason-core](https://github.com/metareason-ai/metareason-core)

It's been a journey, so let's recap.

## Walk With Me

In the summer of last year, after working with LLM eval frameworks and building two of my own for the company I work for, I had the realization that just averaging up accuracy measurements was not very scientific. At the same time, I was hitting a wall with cost: LLM calls are expensive. It dawned on me that classic probability and statistics might be useful here, and after researching options, decided to build a tool that used Monte Carlo simulations (Markov chain Monte Carlo, to be specific) to simulate a distribution, and then apply Bayesian modeling to predict a _true_ accuracy. Nerdy as hell.

In my research, I learned about PyMC and ArviZ, two Python tools for doing _exactly_ what I wanted to try, and over the following months, in my free time, I built a tool that accomplishes the vision, exploring things like Latin Hypercube sampling and other statistical methods for sampling and evaluating.

It also dawned on me in that time that there is serious value in _evaluating the evaluators_. LLM-as-judge is rising rapidly, and that is the first "oracle" I added in MetaReason and use in my own eval frameworks. But how do we know if the _evaluator_ is accurate? I decided to apply the same technique, generating many samples, then simulating many more with MCMC and running Bayesian analysis, to predict an accurate confidence in the judge models.

I made a lot of progress using AI coding, and then decided _to delete it all and start over, writing it myself_. That was painful but useful, and I learned a lot. However, over the last couple of months, Claude Code (powered by Opus 4.5 and 4.6) has really gotten good and I am leaning on it entirely for coding. Still, deleting everything and starting from scratch was a good exercise, even if a very time consuming one.

And here we are!

## Who Cares?

<div class="tenor-gif-embed" data-postid="13199396" data-share-method="host" data-aspect-ratio="1.77914" data-width="100%"><a href="https://tenor.com/view/why-huh-but-why-gif-13199396">Why Huh GIF</a>from <a href="https://tenor.com/search/why-gifs">Why GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>


But who cares? Who is this for?

I may be naive, but I think this could be used by any team that uses LLM-as-judge and wants to apply rigorous methods to evaluating their LLMs and agentic workflows. But the real value I see is in regulated or compliance-heavy domains, where governance is important. For organizations that are seeking or already certified in ISO 42001, for example, this type of framework may be quite handy.

This approach may also be useful for AI researchers running systematic evaluations who need statistical rigor. And any engineering team that wants to move beyond vibe checks and basic evals and embrace classic statistics. Monte Carlo simulations are our friend for this and it is baked into the framework.

## How Does It Work?

The framework is currently a simple(ish) CLI tool. Developers or testers create test specifications in yaml files, which contain the parameters for the tests they will run, things like which model to use, the inputs to the models, parameters to vary across calls, how many samples to generate, what type of distribution to use, and what type of oracle to evaluate with. The pipeline runs, calling the models (local or in the cloud), and the oracles evaluate the responses against criteria.

Once scores have been generated, PyMC goes to work, sampling from the sample distribution thousands of times, and generating a posterior distribution which is used to calculate a "High Density Interval", which is a fancy way of saying how confident we are where the _true_ accuracy lies.

There are options to generate JSON results or an HTML report, as well as commands to calibrate/evaluate an LLM judge. And soon, I hope to add a dashboard that allows running and managing pipelines from the user interface, with historic runs stored in SQLite.

Here is an example test spec for calibrating an LLM judge, written in good-ol yaml.

```yaml
spec_id: "ambiguous_calibration"
type: calibrate

prompt: "Write a haiku about autumn."
response: |
  Crimson leaves descend
  Whispering tales of summer
  Earth prepares to sleep

expected_score: 3.5
repeats: 15

oracle:
  type: llm_judge
  model: "gemma3:27b"
  adapter:
    name: "ollama"
  temperature: 1
  rubric: |
    Rate this haiku 1-5:
    - 1: Poor structure, no imagery, fails as haiku
    - 3: Competent but unremarkable
    - 5: Exceptional imagery, perfect form, emotionally resonant
    Respond as JSON: {"score": X, "explanation": "..."}
```

And here is an example HTML evaluation report that shows some of the qualities we are evaluating and an accuracy score we can be confident in.

![MetaReason Evaluation Report](/assets/images/2026-02-14-eval-report.png)

## What's Next

There's a lot on the roadmap, like the dashboard I mentioned above. I also plan to expand the types of oracles and enable deterministic rule-based evaluations also, as well as parameter effects analysis. And it would be amazing if I could get some researchers or mathematicians involved to help me build this out into something truly useful in the field.

So check it out! Clone it, run it, star it, submit an issue or feature request, or open a PR! All are welcome!
