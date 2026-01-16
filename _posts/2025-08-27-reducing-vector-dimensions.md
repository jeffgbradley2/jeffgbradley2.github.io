---
layout: post
title: "Finding Trolls with Linear Discriminant Analysis"
date: 2025-08-27
tags: [nlp]
---

Natural language text is rich with meaning. While term frequency and inverse document frequency (TFIDF) can be used to surprisingly good results, it still falls far short of true meaning. For example, term frequency based similarity will find the following two "utterances" quite dissimilar, when in reality, they have very similar meaning.

That film is terrible.
The movie was absolutely awful.

 Semantic analysis is all about finding that meaning by going beyond simple term frequency-based keyword analysis, and into the realm of semantic meaning. It accomplishes this by establishing "topics", and calculating the similarity of words and utterances to those topics, in keeping with the principle that "You can judge a word by the company that it keeps."

But it isn't as simple as this (as if this was simple!). The "curse of dimensionality" is a real problem when doing semantic analysis, as the vectors we create from text corpus can be tens of thousands of dimensions. 

## First Attempt: A Naive Model

To visualize this, let's walk through an example using some data from Natural Language Processing in Action, a great book about NLP. The authors provide a dataset of comments that have been labeled as either toxic or non-toxic. We'll use a technique called Linear Discriminant Analysis on top of TFIDF vectors to see if we can filter out some of the toxic comments and find those trolls.

But first, what the heck is Linear Discriminant Analysis? Well, LDA is a straightforward classifier that is ideal for two-class problems like our toxicity detector. It works kind of like clustering, by approximating a line in the vector space that best separates the two classes, and then projecting points onto the line with some predefined cutoff point. 

We'll use scikit-learn's LinearDiscriminantAnalysis class to make some predictions, and then adjust hyperparameters to improve the accuracy.

First, let's load and explore the data from GitLab, kindly provided by the authors of NLP in Action.

```python
import pandas as pd

url = 'https://gitlab.com/tangibleai/nlpia/-/raw/master/src/nlpia/data/toxic_comment_small.csv'
comments = pd.read_csv(url)
comments.info()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5000 entries, 0 to 4999
Data columns (total 2 columns):
 #   Column  Non-Null Count  Dtype 
---  ------  --------------  ----- 
 0   text    5000 non-null   object
 1   toxic   5000 non-null   int64 
dtypes: int64(1), object(1)
memory usage: 78.3+ KB
```

Looks like we have 5000 labeled examples. We can further examine the ratio of toxic to non-toxic.

```python
mask = comments.toxic.astype(bool).values
toxic_comments = comments[mask]
nontoxic_comments = comments[~mask]
print(toxic_comments.shape)
print(nontoxic_comments.shape)
```
```
(650, 2)
(4350, 2)
```
So there are 650 toxic comments out of 5,000. Let's now tokenize and vectorize the comments. We'll use SpaCy, a world-class NLP framework, as our tokenizer. This will take more time, but will be much better than the default tokenizer used by scikit-learn's TfidfVectorizer. We'll also go ahead and convert the sparse vector to a numpy ndarray.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
import spacy

nlp = spacy.load('en_core_web_sm')

def tokenize(sentence):
    return [tok.text for tok in nlp(sentence.lower())]

vectorizer = TfidfVectorizer(tokenizer=tokenize)
tfidf_docs = vectorizer.fit_transform(comments.text)
tfidf_docs = tfidf_docs.toarray()
print(tfidf_docs.shape)
```
```
(5000, 19160)
```

That's a lot of dimensions! It will probably make it difficult to correctly predict if a comment is toxic. Let's find out.

In order to accurately judge our model, we need to make sure we hold out a test set and use that to gauge the model's performance. We'll use scikit-learn's train_test_split function for that, and use the train set to fit our LDA model. We'll hold out 20% of the comments for testing.

```python
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(tfidf_docs, comments.toxic.values, test_size=.2)
lda_model = LinearDiscriminantAnalysis(n_components=1).fit(X_train, y_train)
print(round(float(lda_model.score(X_train, y_train)), 3))
print(round(float(lda_model.score(X_test, y_test)), 3))
```

```
0.999
0.59
```

Doesn't look very accurate on that held out test set compared to the train set, but let's figure out the actual precision and recall using a confusion matrix. This will tell us the ability of the model to correctly identify true positives and negatives. 

```python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from matplotlib import pyplot as plt

y_pred = lda_model.predict(X_test)
print(confusion_matrix(y_test, y_pred))
ConfusionMatrixDisplay.from_estimator(lda_model, X_test, y_test, display_labels=['non-toxic', 'toxic'])
```
```
[[434  12]
 [ 30  24]]
```

![Confusion matrix](/assets/images/2025-08-27-confusion-martix.png)

Not good! The model is missing more than half of the toxic comments. 

## Less Dimensions, Higher Accuracy

Let's see if we can address the accuracy problem through tweaking our vectorizer hyperparameters. We'll do that by removing stop words, removing any tokens that don't occur in at least 5 comments, and reducing the maximum dimensions of the vector space to 500. 

```python
from sklearn.feature_extraction.text import TfidfVectorizer
import spacy

nlp = spacy.load('en_core_web_sm')

def tokenize(sentence):
    return [tok.text for tok in nlp(sentence.lower())]

# add sto words and min document frequency and max features
vectorizer = TfidfVectorizer(tokenizer=tokenize, min_df=5, stop_words='english', max_features=500)
tfidf_docs = vectorizer.fit_transform(comments.text)
tfidf_docs = tfidf_docs.toarray()
```
Then after we fit our model like before, we'll use the predict_proba function that sets a manual threshold very low, to increase recall at the expense of precision, since false negatives (not catching a troll) is worse than a false positives (incorrectly flagging a non-toxic comment).

```python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from matplotlib import pyplot as plt

y_proba = lda_model.predict_proba(X_test)
y_pred = (y_proba[:, 1] > .05).astype(int)
print(confusion_matrix(y_test, y_pred))
```

```
[[670 203]
 [ 36  91]]
```

Now that's better! We've reduced dimensions in our vector space and created a threshold that allows us to catch 3/4 of the trolls, while flagging 1/4 of the non-toxic as toxic. That's a trade off we may have to accept. Or, we can go deeper into Latent Semantic Analysis. That's for another day!