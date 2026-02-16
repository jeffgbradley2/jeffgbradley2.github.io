---
layout: post
date: 2026-02-15
title: "The End of Human Coding"
tags: [career, ai, personal]
---

It's over.

Since before the current LLM boom that brought the end of human coding into the zeitgeist, AI firms have been predicting the imminent end of coding by humans. Since 2023, that is all we developers have heard about. And, while there have been consistent advancements, it was just slow enough that many of us, with our limited memories and short attention spans, perceived the advancement as slow, or even stalled. There was talk of progress hitting a wall, and of overblown hype.

Many developers I work with were understandably skeptical, if not outright resistant. When I raised alarms and shared my plans to adopt the tools and "adapt or die" in a rapidly changing environment, I was met with silence. Even as progress increased over 2024 and 2025 and as the big AI firms and hyperscalers spent hundreds of billions of dollars building out their infrastructures, and even as I shared the papers I read, the advancements that were just waiting to be applied to massive training runs on the newest chips, no one around me acknowledged it.

But in November of 2025, things changed. The coding agents got good. And somehow, it feels like people were taken by surprise.

## A Little History

![Mid-20th Century Punch Card](/assets/images/2026-02-15-punch-card.jpg)
> By Pete Birkinshaw from Manchester, UK - Used Punchcard, CC BY 2.0, https://commons.wikimedia.org/w/index.php?curid=49758093


Automated coding has been a dream since coding was invented. The term "automatic programming" traces all the way back to the 1940s, when it referred to automating the paper punching codes of the day. Even then, the focus was on automating the level of abstraction of the day, allowing programmers to work at higher levels of abstraction.

> Automatic programming has always been a euphemism for programming in a higher-level language than was then available to the programmer.
>
> David Parnas

In 1954, FORTRAN was developed at IBM to convert mathematical notation into machine instructions by John Backus. This allowed programmers to work at a much higher level than before, but programmers were skeptical. Programmers regarded their work as a creative art requiring human inventiveness, just like we do now.

When it released, it surprised everyone by how much more efficient it made programmers. General Motors reported that it improved efficiency by a factor of 5-10. The IBM manual for FORTRAN was titled "The FORTRAN Automatic Coding System."

> Much of my work has come from being lazy. I didn't like writing programs, and so, when I was working on the IBM 701, writing programs for computing missile trajectories, I started work on a programming system to make it easier to write programs.
>
> John Backus

![Fortran Manual](/assets/images/2026-02-15-fortran.jpeg)

Around the same time as Backus, Grace Hopper developed the A-0 Compiler that pioneered subroutine management. She noted how no one would touch it, in spite of how much more efficient it was. She later went on to become the Director of Automatic Programming at Rand and played a major role in the birth of COBOL, a language written close to English that became the dominant programming language in the world.

> They told me computers could only do arithmetic.
>
> Grace Hopper

The pattern of automating programming to higher levels of abstraction continued in the 1980s and 1990s. CASE tools promised full automation of coding, growing to a market of over $10 billion dollars by the mid 1990s. In the early 2000s, UML and Model Driven Architecture again raised the abstraction layer with the goal to being to automate human coding. But these tools failed to deliver on their promise of full automation, and programmers continued typing code by hand.

## The Transformer

In the 2010s, multiple advanced coding tools automated parts of coding. There was Kite and Tabnine, and IntelliCode. But all of those tools of the time were brittle and had narrow use cases, more like super autocomplete. They proved there was a huge market, but failed to deliver on the necessary efficiency gains for mass adoption.

Then, in 2017, some Google researchers published the now-famous "Attention is All You Need" paper, ushering in the modern AI era, driven by the Transformer architecture and Large Language Models. The Transformer architecture enabled training on vast amounts of data, learning to predict the next token with accuracy never before achieved. And they could code.

![Transformer Architecture](/assets/images/2026-02-15-transformer.png)
> By dvgodoy - https://github.com/dvgodoy/dl-visuals/?tab=readme-ov-file, CC BY 4.0, https://commons.wikimedia.org/w/index.php?curid=151216016

In 2021, GitHub Copilot, powered by Codex, launched in research preview. It was polarizing, generating questionable code that sometimes saved time, but which slowed down experienced engineers and was plagued by concerns over copyright. Research found that Codex was GPT-3 fine-tuned on 159GB of Python from 54 million GitHub repos. While GPT-3 scored literally 0% on HumanEval, Codex scored 28.8%. A controlled study found Copilot users completed tasks 55.8% faster.

ChatGPT launched a year later and in 2023, OpenAI released GPT-4, the most powerful AI model in the world that was general purpose and could produce better code than any other tool available. Competition in the AI coding space exploded, with Google and Amazon and Anthropic following close behind with their own models. GitHub Copilot grew from 1 million users in 2023 to 15 million in 2025.

## Agents

In 2025, the shift from super autocomplete to agentic coding occurred. At first, Cursor and Claude Code were useful tools, producing huge amounts of code in 1/1000th the time it would take a human coder, but often riddled with bugs and security flaws. But as 2025 progressed, coding agents continued to rapidly advance along 4 vectors:

- Model Advancements: The transition to reasoning models that prioritize logic over mere pattern matching.
- Engineering Optimization: Improvements in the speed and cost at which the models were served.
- Harness Development: The creation of specialized runtime environments where agents have full access to terminal, file system, and browser tools to verify their work in real-time.
- Context Engineering: Moving beyond simple prompts to complex approaches like Compound Engineering to autonomously record lessons learned into persistent files, leveraging Plugins and Skills to pull in live system state and maintain a deterministic source of truth for the model to follow.

Research and collaboration exploded, with firms pouring billions of dollars into improving the ability for their models and platforms to support agentic coding. Massive datacenters were constructed, housing superclusters of hundreds of thousands of Nvidia chips. Open source communities shared techniques on context engineering, and the coding app makers incorporated those discoveries into their agentic harnesses.

During this time, Claude Code hit 1 billion in annualized revenue within six months. Cursor reached 100M ARR with zero marketing spend and a 29.3B valuation. Anthropic reported that 70-90% of their own code was AI-generated.

![Vibe Coding vs Agentic Coding](/assets/images/2026-02-15-vibe-vs-agentic.png)

## Inflection

In November 2025, advancements in these 4 salients and the release of Claude Opus 4.5, GPT-5.2, and Gemini 3 marked an inflection point. Across the board, programmers with influence that had been skeptical and critical of AI coding to this point, changed their tunes. From Andrej Karpathy to Martin Fowler to Kent Beck, major programming experts and writers made it clear that code was now being written entirely by AI. The message changed from "vibe code is slop" to "how do we adapt".

It was at this time that I myself stopped writing any code professionally. I found Claude Code to produce high-quality code, and the plugins and skills and context engineering enabled it to generate complex coding projects in minutes that would have taken me days. I've been ringing the bell ever since. AI coding agents can now produce better code than 90% of the developers employed at my current company, at a tiny fraction of the time and cost of the human.

> Programming via LLM agents is increasingly becoming a default workflow for professionals, except with more oversight and scrutiny. The goal is to claim the leverage from the use of agents but without any compromise on the quality of the software. Many people have tried to come up with a better name for this to differentiate it from vibe coding, personally my current favorite "agentic engineering."
>
> Andrej Karpathy

![SWE Bench Timeline](/assets/images/2026-02-15-swe-bench.png)

## The Future

Let me put it bluntly: if all you do is take specs and convert that to code by typing, alarm bells should be going off in your head. AI is getting drastically better at not just coding, but at the entire software engineering pipeline. This is happening faster than even I predicted, with my end-of-2027 estimate a full 2-years too conservative.

We are not used to our tools improving so fast. I'm used to marginal improvements in my IDE and programming language every year or so, not massive jumps in capabilities over a few months. And now, all the major AI firms report that _the tools are writing all the code for the next generation of the tools_. Claude is writing the code for the next Claude, and Codex is building the next Codex. Releases are speeding up accordingly.

If you used GitHub Copilot a year or two ago and thought "meh" or tried Claude Code in early 2025 and thought "cool, but no thanks, it isn't that good", look again. Don't let your previous experience or your biases cloud your vision. Any research or industry reports released in 2025 are now outdated, and in a few months we will have new models, new harnesses, new datacenters coming on line training and serving the next generation on the newest and most powerful Nvidia chips.

![Datacenters Coming Online](/assets/images/2026-02-15-datacenters.png)

Programming has changed. It is time for another shift, like that which happened when FORTRAN raised the abstraction layer. But this time, it is natural language that we use, with our specifications and pipelines, engineering the systems that engineer systems. It is scary and exciting and no one knows where it will end. I personally cannot see the ceiling. But it is time to adapt, now or never. Stop clinging to the past, to doing it the way you always have just because it is fun and comfortable. Those days are over.

It's time to wake up.
