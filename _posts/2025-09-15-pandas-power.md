---
layout: post
date: 2025-09-15
title: Pandas Power
---

Pandas is powerful. In fact, it's so powerful that I routinely use it instead of Excel for even simple analysis.

How can this be? How can a Python data science package be so good it can replace the decades-long champion of data analysis?

It is. And it's amazing.

But I think everyone knows that. What I want to talk about today are some of the more advanced features of pandas that allow it to truly replace Excel for daily analytics.

## Ingesting Your Data

Pandas can work with almost any type of data you throw at it. Most examples use CSVs, which is certainly a mainstay and makes a lot of sense given its closeness to relational databases and Excel. But you can turn damn near anything into a Pandas DataFrame: JSON, a dict, a list, Excel files, XML, HTML, a SQL query, in-memory objects, or data from disk or a remote location. It really is amazing.

Just the other day, I had a large array of JSON data that I needed to analyze. While there are a few options, including delegating to an LLM, pandas is just so easy and fun that I decided to use it instead.

With a simple `pd.read_json('my_file.json')`, I was ready to go. But since there were specific nested subdocuments I cared about, I converted the nested dictionaries from the imported JSON into new DataFrames.

Here's an example of reading JSON into a DataFrame and then unpacking a nested dictionary into a new one.

```python
import pandas as pd

# Assume 'data/example.json' contains JSON like:
# [{"id": 1, "metadata": {"author": "A", "version": 1.1}}, {"id": 2, "metadata": {"author": "B", "version": 1.2}}]

df = pd.read_json('data/example.json')

# 'metadata' is a column where each value is a dictionary.
# We can expand it into its own DataFrame.
df_metadata = pd.DataFrame(df['metadata'].tolist())
```

## Multi-Key Indices

It's common knowledge that every pandas DataFrame has an index. If you leave it as the default, it's the simple, numerically increasing index we all expect. You can, of course, set the index to something more meaningful to use with `.loc`.

But where things get really interesting are multi-key indices, called a MultiIndex. This allows for easy and efficient selections across multiple dimensions of your data.

For example, using a CSV of Olympic athlete data, we can create a MultiIndex to perform some pretty sophisticated analysis, like answering: "What are the top three teams with the most medals in Archery in summer olympics since the year 2000?"

```python
# Assume we have a dataframe `df` with these columns:
# ['Age', 'Height', 'Team', 'Year', 'Season', 'Sport', 'Event', 'Medal']

# First, create a 4-level MultiIndex
df = df.set_index(['Year', 'Season', 'Sport', 'Event'])

# Slicing won't work efficiently if the index isn't sorted
df = df.sort_index()

# Now, answer the question:
# What are the top three teams with the highest medal counts in Archery
# in the Summer olympics since 2000?
top_three_teams = (
    df.loc[(slice(2000, None), 'Summer', 'Archery'), ['Team', 'Medal']]
        .dropna(subset=['Medal'])['Team']
        .value_counts()
        .head(3)
)

print(top_three_teams)
```

## Multi-Column Groupings

The `groupby()` method is a fantastic feature of pandas. Many aggregation functions can only be accomplished after grouping the data. This is an area where pandas really outshines Excel, where the grouping functionality can be cumbersome.

What's more, in pandas, we can group by multiple columns. So, if we have a DataFrame of temperature readings with columns for city, state, year, min_temp, and max_temp, we can easily answer complex questions.

For example, what was the lowest and highest max temp for each city, each year?

```python
# Assume df has columns: ['state', 'city', 'year', 'max_temp']
df.groupby(['state', 'city', 'year'])['max_temp'].agg(['min', 'max'])
```

Or, what were the top three highest temperatures recorded overall?

```python
# Find the max temp for each group, then find the 3 largest of those maxes.
df.groupby(['state', 'city', 'year'])['max_temp'].max().nlargest(3)
```

## Pivot Tables

I always thought pivot tables were just an Excel thing. Then I met pandas!

Pivot tables in pandas are so easy it makes me smile. Just call `pivot_table()` and pass in the properties you want to pivot on, and the magic happens.

Going back to our Olympic dataset, what if we want to see the max height of athletes for each sport over the years? With a `pivot_table`, we can create a new DataFrame with a row for each sport and a column for each year.

```python
# Reshape the data to show the max height for each sport across the years.
df.pivot_table(values='Height', index='Sport', columns='Year', aggfunc='max')
```

Pivot tables open up really complex data analysis opportunities, and I love that they are part of pandas and so accessible.

## Wrapping Up

From multi-level indexing to powerful groupings and pivots, pandas provides a set of tools that can handle just about any analysis task you can think of. It's this depth that makes it an indispensable part of my toolkit.