---
layout: post
date: 2026-03-08
title: Lessons Learned Building an Agentic Application
---

Over the last few months, one of my main projects has been building and deploying an agentic application. Recently, the application entered Alpha with real users, and I've been working closely with operators to address issues and add features as new requirements surface.

It's a good time to stop and reflect on what I've learned.

## A Quick Recap

Our sister company came to us with AI initiatives, and I kicked off our AI SDLC as part of a larger governance process. We went onsite, assessed their use cases, and created formal Problem Definitions, from which I developed Impact Assessments and Risk Assessments.

I presented leadership with options and recommendations, and they selected the Copilot approach: a single application built to support our client's needs but designed to apply to any client.

Shipment tracking was the highest priority, so I initiated discovery with teams dedicated to domestic and international workflows, respectively. As requirements were gathered, I drafted the system design specification and began building the prototype.

Through operator interviews, I discovered that leadership's goal of full automation was not only deeply risky, but infeasible. Human operators work in Outlook and wanted to stay there. I proposed a new design centered on an Outlook Add-In as the primary interface. This allowed operators to control which "tickets" the Copilot worked on their behalf, pass additional context based on their own expertise, and verify all Copilot responses before sending.

I presented this architecture to all stakeholders. It was accepted. The Alpha version has since deployed and is currently in user testing.

So, what have I learned?

## Working Closely with Operators

Working as a "Forward Deployed Engineer," I was able to quickly observe operators, gather feedback and new requirements, and ship updates fast. I met with teams daily, with sessions automatically recorded and transcribed, and deployed updates before our next meeting.

This only works because I was talking directly to operators. Any time communication ran through intermediaries, progress slowed. Project managers and executives add real value, but there's no substitute for an experienced engineer working directly with operators, understanding their needs, and converting those into a working system. Without that direct line, development would have stretched out significantly, and a lot would have been lost in translation.

## Requirements Engineering

I'm not an advocate for Big Design Upfront, but requirements matter, particularly in governed system development. Traditional requirements engineering often amounts to sitting with operators, shadowing them, and asking questions. That's effective, but not optimal.

I've developed a process that uses generative AI to augment requirements engineering. It ingests a Problem Definition, Risk Assessments, and other context to assist with generating interview questions, creating requirements matrices, and other discovery tasks. This human-AI collaboration in the requirements process has been a meaningful improvement.

## Guardrails

Encoding steps and rules directly into the agentic workflow was critical for reliability. I moved from LangChain to LangGraph, which gave me explicit control over steps and logic through nodes, edges, and state, branching based on deterministic rules rather than hoping the model would figure it out. The result was a far more consistent system. It also allowed me to limit context in individual nodes, reducing cost and improving accuracy.

## Business Processes Are Messy

Demos of comparable products tend to be naive about real-world business processes. The processes I've observed are often unique to each of our sister company's clients, with complex communication patterns that require significant context to navigate. This was a primary driver of the Copilot architecture, keeping expert operators in the loop to provide that context and evaluate the Copilot's work.

That said, capturing the true power of agentic workflows requires redesigning human processes as well. We're actively exploring ways to improve communication protocols between our client and their customers.

## Websites Are Not Agent-Friendly

One requirement was falling back to carrier website searches when other data sources fail or go stale. Using LangChain and Playwright, I built a system that can do this. But websites frequently block bots with CAPTCHAs and other countermeasures. Direct API integration isn't always feasible either; virtually no air cargo carriers offer one.

In those cases, I integrated a third-party service that connects directly to carriers. But not all carriers are covered, and for those gaps, the Copilot surfaces everything the operator needs to run the search manually.

## Final Thoughts

The Copilot has been a success so far. But the messiness of human processes is something many leaders underestimate when undertaking AI initiatives. A lot of what humans do effortlessly, drawing on enormous context and tribal knowledge, is simply out of reach for agents today.

The best agentic architectures don't try to replace that. They combine the strengths of human operators with AI, carefully controlling what agents do, with expert humans in the loop to guide and validate. That's the architecture worth building.