---
layout: default
title: Archive
description: Complete archive of all blog posts.
permalink: /archive/
---

<div class="archive-header">
  <h1 class="archive-title">Archive</h1>
</div>

<div class="archive-controls">
  <input type="text" id="search-input" class="search-input" placeholder="Search by title..." aria-label="Search posts">

  <div class="tag-cloud">
    <div class="tag-cloud-header">Filter by tags</div>
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

<ul class="post-list" id="posts-list">
  {% for post in site.posts %}
  <li class="post-list-item" data-title="{{ post.title | downcase }}" data-tags="{{ post.tags | join: ' ' | downcase }}">
    <span class="post-list-title">
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </span>
    <span class="post-list-date">{{ post.date | date: "%b %d, %Y" }}</span>
  </li>
  {% endfor %}
</ul>

<div id="no-results" class="no-results" style="display: none;">
  <p>No posts found.</p>
  <button class="no-results-reset" id="reset-filters">Reset filters</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var searchInput = document.getElementById('search-input');
  var postsList = document.getElementById('posts-list');
  var posts = postsList.querySelectorAll('.post-list-item');
  var noResults = document.getElementById('no-results');
  var tagFilters = document.querySelectorAll('.tag-filter');
  var clearButton = document.getElementById('clear-filters');
  var resetButton = document.getElementById('reset-filters');

  var selectedTags = [];

  function filterPosts() {
    var query = searchInput.value.toLowerCase().trim();
    var visibleCount = 0;

    posts.forEach(function(post) {
      var title = post.getAttribute('data-title');
      var tags = post.getAttribute('data-tags');

      var matchesSearch = query === '' || title.includes(query);
      var matchesTags = selectedTags.length === 0 || selectedTags.every(function(tag) {
        return tags.includes(tag.toLowerCase());
      });

      var matches = matchesSearch && matchesTags;
      post.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    postsList.style.display = visibleCount === 0 ? 'none' : 'block';
    clearButton.style.display = selectedTags.length > 0 ? 'inline-block' : 'none';
  }

  searchInput.addEventListener('input', filterPosts);

  tagFilters.forEach(function(button) {
    button.addEventListener('click', function() {
      var tag = this.getAttribute('data-tag');
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
