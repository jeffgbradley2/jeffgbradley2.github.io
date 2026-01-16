---
layout: post
title: "First MetaReason Run"
date: 2025-10-25
tags: [metareason, engineering]
---

Well, it's taken a while to get back to running pipelines, but I got there. The first MetaReason run, with my own hand-written code (vs all the AI generated code I deleted). 

<div class="tenor-gif-embed" data-postid="5444501" data-share-method="host" data-aspect-ratio="1.69307" data-width="100%"><a href="https://tenor.com/view/feels-good-man-nicolas-cage-gif-5444501">Feels Good GIF</a>from <a href="https://tenor.com/search/feels-gifs">Feels GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>

After deleting all that code (over 25,000 lines!) I've been working nights, line by line, rewriting code over and over for practice. It's been fun (mostly), but it has taken time. 

Now, while there is much to do, I have a working pipeline. 

For my test, I created a single test specification in yaml configured to run 100 samples, with two oracles, each an LLM judge, and the outputs fed into the Bayesian analyzer. The result is the output below, which is simply console output (visualization is coming!). 

![MetaReason Output](/assets/images/2025-10-25-metareason-output.png)

Simple, but it's giving me what I want: a Bayesian high density interval that allows us to say how confident we are that the actual score for the given evaluation is within the interval. 

This is very early, and there are many more modules and refinements to come. But it feels good to be this far!