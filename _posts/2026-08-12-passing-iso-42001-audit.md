---
layout: post
date: 2026-04-12
title: Passing the ISO 42001 Audit With Zero Findings
tags: ['ai', 'ai-governance']
---

There are not many organizations that have taken an AI Management System through the full ISO 42001 registration process yet. As of April 8, Rygen Technologies is among those companies, and we did it with zero findings. This is a practitioner account of what it took: building the system, operating it, auditing it, and getting it certified.

## What is ISO 42001?

ISO is an international standards body, the most recognized in the world. It publishes many standards covering a wide array of domains, such as quality, security, and safety. Most people encounter ISO 9001 for Quality Management Systems, ISO 27001 for Information Security, or ISO 45001 for Occupational Health and Safety.

At its core, ISO prescribes a Systems Approach to management. Organizations are complex, and the processes within them are interconnected, inputs become outputs, outputs become inputs, and the quality of the whole depends on the quality of each part and how they interact. ISO standards provide systematic frameworks for managing these interconnected processes, whether the domain is quality, security, risk, or AI.

ISO 42001 is a new standard that details the requirements for governing AI systems responsibly and effectively. Like other ISO standards, it provides the guidelines and requirements for the organization, leadership, planning, operations, support, and continual improvement of an AI Management System. It focuses heavily on identifying and mitigating AI risks and the control of risk factors, as well as analysis and planning of the impact of AI systems on individuals, groups, and society.

## Why I Reached For It

When I was tasked with building an AI org and leading AI strategy at Rygen, my first thought was to research and reach for a standard. With experience implementing and maintaining ISO 9001-compliant systems in the past, ISO was the obvious first place to look. Luckily, the ISO 42001 standard had recently become generally available.

Reaching for a standard made sense because we are all new to this. Having experience with AI, I know how novel this technology is. I believed then and now that it is going to have a profound impact on how we work, at the individual, group, and societal level. I believe we should be humble in the face of such new and exciting technology, and take a systems approach to managing risks and capitalizing on opportunities.

This is an approach that requires long-term strategic thinking, which is somewhat at odds with what you may hear on Twitter from VCs and Silicon Valley startup founders proclaiming that you should be going as fast as you can, consequences be damned. But that is a false dichotomy; the truth is much more nuanced.

Governance is simply a requirement for large systems that carry risk, lest they descend into chaos, and taking a systems approach to managing opportunities and risks, and indeed an entire organization, is a proven methodology. But these processes do not have to hinder an organization. In fact, in the long term, they are proven to outlast the "move fast or die" companies that come and go. And taking a systems approach to how we approach the management of systems ensures that the very systems we use to manage our processes are monitored, optimized, and continually improving.

## How I Built the Rygen AI Management System

### Project Planning

Like any project, we started with planning. I developed an implementation plan and project timeline, and presented it to my CTO, who approved it. The plan consisted of implementing each section of the standard, then the controls, while founding an AI Governance Committee and training other members of the team. We would then perform internal audits, fix any nonconformances, and schedule the first round of audits. The timeline was to be certified within 12 months.

### Docs As Code

Documenting the system is critical, and we evaluated a few approaches. After starting with Confluence, which was already used as our wiki and knowledgebase, I transitioned to a Markdown and git based system for all documents and records following the Docs-As-Code methodology. As an engineering organization, we are Git-native, use Markdown profusely, and have robust processes for managing and versioning code in GitLab. We also saw the opportunity for increased automation with agentic coding tools, such as Claude Code, by moving everything to Markdown and Git.

It turned out to be a phenomenal decision. GitLab natively handles versioning, reviews, and approvals, with deep history for every change. We link that with Jira, where we track issues for everything we do. And Hugo static sites are generated for all of our docs and records, with policies and procedures deployed to our AI Handbook site, and our governance records deployed to an internal AIMS Governance site.

Adopting tools we use natively, as opposed to some external platform or consultant-provided shell, had major implications. First, we had to build the system ourselves, without relying on third party consultants or providers. Second, we adopted tools we readily had available, are extremely familiar with, at no additional cost, and no learning curve for new processes. Third, like good engineers, we were able to optimize and automate with pipelines, scripts, and AI, greatly enhancing our throughput.

For example, there was a recent request for a change to one of our deployed AI systems. A Jira epic was created automatically, with subtasks for all required steps of the AI Change Management Process. We then created a Change Assessment, carried it out per the Jira ticket, and submitted a PR for review by the applicable governance committee members, who did so in GitLab, and approved the change, which was merged into our main branch and deployed to our static site, all automatically. From there, we proceeded to implement the change, evaluate it, test it, deploy, and monitor, per the process, with everything documented in GitLab and tracked in Jira.

### Governance Committee

A critical first step with the implementation of our AIMS was the formulation of an AI Governance Committee made up of team leads across the organization. We met monthly, where I reported on progress with AIMS implementation and AI systems we were developing. Performance was analyzed, and decisions were made together with a range of perspectives, from engineering to product, solutions to leadership.

### The AI Software Development Lifecycle

ISO 42001 is all about the AI System Lifecycle. We established our own AI System Development Lifecycle, or SDLC, based on our existing SDLC but mapped to the requirements of ISO 42001 and the unique demands of AI/ML projects. It consists of phases, each of which address requirements of the standard and our own internal practices, starting with Problem Definition where we identify impacts and risks and make decisions on whether to proceed, and progressing through design and development, monitoring, and improvement. At each phase, we produce artifacts like specifications and plans, and evidence that we carried them out per our policies and procedures.

A good example is the AI initiatives that our sister company brought to us last year. We followed our AI SDLC, went to their site to define the problems of each use case, assessed impacts, risks and required mitigations, and decided jointly on Go/No-Go gates. From there, we created detailed system design specifications and monitoring plans, built the system to those specs, and implemented the risk treatments required by the assessments. It resulted in high visibility for our customer and confidence that the risks were effectively mitigated, while still delivering and iterating rapidly.

### AI Risk Management

We developed an AI Risk Management Framework largely based on the NIST AI Risk Management Framework. It involves a systematic approach to identifying and classifying risks and rating them based on the likelihood of occurrence and the impact should it occur. For every system we build, we create a Risk Assessment that identifies these risks, and individual Risk Reports for those that detail the existing controls and any additional treatments required. Those treatments are then designed and implemented, with monitoring and evaluation put in place to ensure they are performing as required to mitigate the risks.

### Internal Audits

We carried out multiple internal audits, as required by ISO. Another member of our team and I got certified as internal auditors, and together we carried out multiple rounds of internal audits of our systems. Each audit consisted of creating an audit plan and a checklist that we used to scour our systems for any sign of nonconformance or opportunity for improvement. We used AI to help us find evidence and perform objective assessments of compliance, and to generate documentation as we progressed. When completed, we reported the results to management and created Jira epics and bug tickets for opportunities and nonconformances.

In the first internal audit, I identified numerous ways we could improve our management system, as well as a number of nonconformances that needed to be addressed prior to the registration audits. This is exactly what internal audits are for: finding the gaps before an external auditor does. We addressed each nonconformance, tracked the corrective actions through Jira, and verified the fixes in subsequent audit rounds. By the time we entered the registration process, we had been through multiple cycles of audit, correct, and verify, and the system was materially stronger for it.

## The Audits

Once we had a working system, audited, and addressed nonconformances, we were ready to contract an auditing body and start the process. We went through an RFQ process, and after assessing a number of auditors we landed on an American company that seemed like a good fit. We then proceeded to the initial Pre-registration Readiness Audit, a 1 day affair where the auditor interviewed key members of the team and verified that we are competent in ISO 42001 and that we have a working AI Management System in place. It was short and sweet, and the auditor noted verbally and in his report that we were clearly ready for the formal registration audit.

Initial ISO registration audits consist of 2 stages. The first stage involves a review and verification that the AI Management System meets the requirements of ISO 42001. The auditor reviewed our policies and procedures, interviewed us, and verified that we had met all requirements. It lasted 2 days, and the final audit report had a number of observations and no nonconformances.

We proceeded to schedule the final Stage 2 audit. The earliest date we could get was three months after Stage 1, and in that time we updated our AIMS to address the observations from the Stage 1 audit, and carried out another internal audit of the controls required by ISO 42001.

The Stage 2 audit was _much_ more involved than Stage 1. It lasted 5 days during which I worked closely with the auditor, pulling hundreds of records of the operation of our AIMS. While Stage 1 consisted of "Pull your Impact Assessment Procedure", Stage 2 was "Show me the Risk Assessment for this AI system, now show me the controls identified in the assessment, show me where the assessment was approved, where it was reviewed, now show me how the controls are monitored, how do you verify they are working, show me where those were reviewed... ok now let's look at the resources for that AI system", for every AI system we have deployed and are developing! It was intense.

At the end of the audit, we received the final report with zero findings. Our hard work addressing the observations from Stage 1 paid off. The auditor approved our certification, and commented on the maturity of our system and its functioning. We were thrilled!

## What ISO 42001 Certification Means

Given the benefit of taking a systematic approach to the development and management of AI systems, why did we even need to get certified? Why not just reap the benefits of having such a system, and save the cost and stress of getting audited and certified?

The answer is that an ISO certification is a world-recognized stamp of approval that our systems meet their high standard. It gives us credibility and acknowledges our responsible approach to building AI systems. This will enable us to work with and within highly regulated domains and with enterprise customers for whom risk and control matter deeply.

But certification is not the finish line, and to that end we must continually recertify every year to verify that we are continuing to not only operate our AIMS to the ISO 42001 standard, but _improve_ it, measurably and demonstrably increasing our effectiveness in delivering responsible AI systems to our customers.

## How It Feels

It's been almost a year from initial project conception to the final audit. It feels great to have built something from nothing, operated it, improved it, and had a third party verify it meets the standards of ISO 42001. It was a huge team effort, especially from my CTO and the Governance Committee members. The support and teamwork was amazing, and bringing a big project home successfully together feels amazing.

Working on a project like this is unique in a number of uncomfortable ways. There is the tension of sustained effort without shipping features, and the increasing governance overhead that can sometimes feel like compliance theater. It puts strain on individuals who didn't ask for and may not initially be interested in a compliance framework layered on top of their processes. But as we progressed through the design and build, the rollout and familiarization, and continued improving and optimizing, we've reached a state where we have a framework that is genuinely helpful and appreciated, even though it is early days still.

That, along with the certification, feels very good.

## Looking Ahead

As we move forward into 2026, my main priority with the AIMS is continuing to improve it. I want to automate the bureaucratic surface areas: the generation of standard documents, templated processes, audit preparations and evidence collection. I want to evolve our AIMS with agentic AI that augments human judgment and governance decisions, while automating the tedium. And I want to optimize delivery velocity and ROI while maintaining quality and the risk posture we have so carefully developed over the past year.

Hopefully, at the end of 2026, our AIMS is serving us not just as a tool for gaining new clients, but is making our use and development of AI systems increasingly safer and more scalable. As AI gets increasingly more capable and the pressure to deploy it grows, having an ISO certified framework for governing them will ensure that we are successful in the long term.
