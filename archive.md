---
layout: default
title: Blog Archive
description: "Complete archive of all blog posts about AI governance, MetaReason development, ISO 42001 implementation, and responsible AI practices."
permalink: /archive/
---

# Blog Archive

All posts are listed chronologically with the most recent first.

<div class="archive-container">
  {% for post in site.posts %}
    <div class="archive-item">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <span class="post-date">{{ post.date | date: "%B %d, %Y" }}</span>
      {% if post.description %}
        <p class="post-description">{{ post.description }}</p>
      {% elsif post.excerpt %}
        <p class="post-description">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
      {% endif %}
      {% if post.categories %}
        <div class="post-categories">
          Categories: 
          {% for category in post.categories %}
            <span class="category-tag">{{ category }}</span>
            {% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </div>
      {% endif %}
    </div>
  {% endfor %}
</div>

<style>
.archive-container {
  margin-top: 2em;
}

.archive-item {
  margin-bottom: 2.5em;
  padding-bottom: 1.5em;
  border-bottom: 1px solid #e0e0e0;
}

.archive-item:last-child {
  border-bottom: none;
}

.archive-item h3 {
  margin-bottom: 0.3em;
}

.post-date {
  color: #666;
  font-size: 0.9em;
  display: block;
  margin-bottom: 0.5em;
}

.post-description {
  color: #555;
  font-size: 0.95em;
  line-height: 1.5;
  margin: 0.5em 0;
}

.post-categories {
  margin-top: 0.5em;
  font-size: 0.85em;
  color: #777;
}

.category-tag {
  background-color: #f0f0f0;
  padding: 0.2em 0.5em;
  border-radius: 3px;
  margin-right: 0.3em;
}
</style>