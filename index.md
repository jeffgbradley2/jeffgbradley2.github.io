# Jeff Bradley

Building [MetaReason](https://github.com/metareason-ai) to quantify AI confidence.

## Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%B %d, %Y" }}
    </li>
  {% endfor %}
</ul>