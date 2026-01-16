---
layout: default
title: Blog Archive
description: Complete archive of all blog posts on engineering, AI, and life.
permalink: /archive/
---

<div class="archive-header">
  <h1 class="archive-title">Archive</h1>
</div>

<div class="archive-controls">
  <div class="search-container">
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <input type="text" id="search-input" class="search-input" placeholder="Search by title..." aria-label="Search posts">
  </div>

  <div class="tag-cloud">
    <div class="tag-cloud-header">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      Filter by Tags
    </div>
    <div class="tag-filters" id="tag-filters">
      {% assign all_tags = "" | split: "" %}
      {% for post in site.posts %}
        {% for tag in post.tags %}
          {% unless all_tags contains tag %}
            {% assign all_tags = all_tags | push: tag %}
          {% endunless %}
        {% endfor %}
      {% endfor %}
      {% assign sorted_tags = all_tags | sort %}
      {% for tag in sorted_tags %}
      <button class="tag-filter" data-tag="{{ tag }}">{{ tag }}</button>
      {% endfor %}
      <button class="tag-filter-clear" id="clear-filters" style="display: none;">Clear</button>
    </div>
  </div>
</div>

<div class="archive-results">
  <p class="archive-count" id="archive-count">Showing {{ site.posts.size }} posts</p>
</div>

<div class="archive-list" id="posts-list">
  {% for post in site.posts %}
  {% assign words = post.content | number_of_words %}
  {% assign minutes = words | divided_by: 200 %}
  {% if minutes < 1 %}{% assign minutes = 1 %}{% endif %}
  <article class="archive-item" data-title="{{ post.title | downcase }}" data-tags="{{ post.tags | join: ' ' | downcase }}">
    <div class="archive-item-main">
      <div class="archive-item-header">
        <h3 class="archive-item-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        {% if post.tags.size > 0 %}
        <div class="archive-item-tags">
          {% for tag in post.tags %}
          <span class="archive-item-tag">{{ tag }}</span>
          {% endfor %}
        </div>
        {% endif %}
      </div>
      <p class="archive-item-excerpt">
        {{ post.content | strip_html | truncatewords: 25 }}
      </p>
    </div>
    <div class="archive-item-meta">
      <span class="archive-item-date">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        {{ post.date | date: "%Y-%m-%d" }}
      </span>
      <span class="archive-item-read-time">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        {{ minutes }} min read
      </span>
    </div>
  </article>
  {% endfor %}
</div>

<div id="no-results" class="no-results" style="display: none;">
  <p class="no-results-text">No system logs found.</p>
  <button class="no-results-reset" id="reset-filters">Reset filters</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const postsList = document.getElementById('posts-list');
  const posts = postsList.querySelectorAll('.archive-item');
  const noResults = document.getElementById('no-results');
  const archiveCount = document.getElementById('archive-count');
  const tagFilters = document.querySelectorAll('.tag-filter');
  const clearButton = document.getElementById('clear-filters');
  const resetButton = document.getElementById('reset-filters');

  let selectedTags = [];

  function filterPosts() {
    const query = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    posts.forEach(function(post) {
      const title = post.getAttribute('data-title');
      const tags = post.getAttribute('data-tags');

      const matchesSearch = query === '' || title.includes(query);
      const matchesTags = selectedTags.length === 0 || selectedTags.every(function(tag) {
        return tags.includes(tag.toLowerCase());
      });
      const matches = matchesSearch && matchesTags;

      post.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    archiveCount.textContent = 'Showing ' + visibleCount + ' post' + (visibleCount !== 1 ? 's' : '');
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    postsList.style.display = visibleCount === 0 ? 'none' : 'block';
    clearButton.style.display = selectedTags.length > 0 ? 'inline-block' : 'none';
  }

  searchInput.addEventListener('input', filterPosts);

  tagFilters.forEach(function(button) {
    button.addEventListener('click', function() {
      const tag = this.getAttribute('data-tag');

      if (this.classList.contains('active')) {
        this.classList.remove('active');
        selectedTags = selectedTags.filter(function(t) { return t !== tag; });
      } else {
        this.classList.add('active');
        selectedTags.push(tag);
      }

      filterPosts();
    });
  });

  clearButton.addEventListener('click', function() {
    selectedTags = [];
    tagFilters.forEach(function(btn) { btn.classList.remove('active'); });
    filterPosts();
  });

  resetButton.addEventListener('click', function() {
    selectedTags = [];
    searchInput.value = '';
    tagFilters.forEach(function(btn) { btn.classList.remove('active'); });
    filterPosts();
  });
});
</script>
