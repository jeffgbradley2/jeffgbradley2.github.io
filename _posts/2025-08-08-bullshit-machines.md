---
layout: post
title: "Bullshit Machines"
date: 2025-08-08
description: "Analyzing Large Language Models through Harry Frankfurt's definition of bullshit - systems with indifference to truth that optimize for plausible pattern continuation rather than accuracy."
tags: [LLM-limitations, AI-criticism, hallucination, GPT-5, Frankfurt-bullshit, AI-evaluation, pattern-matching]
categories: [AI-Analysis]
excerpt: "Why Large Language Models are sophisticated bullshit machines according to Frankfurt's definition, and what this means for AI deployment in enterprise and government."
---

OpenAI just released [GPT-5](https://openai.com/index/introducing-gpt-5/) and heralded its coming as the beginning of a new age, where everyone has a PhD in their pocket. Behold!

My recent attempts to use GPT-5 in practical applications have been disappointing at best. Despite the charts showing reduced hallucination rates, I'm still seeing constant hallucinations and the same fundamental issues as older models. For instance, when using it as part of a governance process, it consistently fabricates clauses from ISO standards, and presents them with complete confidence. In another example, using it to assist with learning about [PyMC](https://www.pymc.io/welcome.html) (a Python library for Bayesian Statistics) it readily reported on the progress we had made together, which never happened.

## What These Systems Actually Are 

This shouldn't really surprise anyone. These systems remain stochastic algorithms that generate probability distributions from training data, selecting the most likely tokens to continue sequences. This approach has real value in specific domains. I use Claude Code extensively for development and find it remarkably effective, partly because code can be tested. Claude was also invaluable when I started a business recently.

But even in testable, deterministic domains, these models regularly generate plausible-sounding misinformation, or straight up lie. A simple "that's not right" can cause some of them to completely reverse their stance. It's maddening.

I'm as impressed by these systems as the next person, but the truth is that these are sophisticated pattern-matching algorithms that excel at producing convincing text, not reliable information retrieval systems or oracles of wisdom. Small, personal apps and short poems really are impressive, don't get me wrong. They are incredibly useful "bullshit machines", to use an increasingly popular label.

## The Frankfurt Definition 

The label "bullshit machines" may seem a little harsh, but it's technically accurate. Henry Frankfurt wrote a great essay titled [On Bullshit](https://www2.csudh.edu/ccauthen/576f12/frankfurt__harry_-_on_bullshit.pdf) that defines bullshit as that which has no regard for truth, neither lying nor truth-telling, but indifference to the distinction. As others have pointed out, this does indeed describe LLMs, which, in spite of what Elon says about Grok, are simply optimizing for plausible continuation of patterns.

## What Now

I'm hopeful for the future of LLMs, and believe in their potential for good. I realize that they are language models, and what that means, and I've got daily first-hand experience with their power when it comes to tool use. But I'm also concerned that the huge gap between the capabilities being promoted and the reality of deployment are going to lead to significant problems as these systems reach broader adoption within business and government. Imagine a system like GPT-5 confidently fabricating compliance requirements in a regulatory filing, or hallucinating safety protocols in a manufacturing setting.

If anything, it's clear that there is a pressing need for MetaReason and task-specific, statistically rigorous testing and optimization of LLMs and agentic workflows as these system are deployed into enterprises. We, as in all of us, need a way to readily evaluate these systems that gives true confidence. 