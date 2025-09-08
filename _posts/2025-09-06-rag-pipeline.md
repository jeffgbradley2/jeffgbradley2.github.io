---
layout: post
date: 2025-09-06
title: Hello RAG (and Goodbye LlamaIndex)
categories: [featured]
---

One of the first production AI systems I deployed years ago was a chatbot. Back then, I didn't know much about Natural Language Processing or Semantic Analysis. I did some research and found LlamaIndex as a good option to create a Retrieval-Augmented Generation pipeline from markdown documents that provided the context to the chatbot.

This type of setup is pretty standard today, and it worked really well, especially for the low effort. However, as time went on I learned more and found that there really wasn't any magic behind what LlamaIndex was doing. At the same time, I found that the LlamaIndex.TS TypeScript library I used (for it was a NodeJS app written in TypeScript) was limiting me severely. There were conflicts with dependencies (dependency hell), and breaking changes as the library progressed from a RAG focus to an agent focus.

The inability to easily upgrade other libraries, something I needed to do for continual improvement, became unacceptable. The changes to the framework would take more time to learn and implement than it would take me to roll my own. Given the additional benefits of creating my own RAG pipeline, such as more flexibility over chunking, easy hybrid search, and no more dependence on a third party, I decided to move forward with the project.

## The Four Pillars of RAG

Every RAG system consists of a few common components that work together in a pipeline:

**Loading and Chunking**, where documents are read and broken into bite-sized "chunks" of information.

**Embedding**, where the chunks are turned into numeric vectors using an embedding model (often a byproduct of LLM training).

**Retrieval**, storing and searching the vectors, which are like the index for the actual chunks/documents.

**Generation**, where the retrieved chunks/documents are sent as context to an LLM along with the user's query.

So, initially and whenever the corpus changes, documents are loaded and chunked, and embeddings are generated for every chunk. These embeddings are stored along with the chunks, serving as the index. When a user makes a query, the query itself is embedded, and then the most similar embeddings from the vector database are found via cosine similarity. The top k most similar chunks are the context sent to the LLM.

![RAG Pipeline](/assets/images/2025-09-06-mermaid.png)

## My Implementation

Since my production implementation was for a TypeScript app and belongs to the company I work for, I won't share that. Instead, I'll show a much more elegant Python version that leverages the wonderful scikit-learn package. Also, instead of using the OpenAI text-embedding-3-small model to create the embeddings, I'll use the nomic-embed-text open-source embedding model, which is just as good.

### Document Nodes

My documents are markdown, and so there is a natural chunk that consists of each heading and the text content below it, up to the next heading. That is easy enough, but I want to include the surrounding context, like the text of the headings above the current heading. This is a graph problem, and so I've created a DocumentNode that has a reference to the parent node and can create the embedding text we want. This is where we gain the ability to easily augment our chunks now that I'm taking control over the process.

```python
class DocumentNode:
    def __init__(self, level: int, title: str, parent = None):
        self.parent: DocumentNode = parent
        self.level: int = level
        self.title : str = title.replace('#', '').strip() if title else ''
        self.content : str = ''

    def add_content(self, content):
        self.content += content

    def get_embedding_text(self):
        title_text = self.title
        super_node = self.parent
        while super_node:
            title_text = super_node.title + ', ' + title_text
            super_node = super_node.parent
        
        return f"{title_text}\n{self.content}"
```

### Loading and Chunking

I decided to use the python-markdown package to read the markdown into HTML elements, and then use BeautifulSoup to process the markup. I use a stack to manage the nodes: as I parse the document, I push new heading nodes onto the stack. If I encounter a heading of a lower or equal level, I pop the current node off, store it, and continue until I find the correct parent for the new node.

```python
import glob
import markdown
from bs4 import BeautifulSoup

document_nodes = []

for file in glob.glob('files/*.md'):

    with open(file) as f:
        contents = f.read()

    html = markdown.markdown(contents)

    soup = BeautifulSoup(html, 'html.parser')

    node_stack = []

    for element in soup.children:
        element_name: str = element.name

        if not element_name:
            continue
        
        if element_name.startswith('h'):
            current_level = int(element_name[1])
            node = DocumentNode(level=current_level, title=element.get_text())

            while node_stack and node_stack[-1].level >= current_level:
                completed_node = node_stack.pop()
                if completed_node.content:
                    document_nodes.append(completed_node)

            if node_stack:
                node.parent = node_stack[-1]

            node_stack.append(node)
        else:
            if node_stack:
                node_stack[-1].add_content(element.get_text() + "\n")

    for node in node_stack:
        if node.content:
            document_nodes.append(node)
            
    node_stack = []
```

### Embedding

I'll use the ollama python SDK and numpy to create normalized embeddings for the chunks. We need to normalize so that the length of the vectors doesn't improperly influence similarity scores. We can do that easily using numpy.linalg.norm.

```python
from ollama import embeddings
import numpy as np

vector_db = np.array([
    embeddings(model='nomic-embed-text', prompt=node.get_embedding_text())['embedding'] 
    for node in document_nodes])

vector_db_normalized = vector_db / np.linalg.norm(vector_db, axis=1, keepdims=True)
```

### Keyword Search

I decided to augment the pipeline from just semantic embedding to include keyword search. This type of hybrid search is more advanced and results in better search results since it leverages the benefit of classical keyword search using Term Frequency-Inverse Document Frequency (TF-IDF) vectors and semantic embeddings.

To accomplish that, we need to use the TfidfVectorizer from scikit-learn to vectorize the corpus. Note that TfidfVectorizer normalizes by default (L2 normalization), so we don't have to do that manually as we did with the embeddings.

```python
from sklearn.feature_extraction.text import TfidfVectorizer

chunk_texts = [node.get_embedding_text() for node in document_nodes]
vectorizer = TfidfVectorizer(
    stop_words='english',
    max_features=5000,
    ngram_range=(1, 2),
    min_df=2,
    max_df=0.8,
    lowercase=True,
    token_pattern=r'\b[a-zA-Z][a-zA-Z0-9]*\b'
)

tfidf_matrix = vectorizer.fit_transform(chunk_texts)
```

### Hybrid Search Pipeline

So now we have an embedding vector matrix for semantic search and a TF-IDF vector matrix for keyword search. When we receive a query, we run it through the same process, perform a cosine similarity search for both vector databases, and then weight the results before combining them.

This process demonstrates one of the things I love the most about NLP, which is how you can do math with words and use linear algebra to extract meaning from text.

```python
from sklearn.metrics.pairwise import cosine_similarity

def hybrid_search(query, 
                semantic_vectors_norm, 
                tfidf_matrix, 
                tfidf_vectorizer, 
                semantic_weight=0.6, 
                keyword_weight=0.4, 
                top_k=5):
    """
    Performs hybrid search combining semantic similarity and keyword matching.
    
    Args:
        query: The search query string.
        semantic_vectors_norm: Pre-computed AND NORMALIZED semantic embeddings.
        tfidf_matrix: Pre-computed TF-IDF matrix for all chunks.
        tfidf_vectorizer: Fitted TfidfVectorizer instance.
        semantic_weight: Weight for semantic similarity scores (0-1).
        keyword_weight: Weight for keyword similarity scores (0-1).
        top_k: Number of top results to return.
    """
    
    # Get semantic similarity scores
    query_embedding = np.array(embeddings(model='nomic-embed-text', prompt=query)['embedding'])
    query_norm = query_embedding / np.linalg.norm(query_embedding)
    semantic_scores = query_norm.dot(semantic_vectors_norm.T)
    
    # Get keyword similarity scores
    query_tfidf = tfidf_vectorizer.transform([query])
    keyword_scores = cosine_similarity(query_tfidf, tfidf_matrix).flatten()
    
    # Normalize scores to [0, 1] for fair combination
    semantic_scores_norm = (semantic_scores + 1) / 2  # Convert [-1,1] to [0,1]
    
    # Combine scores
    combined_scores = (semantic_weight * semantic_scores_norm) + (keyword_weight * keyword_scores)
    
    top_indices = combined_scores.argsort()[::-1][:top_k]
    return top_indices, combined_scores[top_indices]
```

Note the hyperparameters like the weights and top_k, which can be tuned as needed for the best results with the vectors.

#### Searching Documents

Now, when a query is submitted, we can call our hybrid search function and use the top indices to fetch the document nodes. 

```python
query = "How do I configure the tokenizer?"
top_indices, scores = hybrid_search(query, vector_db_normalized, tfidf_matrix, vectorizer)

print(f"Top results for: '{query}'")
for i, idx in enumerate(top_indices):
  print(f"{i+1}. (Score: {scores[i]:.4f})")
  print(document_nodes[idx].get_embedding_text())
  print("-" * 20)
```

## Wrapping Up

The pipeline above is really only a few lines of code, but it can be used to power any type of RAG or AI search application. I stored everything in memory in simple lists and matrices, and that will work for many applications. But I could easily store the vectors and document nodes/corpus in a vector database like ChromaDB or document database like MongoDB.

 With a little understanding of semantic analysis and standard computer science techniques, we can easily replace bloated frameworks like LlamaIndex with our own implementations that give us more freedom and may even be more performant. And let's be honest, what software developer doesn't prefer to roll their own?