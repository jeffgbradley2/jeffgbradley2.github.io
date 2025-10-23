---
layout: post
date: 2025-10-22
title: Evaluation Driven Development
---

My last post went into why it is important to go slow in order to go fast when starting a new AI project (or any project, really). That post discussed the importance of defining the problem and assessing impact and risk and feasibility, and creating a high-quality system design specification.

That all sounds boring, and we'd all rather jump into coding up whatever shiny new system our stakeholders want us to deliver. But it's important, and the artifacts from this stage feed into all other phases. 

Today, I want to get into the development phase of the AI SDLC, by focusing on what is the most important part: Evals. 

## Evaluation Drives the Bus

In the early days of my AI engineering career, I didn't worry much about evals. In those days, we were in the tactical maturity stage, not thinking strategically. That's normal. But, as we moved into strategic maturity and implemented AI governance, and became more knowledgeable about the AI software development lifecycle, it became clear that evals were not just important, they were the driver of what was developed. 

With LLMs and agentic applications, this is absolutely critical. Letting evals "be your guide" for the context provided to LLM applications provides us with immediate feedback and guidance on how to craft those inputs. Without the evals, we're just guessing, going off vibes. 

I've seen that go wrong first hand. 

## When Evals Saved Our Butts

Recently, at my day job, I worked with the engineering team of our Transportation Management System to build an LLM-powered OCR module. This was early days of our AI Management System and our governance framework. I was still working on building it out. So things were a little more loose than I like to admit.

Still, I worked on engineering prompts and context for the LLM, and documented everything in the system design spec, which was shared with the devs, who were writing the code to interact with the LLM, which was hosted in Google Vertex AI. 

Going through our normal development process, the devs tested, felt good about it, and passed it on to our QA team, which also tested. All manually, with multiple documents. 

The system was built to do a few things, including OCR from images and PDF, and mapping of codes and accounts, all in a single LLM call. 

All the tests passed the "vibe" checks and looked good. 

But then, I caught up with my evals. I had written an evaluation framework from scratch designed specifically for this system, using a powerful large model as a judge. I acquired dozens of sample documents and crafted multiple test cases, and ran them over many trials, analyzing the results in a heat map. 

The results were shocking. 

The evals revealed that, while OCR was quite accurate, the _critical_ mapping of codes and accounts was woefully inaccurate, far below our quality threshold established during the problem definition phase. 

I quickly went to work, letting the evals guide me as I engineered the prompts and context. I immediately discovered the need to separate the work into a flow of multiple LLM calls, each with a narrow focus. While this increased our cost somewhat, the evals revealed dramatic improvements in accuracy. And, it allowed me to add a separate validation call to a larger LLM that added a confidence score to the output of the smaller LLMs. 

Had I not created those evals, we would have shipped a broken system.

## Leveling Up Evals with Bayesian Modeling

Running many trials of many test cases is great, but we can do better by adding some good old fashioned probability to the mix. By bringing in Bayesian Statistics and Markov chain Monte Carlo, we can take all those samples we generated from the trials, run thousands of simulations to generate distributions, and then use Bayesian modeling to come up with a statistically rigorous confidence interval. This is exactly what MetaReason, my open source project, does.

But just like evals were better than vibe checks, and averaging multiple trials is better than a single run, so is using advanced statistics to come up with a true confidence interval better than simple averages. And, at least with MetaReason, it can be extended to support multiple "oracles" and configured with different distribution types and confidence thresholds. Fun stuff.

## Evals For the Win

Evals really are important. These days, there are eval frameworks all over the place. However, I've found that building my own frameworks for my specific use cases has not only been valuable for the systems I've built, but also invaluable for my own learning. It was that experience that led me to found MetaReason and to go head first down the Bayesian rabbit hole, and happy I did.

So don't sleep on evals. Not only will they make your systems the best they can be and give you valuable data for decision making and development, but they just might save your ass. 