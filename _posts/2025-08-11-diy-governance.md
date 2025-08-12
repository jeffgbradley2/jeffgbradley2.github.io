---
layout: post
title: "DIY Governance"
date: 2025-08-11
---

When you start building a management system, such as an [AI Management System](https://www.iso.org/artificial-intelligence/ai-management-systems) for [ISO 42001](https://www.iso.org/standard/42001) compliance, you'll find no shortage of consultants and platforms eager to do the work for you. They all promise to do it "just right," and they can make it sound like you'd be crazy to go it alone, implementing a governance framework from scratch with simple, readily available tools.

At my day job, we had already used a compliance platform for SOC2 certification, so when I started implementing ISO 42001 and building an AIMS, it seemed natural to offload some of the governance headache to that same platform.

That was a mistake.

It turns out that many consultants and providers think governance and management systems should be generic, filled with compliance theater and drowning in policies and procedures. The particular platform I've been struggling with is adamant about needing a mountain of policies (particularly security policies, which aren't even mentioned in the ISO 42001 standard) while at the same time not requiring any of the actually valuable processes, like AI system impact assessments or risk management.

I haven't used them for anything. I decided early on (as they were dragging their feet, luckily) that I would implement an AIMS myself, to the exact requirements of the standard and customized to our business needs. Instead of using a fancy and expensive platform, I decided to depend on the existing tools we have, which are fantastic: Jira for project management, Confluence for documentation, and good old spreadsheets.

It's amazing what you can do with a ticket system, a wiki, a spreadsheet, and email. It seems that most people need a new app or tool to solve their problems, likely because they don't know what they are doing and won't take the time to learn.

This experience proved to me that most people are simply "tool-chasing," looking for that next shiny application that's going to rule them all. I find it is much better to start simply. The compliance provider would force us into adopting policies and processes that don't fit our company, which we don't want or need, and which would at best slow us down.

In the end, these standards don't require any specific platform or format. That is left up to the business. If you want to adopt a "[docs-as-code](https://www.writethedocs.org/guide/docs-as-code/)" methodology and store everything in Git, go for it! Git is great for stuff like that, with its built-in version control, approval processes, and ease with which Markdown can be displayed in browsers. But if you want to do that and go with some fancy consultant or compliance platform, bad luck; you'll have to adopt their way of doing things, or at best it will be a headache.

Doing it yourself forces you to learn and use the tools at hand. It makes you an expert in the system you are building, which isn't the case if you delegate that responsibility. It gives you a deep understanding and ownership and makes it easy to quickly adapt and refine as you learn more. This is absolutely invaluable as you start out, as you will invariably have to change your approach as you learn more. 

Do it yourself, I say. And if you don't like what you build, blow it away and keep at it. You'll end up with a system that is just right for your company and your processes, as opposed to some one-size-fits-all solution from an overpriced platform.