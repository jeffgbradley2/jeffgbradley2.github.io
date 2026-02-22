---
layout: post
date: 2026-02-21
title: "Agentic Engineering"
tags: ['engineering', 'ai', 'career']
---

The transition from traditional software engineering has begun.

Every software engineer that I know who isn't in denial has adopted agentic coding tools. [I posted previously]({% post_url 2026-02-16-the-end-of-human-coding %}) about the end of human coding. What I want to talk about now is the move _beyond_ AI coding to what is best called Agentic Engineering. It represents a much more foundational shift than "use AI coding", and it is the now and future of software engineering.

## What is Agentic Engineering

Like many of the terms we are using to describe the new processes and techniques, Andrej Karpathy coined (or at least popularized) Agentic Engineering. Where Vibe Coding describes the casual, roll-the-dice approach to AI-assisted development, agentic engineering is its disciplined counterpart. It refers to the systematic orchestration of AI agents throughout the software development process.

This matters because, although these tools can now write code as good or better than humans (and many times faster and cheaper), using them effectively in large projects isn't an easy win. Developer studies across the industry consistently show that simply adopting AI coding tools does not automatically translate to organizational productivity gains. Individual developers write more code, but the gains can evaporate at the company level when the surrounding processes aren't redesigned to match.

Agentic engineering is the recognition that this is a systems problem.

## Implementing Agentic Engineering

At my current company, I lead our AI Governance efforts. When our leadership mandated the adoption of agentic coding, the leads collaborated and followed our governance processes: we defined the problem, assessed impact and risk, and designed a framework.

The framework we've built is called SOVC, which stands for Specify, Orchestrate, Validate, Communicate. These are the four phases of the human's job in an agentic engineering workflow:

- **Specify**: Define what the agent should build with enough precision that you can evaluate the result. This means a clear problem statement, acceptance criteria, constraints, and scope boundaries. The specification is the highest leverage artifact. It determines both the quality of the agent's output and your ability to judge it.
- **Orchestrate**: Run the agent, but actively. This isn't passive acceptance of AI output. You evaluate intermediate outputs, redirect when the approach is wrong, and recognize when a task exceeds agent capability.
- **Validate**: First, the developer self validates: did the output meet the acceptance criteria? Can I read and explain this code? Do the tests pass? Then the tech lead reviews for architectural soundness and conducts a comprehension check. If you can't explain what you're shipping, it goes back.
- **Communicate**: Document what was built, how it works, and what decisions were made. PR descriptions, inline comments on non-obvious logic, and notation of agent usage so reviewers know what they're looking at.

Like any initiative, defining success criteria and failure modes upfront is critical. We established metrics (bug counts, cycle time, review throughput, developer sentiment) and created a monitoring plan so that we can take a data-driven approach, and make adjustments where necessary. This is also critical for honest reporting to leadership. One of the risks we identified early was timeline misalignment: the expectation of immediate productivity gains from something that requires a phased rollout with a real learning curve. Having agreed-upon metrics and a realistic timeline protects the initiative from being killed during its most vulnerable phase.

I think it is very important to have clear communication from an executive champion so that teams aren't siloed in their approach. Leadership should be responsible for defining the policy, success criteria, the framework, and communicating the initiative, and team leads should be responsible for implementation, enforcement, team-specific adjustments, and reporting back.

## The Review Bottleneck

In an agentic workflow, the bottleneck is wherever the human is in the loop. For agentic engineering, this is overwhelmingly the Validate step, where humans perform code reviews and other quality gates.

This is expected, but it's a serious problem for team leads. When your developers can produce code three or four times faster, the volume of PRs to review explodes. We identified tech lead cognitive overload and burnout as one of our highest risks. The leads are your scarcest, most senior resource. If you burn them out or force them into rubber stamping, you've undermined the entire system.

Our treatment has multiple layers. First, developer-owned specification quality shifts quality upstream — catching problems before code is generated rather than after. Second, the developer self-validation step means the tech lead isn't the first line of defense; they're the second. Third, we're exploring AI-assisted code review tools to augment the human reviewer. And fourth, we monitor tech lead throughput weekly with defined escalation thresholds. If review load exceeds sustainable levels, we adjust the rollout pace — not the quality bar.

## Documentation as Infrastructure

We've also been elevating our documentation to the level of critical infrastructure. This is one of the less obvious shifts in agentic engineering: the documents you write _are_ the interface between human intent and AI execution.

Our leads are working together to define policies, coding standards, and architectural decisions in Markdown documents that the agents consume directly, all stored in our repos and shared automatically. This means every engineer's agent, for every feature, operates within the guardrails the tech leads have defined, before a PR is ever submitted. Good documentation always mattered, and now more than ever.

## Testing and Specification-Driven Workflows

One last point worth expanding on is testing and guardrails.

I've found that agentic coding works best when the agent is given a good spec and required to operate in a specific flow to plan its work, write tests first in TDD style, then write the code to make the tests pass. This isn't always realistic or necessary for every task, but for non-trivial features, it is remarkably effective.

Kent Beck has argued that TDD becomes a "superpower" when working with AI agents, and my experience confirms it. Agents introduce regressions. They will sometimes even delete or modify tests to make them "pass." Having a test suite that the human wrote (or at least reviewed and understands) is the executable truth that grounds everything the agent produces. You can't verify a test captures the right intent without understanding the intent yourself, and that understanding is exactly what keeps the human essential in the loop.

This connects to the emerging practice of Specification-Driven Development: treating well-crafted specifications as the primary input to AI coding agents, with validation gates at each stage. The specification is the prompt, the tests are the contract, and the human's job is to ensure both are right.

## Where This Is Heading

The term "agentic engineering" is barely a month old. The practice it describes has been forming for over a year. I think the companies and engineers who treat this transition as an engineering discipline, with governance, measurement, and honest assessment of what's working, rather than as a magic productivity multiplier, will be the ones who capture its genuine value.

The tools are excellent and getting better fast. The hard part was never the tools. The hard part is understanding requirements deeply, designing systems that hold up, making judgment calls under uncertainty, and verifying that software does what it should. Agentic engineering doesn't make those problems easier. It makes them more important.
