---
layout: post
date: 2025-11-05
title: Designing with AI
---

As an engineer, I struggle with UX design. I focus on systems thinking, processes, and problem solving. Typography and color schemes are not important to me. But I realize that they are important to how users perceive a system, at least initially. 

AI is a game changer in this regard. But first, what's so special about UI design, anyway?

## It's All About the Honeymoon

In my experience, both with my own perceptions and those of (enterprise) users, I find that design matters a lot as the first impression and initial use. A good design is critical for demos, and like a firm handshake or a suit, creates a sense of polish and professionalism. 

However, and this is a hot take, IT'S ALL SUPERFICIAL. Having worked with many enterprise users, and having used many software applications, I firmly believe that once ANY user gets down to using a system, UI styling fades away. 

I'm not referring to information architecture here. Good UX is always important, to enable users to accomplish their goals easily. I'm referring to style, font, colors. How a button looks does not matter to enterprise users who work in a system all day, I promise you. 

Those things only matter for demos and marketing copy. 

## Design-Challenged

So design matters, particularly layout. But engineers usually aren't good at _any_ design. Even those of us who had a class in college (to be fair, I had a class on information architecture and interfaces, not design) struggle with creating something a "real" UX designer wouldn't laugh at.

I don't know why I'm bad at design. Maybe it is simple education and training, a skill issue. Or maybe it is something more inherent, like my lack of style (or care) in clothing. But design is just not my thing. 

## AI Got Gud at Design

There is a silver lining for those of us who need to deliver systems but don't have the time or patience to read design books and learn Figma, and who don't have the budget for human designers, or need to deliver a shiny prototype before deciding to move forward with a product. 

At some point in the last few months, AI has gotten good at design. I don't know exactly when this occurred, and I haven't tested them all, but the "big three" of Claude, Gemini, and ChatGPT certainly have taken a big step forward in this domain. 

These LLMs can now create interactive designs in seconds. And they aren't bad. In fact, they are far better than what I, a lowly engineer, could come up with, no matter how long I took. 

Take the example below. Given the following prompt, Claude Sonnet 4.5 produced an interactive artifact, written in Typescript and React, which is shown below the prompt.

```
You are an expert UI/UX designer. Your task is to create a mockup for me. We'll iterate on it until happy, then create a style guide. 

The system we are designing the UI for is an enterprise application for monitoring shipments. The intended users are brokers who schedule and coordinate shipments on behalf of their clients. Users expect a modern, sleek interface, with efficient information architecture.

The features are:

- Create Tickets, which are handled by the back-end system (consisting of API, AI agents, integration layer, etc).
- Send and receive emails.
- Configure carriers.

Start with a modern, compact design suitable for enterprise users whose main focus is efficiency.
```

With just that prompt, Claude output the following, which is interactive. I can create new tickets, view messages and carriers, and search.

<p align="center"><img src="/assets/images/2025-11-05-mockup1.png" alt="ShipmentHub Tickets Dashboard" width="60%"></p>

<p align="center"><img src="/assets/images/2025-11-05-mockup2.png" alt="ShipmentHub UI Mockup - Alternative View" width="60%"></p>

This is pretty incredible to me, especially since it produced it in under a minute. 

The most impressive thing is that I can iterate on this live, such as changing color schemes or typography, or completely changing the entire information architecture. And once I'm happy, the LLM can create a professional-grade style guide based on the mockup. 

## Game Changer or Game Over

Mere months ago, Claude was not at all helpful when it came to UX design. It really did git gud, and fast. What this heralds in the long term remains to be seen. At the very least, it is making engineers like myself more capable in generating passable UI design, and that will (should) put pressure on professional designers to step their games up. I can only imagine what a good designer, working in an AI-first design tool, will be able to accomplish. 

Maybe it means designers won't be as needed, as well. Maybe we need fewer. That could apply to everyone. 

But for now, if I'm being honest, I'm quite happy with it. Just like that, one of my rough edges was sanded down a little with AI. 

I'll call that a win for the developers out there. 