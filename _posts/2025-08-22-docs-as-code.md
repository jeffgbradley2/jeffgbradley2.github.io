---
layout: post
date: 2025-08-21
title: Docs as Code
---

Many compliance frameworks, even modern ones like ISO 42001 for AI management, seem to implicitly encourage a workflow built around Microsoft Word documents. When you build a management system, you must document what you're going to do, why you're doing it, and how you'll ensure it's done correctly. Documentation is the primary technology for human-to-human knowledge sharing, and for a management system, it's non-negotiable.

Organizations codify their operations in policies and procedures. For many, these are boring documents; some people outright hate them. I understand the sentiment. Poorly implemented policies can make individuals feel restricted or encumbered—a topic for another day.

However, I firmly believe that high-quality, well-maintained policies and procedures are a mark of organizational maturity. They are essential for a team to be functional. What I don't understand is why these critical documents must be trapped in .docx files or siloed within a legacy compliance platform. This isn't the 1990s.

## Docs as Code

There is a powerful alternative: the Docs-as-Code approach. This methodology involves treating documentation with the same tools and workflows that developers use for source code. As a technologist, I strive for efficiency and effectiveness, and I've found this to be a far more advanced and capable method for managing the documentation of an AI Management System (AIMS)—or any management system, for that matter.

## Git for Document Control

The single biggest advantage of Docs as Code is git. Git provides enterprise-grade version control out of the box. It elegantly solves many of the challenges that are painful in platforms like SharePoint and are completely absent in wikis like Confluence. Best of all, git is ubiquitous, platform-agnostic, and can be hosted anywhere.

The git branching model is perfectly suited for document control. Consider the standard document lifecycle:

- Check out a document to make changes (git checkout -b new-policy-draft)
- Submit the changes for review (git push and open a pull/merge request)
- Review and Approve the changes (code review interface)
- Merge the approved document to make it current (git merge)

This terminology is native to both document control and software development. With git, these processes can be rigorously enforced and beautifully automated.

## Automate Compliance

Beyond version control, writing documentation in a simple, text-based format like Markdown is a game-changer. Unlike a binary .docx file, Markdown is structured, human-readable, and machine-readable. This opens the door to powerful automation, especially when combined with CI/CD pipelines and modern AI tools.

Imagine this automated workflow for developing a new AI feature:

1. A Product Manager's ticket triggers a CI/CD pipeline, feeding the Problem Requirements Document (PRD) into a purpose-built AI agent.
2. The AI, which has the organization's entire AI System Development Lifecycle (SDLC) in its context, creates a new git branch.
3. In this branch, it automatically generates first drafts of the required documentation: a Problem Definition Document (PDD), an Impact Assessment, and a preliminary Risk Assessment.
4. The pipeline then submits a merge request, which automatically notifies the relevant stakeholders (like the AIMS manager) to review, edit, and approve the drafts.

This transforms a time-consuming, often-dreaded compliance task into a highly-efficient, streamlined process. We can automate the boring parts and free up human experts to focus on high-judgment reviews.

## Modern Problems Require Modern Solutions

Adopting a "Docs as Code" methodology might seem like a significant shift, especially for teams outside of engineering. But the core components are already standard practice in the tech world. Version control is a modern requirement, git is the universal standard, and Markdown is a simple, ubiquitous format.

This approach gives us phenomenal document control, auditable snapshots, transparent governance, and powerful automation—all using free, open-source tooling. It's time our documentation practices evolved to match the sophistication of the systems they govern. It's time to leave the 90s behind.