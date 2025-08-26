---
layout: post
date: 2025-08-24
title: Bayes to Bag of Words
---

I've been studying and implementing Bayesian modeling for a while. I've learned a lot about it too! All about priors and posteriors, likelihoods and normalizing constants, random variables and distributions, PyMC and Arviz. Along the way I've implemented some cool stuff and really come to appreciate the place that Bayesian modeling and computation have in modern machine learning and data analytics.

But I'm burnt out! I needed a change of pace, something equally practical in my world.

So I went back to what is probably my favorite topic in machine learning and data science: Natural Language Processing.

## Why I love NLP
NLP is pretty incredible to me. Not only is it at the heart of modern AI systems like ChatGPT, but it is used in all kinds of systems for all kinds of tasks. But really, what is truly incredible to me is that through NLP it is possible to do math with words, at incredible scale, and that math is ultimately what allows machines to "understand" and "generate" everything from poetry to computer code.

The core of NLP is pretty simple: turn words into numbers and do math. That's easier said than done, of course, but it kind of is just that simple. One of the simplest methods for this is a "Bag of Words" (BoW) model. Imagine dumping all the words from a document into a bag, ignoring grammar and order, and just counting how many times each word appears. That's the essence of it. Let's start with a simple implementation of this, and then we'll build a more advanced search tool using a technique called TF-IDF.

In a typical NLP pipeline there are stages that involve standardizing text (case folding, lemmatization, stemming, etc), converting the text to tokens (numbers), capturing the text in matrices (lists of lists), and performing linear algebra (matrix multiplication). Many complex system are built on pipelines like this.

## Bag of Words Example
First, let's load our data and create a simple bag of word counts using scikit-learn.

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.datasets import fetch_20newsgroups
import pandas as pd

# Fetch some data using a scikit-learn dataset
newsgroups_data = fetch_20newsgroups(subset='all', remove=('headers', 'footers', 'quotes'))

# Using a dataframe makes things easier
df = pd.DataFrame({
    'text': newsgroups_data.data,
    'category': [newsgroups_data.target_names[idx] for idx in newsgroups_data.target],
    'doc_id': range(len(newsgroups_data.data))
})

# Simple count vectorizer to create the bag of words
count_vectorizer = CountVectorizer(
    stop_words='english',
    min_df=2,
    max_features=5000
)

# Matrix with the counts of each word for each text
count_matrix = count_vectorizer.fit_transform(df['text'])

# Our vocabulary
vocab = count_vectorizer.get_feature_names_out()

# Dataframe makes things easier
bow_df = pd.DataFrame(count_matrix.toarray(), columns=vocab)

# Let's see what the most common words in our bag are
print("Top 10 most common words in the corpus:")
print(bow_df.sum(axis=0).sort_values(ascending=False).head(10))
```

That simple code is good enough to do some pretty significant similarity searching using linear algebra.

## Vector Math

I'm pretty sure people I work with are tired of hearing me talk about vectors. But they are a critical piece of NLP. You may have forgotten your high school or college math, but at some point you were probably introduced to linear algebra and did math with vectors. It is incredible to me that these vectors can be used to determine the geometric similarity between two texts using techniques in NLP pipelines like the one I mentioned above.

The mind blowing way this works is as follows: a vector (a list of numbers) can be represented geometrically in a high-dimensional space, and since it is a geometric space, the distance between two vectors can be measured using Euclidean geometry. However, in practice, given the high dimensions we deal with (tens of thousands!), it is more efficient and accurate to use cosine distance, which is the measure of the angle between two vectors.

In practice, we often work with cosine similarity, which is derived from the same angle (cosine_similarity = 1 - cosine_distance). A similarity of 1 means the texts are very alike (a 0° angle), while a similarity of 0 means they are unrelated (a 90° angle).

## Visualizing Vectors
To make the concept of vectors a little more concrete, let's visualize them with Matplotlib.

The code below creates two simple vectors that we can visualize (and grok) in 2-dimensional space. This will make it easy to see the "direction" and length (magnitude) of each of the vectors. We'll use the matplotlib.pyplot.quiver function to create plots with arrows pointing in the direction of the vectors, with the origin (0, 0) as the source.

```python
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

palette = sns.color_palette('muted')

vecs = pd.DataFrame([[1, 0], [2, 1]],columns=['x', 'y'])
vecs['color'] = palette[:2]
vecs['label'] = [f'vec{i}' for i in range(1, len(vecs) + 1)]

for i, row in vecs.iterrows():
    plt.quiver(0, 0, row['x'], row['y'], angles='xy', scale_units='xy', scale=1, color=row['color'], label=row['label'])

plt.legend()
plt.xlim(-1, 3)
plt.ylim(-1, 2)
plt.xlabel('Dimension 1 (e.g., frequency of "science")')
plt.ylabel('Dimension 2 (e.g., frequency of "space")')
plt.show()
```
![Vector visualization showing two vectors in 2D space](/assets/images/2025-08-24-vectors.png)

We can now measure the cosine of the angle between these two vectors to determine their distance, which is a measure of their similarity.

## A Simple NLP Example with TF-IDF

Now let's build on this by creating a more advanced search pipeline using TfidfVectorizer. As opposed to our simple bag of words which factors just the Term Frequency in each document (the count), TFIDF (Term Frequency - Inverse Document Frequency) factors in the count of documents the term appears in. The fewer overall documents the term appears in, the more important it is for the current document. 

Here is what our pipeline will do:

1. Preprocess the corpus we already loaded.
2. Fit a TF-IDF model to the corpus.
3. Perform a keyword search and find the most relevant (similar) documents.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Create our TF-IDF vectorizer
vectorizer = TfidfVectorizer(
    stop_words='english',
    lowercase=True,
    min_df=2)

# Now we will fit the model and transform our text from the DataFrame
vector_db = vectorizer.fit_transform(df['text'])

# Our query...
query = "graphics card"

# Vectorize the query
query_vector = vectorizer.transform([query])

# Perform cosine similarity and returns a vector of similarity scores
similarity_scores = cosine_similarity(vector_db, query_vector).flatten()

# Let's just get the top 5 most relevant
top_indices = np.argsort(similarity_scores)[-5:][::-1]

print(f"The top 5 relevant documents for: '{query}'")
print("-" * 70)

for i, doc_idx in enumerate(top_indices, 1):
    score = similarity_scores[doc_idx]
    category = df.loc[doc_idx, 'category']
    # Clean up the text for a concise preview
    text_preview = df.loc[doc_idx, 'text'].replace('\n', ' ').strip()

    print(f"\n{i}. Similarity Score: {score:.4f}")
    print(f"   Category: {category}")
    print(f"   Preview: {text_preview[:200]}...")
    print("-" * 50)
```

The output from the above code is a list of 5 most similar texts to our query keywords from the newsgroup dataset. It may not seem like much, but this is actually the core of many modern search engines, and the results from this pipeline could be used as part of a Retrieval Augmented Generation (RAG) pipeline for an LLM Q&A chatbot.