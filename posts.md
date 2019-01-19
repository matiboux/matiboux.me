---
title: List of posts
layout: post
---

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url | relative_url }}) <small>posted on {{ post.date | date: "%B %e, %Y" }}</small>
{% endfor %}
