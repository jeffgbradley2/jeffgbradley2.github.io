# About

I'm Jeff Bradley (my friends call me Field), a Principal AI Engineer at a tech company where I build AI systems and frameworks and lead AI strategy. I've got over 15 years of software engineering experience and have spent the last few years focusing exclusively on AI/ML. I'm deeply interested in the evaluation and development of responsible, trustworthy AI systems. 

I'm the founder of [MetaReason](https://github.com/metareason-ai), where I'm working to quantify AI confidence through rigorous statistical methods and modern NLP techniques. I'm deeply interested in evaluating large language models and building custom models that solve real-world problems. 

## What I'm Building

After years of evaluating LLMs and building evaluation frameworks in enterprise settings, I've seen firsthand how difficult it is to create consistently trustworthy AI systems. MetaReason is my vision for bringing classical probability and statistics to bear on this problem, an Open Source, Open Governance approach to AI evaluation that goes beyond qualitative measures.

## Technical Stack

- **AI/ML & Data Science** - Python with the full ecosystem (PyTorch, TensorFlow, scikit-learn, pandas, numpy, etc.)
- **Cloud & MLOps** - Google Cloud Platform native with extensive Vertex AI experience for ML deployment and operations
- **Backend Development** - Java with Spring Boot for enterprise systems
- **Full-Stack** - TypeScript and Node.js for modern web applications
- **Supply Chain Systems** - 15+ years building mission-critical logistics and optimization software

## My Focus Areas

- **Enterprise AI Systems** - Building, deploying, and maintaining AI systems for large-scale enterprise environments
- **AI Risk Management** - Implementing frameworks like ISO 42001 and NIST's AI RMF in practice (ISO 42001 Certified Auditor)
- **Responsible AI** - Building guardrails before stomping on the accelerator
- **AI Governance** - Making governance genuinely beneficial, not just box-checking
- **Statistical Methods for AI** - Applying classical statistical techniques with modern NLP to LLM evaluations

## Open Source

I'm the maintainer and primary contributor to [metareason-core](https://github.com/metareason-ai/metareason-core), an open-source framework for quantifying AI confidence. After years of proprietary work, I'm excited to finally contribute to the open-source community.

## Recent Posts

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span style="color: #666; font-size: 0.9em;">— {{ post.date | date: "%B %d, %Y" }}</span>
      {% if post.excerpt %}
        <br><span style="color: #555; font-size: 0.9em;">{{ post.excerpt | strip_html | truncatewords: 20 }}</span>
      {% endif %}
    </li>
  {% endfor %}
</ul>

## Personal

I'm an avid lifelong learner, addicted to technical books—my hobbies are reading, studying, and more reading. I live in Greenville, SC with my wife and our dog Jones. When I'm not building AI systems or diving into the latest research papers, you'll find me with a book in hand, usually something about mathematics, statistics, or software architecture. [Manning Publications](https://manning.com) is my go-to resource for technical books.

## Connect

- [GitHub - MetaReason](https://github.com/metareason-ai)
- [LinkedIn](https://linkedin.com/in/jeffgbradley)
- [Email](mailto:jeff@metareason.ai)