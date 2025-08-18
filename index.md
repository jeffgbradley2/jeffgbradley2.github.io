---
layout: default
title: Jeff Bradley - AI Engineer, MetaReason Founder
description: "Principal AI Engineer and founder of MetaReason, specializing in AI governance, statistical methods for LLM evaluation, and responsible AI development."
---

# Jeff Bradley

I'm a Principal AI Engineer building responsible AI systems and frameworks. I'm the founder of [MetaReason](https://github.com/metareason-ai), where I'm working to quantify AI confidence through rigorous statistical methods.

## Featured Posts

<ul>
  {% for post in site.posts %}
    {% if post.categories contains 'featured' %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span style="color: #666; font-size: 0.9em;">— {{ post.date | date: "%B %d, %Y" }}</span>
      {% if post.description %}
        <br><span style="color: #555; font-size: 0.9em;">{{ post.description | truncatewords: 20 }}</span>
      {% endif %}
    </li>
    {% endif %}
  {% endfor %}
</ul>

## Recent Posts

<ul>
  {% for post in site.posts limit:10 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span style="color: #666; font-size: 0.9em;">— {{ post.date | date: "%B %d, %Y" }}</span>
    </li>
  {% endfor %}
</ul>

<p style="margin-top: 1.5em;">
  <a href="/archive/" style="font-weight: 500;">→ View all posts</a>
</p>