---
layout: default
title: Jeff Bradley - AI Engineer, MetaReason Founder
description: "Principal AI Engineer and founder of MetaReason, specializing in AI governance, statistical methods for LLM evaluation, and responsible AI development."
---

# Featured Posts

{% for post in site.posts | sort: 'date' %}
  {% if post.categories contains 'featured' %}
  <article style="margin-bottom: 3em; padding-bottom: 2em; border-bottom: 1px solid #e0e0e0;">
    <h3 style="margin-bottom: 0.5em;">
      <a href="{{ post.url }}" style="text-decoration: none;">{{ post.title }}</a>
    </h3>
    
    <p style="color: #666; font-size: 0.9em; margin-bottom: 1em;">
      {{ post.date | date: "%B %d, %Y" }}
      {% assign words = post.content | number_of_words %}
      • {% if words < 360 %}1 min{% else %}{{ words | divided_by: 180 }} min{% endif %} read
    </p>
    
    <div style="color: #333; line-height: 1.6;">
      {{ post.content | strip_html | truncatewords: 120 }}
    </div>
    
    <p style="margin-top: 1em;">
      <a href="{{ post.url }}" style="font-weight: 500; color: #0066cc;">→ Continue reading</a>
    </p>
  </article>
  {% endif %}
{% endfor %}
  
  <p style="margin-top: 1.5em;">
    <a href="/archive/" style="font-weight: 500;">→ View all posts</a>
  </p>
