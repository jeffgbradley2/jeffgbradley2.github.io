---
layout: post
date: 2025-10-15
title: When to Listen and When to Lead
---

A few weeks ago I wrote about how good it feels when engineers and operators get in a room and solve problems together. There's something magical about that partnership. But I've been thinking about something that can kill that magic fast: falling in love with your own idea.

I've been guilty of this. I get excited about a big vision, something transformative. A unified product. A revolutionary system. A big new thing! The idea is so good that I stop seeing it as one possible solution and start seeing it as _the_ solution. The operators' messy real-world problems become "use cases" to plug into my grand vision.

That's when it turns into a sales pitch.

## Give Them Options

It's a relatively common question I've encountered over the years when it comes to offering solutions: should I provide stakeholders a single, "best" recommendation or provide multiple options with tradeoffs? The push for a single option often feels wrong to me. 

The company I work for is obsessed with planes, so an aviation metaphor feels fitting:

If you're a pilot briefing a mission, you don't show up with only one flight plan. You show the fast route with weather risks. The safer but longer route. Maybe a recon route to gather more intel first. You present the trade-offs and let the people funding the mission decide their risk tolerance.

When engineers only present one option, especially a big ambitious one, we're making assumptions about what stakeholders value. We're removing their agency. We transition from engineers to salespeople. Providing options, tradeoffs, and recommendations is a more mature practice, and often more appreciated by senior stakeholders.

## Questions Over Answers

There's this fallacy that the smartest engineer in the room should have all the answers. It's easy to fall into that trap, but I've found it is important to use time with operators, the domain experts, wisely and focus on their problems, and not throw potential solutions at them prematurely. 

Instead of jumping right into a "New Big Thing" that solves all the problems (mic drop), a more helpful approach is to ask questions to really understand the processes and reasoning behind them, and to avoid making assumptions. For example:

"What are the problems with the current process?"

"Why is it done this way? What alternatives have you tried?"

"What metrics do you use to monitor? Which ones would be helpful that you don't have now?"

"How does it fail? What goes wrong, and when does it happen?"

And so on.

These questions don't have to kill the big vision. But they will certainly ground it and make sure it serves the operators it will be built for.

## When You Have to Build the Big New Thing

Sometimes the stakeholders hear all the options and still choose the high-risk plan. They green light the big new thing. That's fine. In the end, it's their call.

But it's our job to make sure the system is built and delivered in a way that minimizes risks while fulfilling the requirements. Once the business has decided to move forward, those questions become even more important. Implementing the controls, building the guardrails, establishing monitoring mechanisms, and having clear, well-defined requirements and acceptance criteria are not optional. Delivering a system without establishing those things is a recipe for failure, in any situation. More so on projects with inherently high risk of failure.

So, even in those cases when the business moves forward with a big new thing in spite of your recommendation, asking questions and listening to the expert operators is still non-negotiable. It may in fact be the only thing that carries you through. 