---
layout: post
date: 2025-10-30
title: System Design Specs
---

In Machine Learning System Design by Valerii Babushkin and Arseny Kravchenko, the authors dedicate an entire chapter to the topic of system design specifications. They go into a lot of detail about why the design spec is a critical part of an ML project, and that, while not every ML project with a system design doc succeeds, the vast majority of those without one fail. 

While the advice of the authors is specific to ML projects, this logic applies to any AI project (not just good old-fashioned AI). It is also a requirement of ISO 42001. 

I'll be the first to admit that spending a ton of time on a design document can feel like a waste, especially when we want to get to building the actual thing. But it's worth spending time on a good design document, for our future selves if no one else. 

## The Benefits of a System Design Document

As Valerii and Arseny point out, good system design documents are key to project success. They are major factors in reducing the inherent risk to a project, helping to define the necessary steps before the system development begins. In my personal case, there is a formal risk assessment step before the system design that is intended to assess and mitigate risks, but the output of that step serves as input into the system design document. 

Good system design specs also reduce uncertainty about the problem we are solving by establishing boundaries. They also quantify our understanding of what we are going to build, and allow us the opportunity to make a "go/no go" decision. Again, in my own case, there are formal documents for both problem definition and the Go/No Go decision, all part of our AI Management System, but the system design document is central to these. 

## Anatomy of a Good Spec

I like how Valerii and Arseny believe that templates are counterproductive. I can't say that I agree with that, but I do agree that slavish adherence to a template is unnecessary and counterproductive. But templates do help. 

I find that my system design specs are closely aligned with the structure they suggest, albeit much more detailed in terms of governance. 

Every design spec should state the problem it is solving, even if a formal Problem Definition exists elsewhere. The same is true for the impact and risk assessments: even if those are separate documents, as is my case, the system design spec should still reference them. There should also be success criteria and monitoring metrics.

Of course, the actual design consists of diagrams, data sources, and a baseline solution. These are the core of what we engineers usually think about when we discuss system design, and they are the most important part of my system design specs, given that much of the other information exists in more detail elsewhere. But the system design spec is _the_ place for the architectural documentation that will guide development. 

## When to Write It

In my case, the system design document comes after the Problem Definition phase of our AI Software Development Lifecycle, at the beginning of the Development phase. Valerii and Arseny separate the Problem Definition phase and the Solution Definition, and that is similar to how our SDLC separates these processes. 

But it isn't done when the first draft is checked in to version control. Oh no. It is a "living" document that must change as development moves forward and we learn more. Just today, I updated a system design spec for an AI system I'm building for our sister company after a meeting with stakeholders. The meeting revealed an important decision tree with what was previously implicit knowledge that must be made explicit as part of the system I'm building. I documented this in the system design spec (in a Mermaid diagram since all my docs are in Markdown), updated the revision history and version number, and checked it in for review by members of the governance committee. 

I'm sure there will be many more revisions as the project progresses. And that's ok, just part of a good design spec. If it just sits there, what good is it?