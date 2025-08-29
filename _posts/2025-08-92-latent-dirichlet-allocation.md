---
layout: post
date: 2025-08-29
title: Bayesian Semantic Analysis
---

During my study of semantic analysis, I came across a fascinating algorithm: Latent Dirichlet Allocation, or LDA. (It's an easy one to confuse with Linear Discriminant Analysis, but the two are completely different). While the name is a mouthful, its approach to understanding language is both powerful and intuitive.

At its core, LDA is a topic modeling algorithm, which is a method for dimensionality reduction. When working with text, our vocabulary can easily span tens of thousands of words. Topic modeling aims to distill this vast feature space into a small, meaningful set of "topics." LDA is one way to discover these topics.

But what makes it truly special isn't just what it does, but how it does it. While other methods like Latent Semantic Analysis (LSA) rely on linear algebra (specifically, Singular Value Decomposition or SVD), LDA takes a different route. It's fundamentally probabilistic and built on the principles of Bayesian modeling

## The Bayesian Heart of LDA

The magic of LDA is that it aligns closely with how we naturally think about documents. We assume a document isn't about just one thing; it's a mixture of topics. Similarly, a topic isn't just one word; it's a collection of related words.

LDA uses a Bayesian framework to reverse engineer this process. It looks at the final documents and works backward to infer the hidden topic structure that most likely created them. This process follows the classic Bayesian workflow: Prior Beliefs + Evidence → Updated Beliefs.

The Prior: LDA starts with a belief about how topics and words are distributed, using the Dirichlet distribution. In simple terms, it assumes that documents are likely composed of a few dominant topics (not an even mix of all possible topics) and that topics are defined by a small set of core words. This "distribution of distributions" is our starting point.

The Likelihood: This is the evidence check. The model asks, "Given my prior beliefs about the topic recipes, how likely is it that they would generate the exact documents I see?"

The Posterior: This is the goal. After observing the evidence (the text), the model calculates an updated probability—the posterior—of the most likely hidden topics and their word compositions.

This approach is what makes LDA models so much more interpretable than the abstract vectors produced by LSA.

## LDA in Practice

To use LDA, we first need to convert our raw text into a numerical format. A "bag-of-words" matrix, which counts the frequency of each word in each document, is the perfect input. We can create this easily using tools like Scikit-learn's CountVectorizer, making sure to remove common "stop words."

The trickiest part is choosing the number of topics (n_components) for the model. Much like selecting the number of components in PCA, this is a hyperparameter that often requires experimentation. You're looking for a sweet spot where the topics are distinct and meaningful without being too broad or too specific.

### Example Code

The following code demonstrates the full pipeline. We'll take a dataset of comments, create a bag-of-words representation, use LDA to transform it into topic vectors, and then feed those vectors into a simple classifier.

The goal here isn't to achieve a perfect classification score, but to show how LDA can create meaningful, low-dimensional features from high-dimensional text data.

The following code uses a dataset from NLP in Action, which I used in a previous post. It is just a convenience.

Here, we'll first create a bag of words using scikit-learn's CountVectorizer, then get a train and test set, fit our Latent Dirichlet Allocation model, and then use a linear classifier. If you run the code, the classifier doesn't score great on recall, but that is really representative of the dataset. The point of the code is the creation of the topic vectors which reduce the dimensions of the original bag of words vectors.

```python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

url = 'https://gitlab.com/tangibleai/nlpia/-/raw/master/src/nlpia/data/toxic_comment_small.csv'
df = pd.read_csv(url)

counter = CountVectorizer(
    stop_words='english',
    max_features=1000,
    min_df=2,
    max_df=0.95
)
bow_docs = counter.fit_transform(df.text)

lda = LatentDirichletAllocation(
    n_components=64, 
    learning_method='batch',
    random_state=42,
    max_iter=10
)
lda.fit(bow_docs)
topic_vectors = lda.transform(bow_docs)

X_train, X_test, y_train, y_test = train_test_split(
    topic_vectors, 
    df.toxic.values,
    test_size=.2,
    random_state=42
)

classifier = LinearDiscriminantAnalysis()
classifier.fit(X_train, y_train)
y_pred = classifier.predict(X_test)

print(classification_report(y_test, y_pred))

```

## Final Thoughts

While LSA is a powerful tool, LDA's probabilistic foundation makes it incredibly useful. Its ability to model uncertainty and produce human-interpretable topics are huge advantages.

My dive into LDA was a great reminder that Bayesian modeling pops up everywhere, providing elegant solutions to complex problems even in the messy world of human language. It’s a powerful paradigm for reasoning about incomplete data, and I'm glad to see it at work in the NLP toolkit.