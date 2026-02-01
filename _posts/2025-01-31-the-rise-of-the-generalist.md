---
layout: post
title: "The Rise of the Generalist"
date: 2025-01-31
tags: [ai, career]
---

Early in my career as a developer, and for many years thereafter, I was fortunate to be forced to be a generalist. I worked at an asset-based logistics company, one that owned and operated warehouses and trucks. I was on a small team of Developers that were responsible for building and maintaining their Warehouse Management System, multiple systems to augment their Transportation Management System, various other systems like a Quality Management System, and all infrastructure that provided those systems (servers, network devices, etc).

I spent many, _many_ hours working in the warehouse with operators, riding on milk runs with truck drivers, experiencing first hand what they did and how they used the systems I built. I spent untold hours configuring servers, outfitting warehouses with switches and access points, and programming handheld computers. On any given day I might have to travel to a remote warehouse to address a network issue, deploy a new version of our WMS, carry out a Root Cause Analysis for a quality non-conformance, or assess the needs of a new customer.

In those days, there were no Product Managers, and most SMBs didn't hire dedicated UI Designers (and still don't). DevOps and QA Engineers weren't common yet, as they are now. And that was a good thing for developers like myself, that learned that the value of what we do is measured by _the business_, not in lines of code or novelty. I learned that operators and users in general don't care about the UI, as long as they can do what they want to do _fast_ and _accurately_. And I learned that operators like it when the people actually building the systems they work on are right there with them on the floor.

More recently, and at SaaS companies in general, the experience is very different. Developers are expected to be specialists in writing code in a handful of languages and frameworks, full stop. Silos have been erected between them and the business users, with Product Managers and UX Designers guarding the gates. And dedicated DevOps and QA Engineers have taken over the other aspects of development.

This rise of the specialists was necessary. The sheer cognitive load of delivering software to many users is tremendous, and each of the specialist categories requires unique skills and techniques. At large SaaS companies building software for end users, generalists just aren't valuable. Specialists are required.

AI is changing that. Now, like never before, a single individual has at their fingertips a competent Software Engineer, Product Manager, UX Designer, DevOps Engineer, and QA Engineer. Not to mention Project Manager, and all the other "manager" roles in modern knowledge work.

That doesn't mean these systems can fully automate or replace those roles. There are aspects of each of them that require genuine human touch, taste, and expertise. But these tools _can_ augment an individual who is also competent and curious about those other areas, to enable them to build systems that meet the needs of their users like they could never have done alone or before AI.

Let me give you an example. In Q4 of last year, I single handedly built a minimally viable Shipment Tracking Copilot for a customer. This is a large system that automates customer service requests for shipment status updates. It consists of an Outlook Plugin written in Typescript and Vue.js, an admin web console also in Typescript and Vue.js, an agentic engine written in Python, a Java backend API, and a Postgresql database, all deployed to Google Cloud Platform as a Kubernetes deployment. I did everything, from requirements gathering, to product management, UX design, all development (coding), testing, and helm charts for K8s. Once complete, I leaned on our DevOps for multi-environment deployments, but the app itself, and everything around it, was done by me. I simply could not have done this without AI.

Another example: my current company employs Integration Engineers, technical business-facing users of our IPaaS product with the responsibility to build and maintain integrations for the company and its customers. Over a few days, one engineer struggled with integrating with a major ocean carrier, and reported some questionable information. I, having significant experience with integrations (as a generalist), dispatched an AI research agent that provided the info I needed, and then generated the code for the integration using that information. It took minutes.

In each of these cases I, a generalist, accomplished in minutes tasks that would have taken traditional specialists days (or more). All of this would have been out of my reach due to constraints on my time and cognitive capacity. No more.

The rise of the generalist is upon us. A single, experienced, motivated, and curious developer can now do what users always expected of us: everything required to build and deliver the software that business users need to accomplish their objectives. That has always been the purpose of what we do. Everything else is "the tail wagging the dog". We are here to build systems for users which make their lives and operations easier and of higher quality.

At the same time, a small team of generalists can now accomplish what previously required large teams of specialists. I believe that this fundamentally changes what small and medium sized businesses can accomplish, opening up opportunities that were previously out of their reach.

Specialists will still have their place in many large companies, particularly those that deliver SaaS products. But for most companies, the generalist will rise again, and this time, developers will be not only expected but _able_ to deliver every aspect of the software development lifecycle _and_ deeply understand the business, working with and along business users, not siloed. Developers need to embrace this trend. Not only is it virtually inevitable (in my opinion), but it is much more fulfilling and valuable. Get out on the floor, and learn to do it all. That is what the future calls for.