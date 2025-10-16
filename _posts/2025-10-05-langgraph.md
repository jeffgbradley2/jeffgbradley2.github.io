---
layout: post
date: 2025-10-5
title: LangGraph Makes Agents Easy
---

Recently, I wrote about how LlamaIndex.TS (the TypeScript version) became a pain to maintain. It was the first framework I used professionally for LLMs, and it worked great for Retrieval-Augmented Generation (RAG) at the time. It probably still does.

But as the framework evolved from retrieval toward more complex agentic workflows, the TypeScript version grew bloated, and the frequent breaking changes became a problem. Having already learned how to create semantic embeddings and TF-IDF vectors myself, I eventually replaced LlamaIndex with a custom hybrid search pipeline of my own design.

That solved my RAG problem, but when it comes to agents, there's an even bigger framework that often gets a bad rap: LangChain.

## The LangChain Dilemma

LangChain is a popular, developer-focused framework for creating agentic workflows.  It provides a ton of abstractions, and it moves fast, with breaking changes, which is just the type of thing that I was tired of with LlamaIndex. It's also highly opinionated, which can rub developers the wrong way.

But while LlamaIndex was struggling to keep things simple in the RAG space, LangChain has established itself as the world leader in agentic workflows. With the recent explosion of agents in almost every use case, it’s hard to ignore.

Enter LangGraph.

## LangGraph for Agent Orchestration

LangGraph appears to be the LangChain team's answer to the community's feedback. It's a library built on top of LangChain that gives developers more direct control over the agent design process. Instead of opaque, pre-packaged chains, LangGraph allows you to define agent workflows as graphs, where each node is a step and edges define the flow. It’s an orchestration framework for developing and deploying long-running, stateful agents.

Let's play with it!

## A Simple Agentic Loop

A great way to start is by creating a workflow where an agent can use one or more tools, as many times as it needs, until it completes a given task. Math is a perfect example since LLMs have historically been bad at it (though they are improving).

First, let's install the necessary packages.

```
pip install langgraph langgraph-prebuilt langchain-core langchain-community langchain-openai
```

Next, let's create some basic math functions which will serve as our tools. The docstrings are used by LangGraph to identify which tools to use, so they are important.

```python

def add(a: float, b: float):
    """Add two numbers together.
    
    Args:
        a (float): The first number to add.
        b (float): The second number to add.
    
    Returns:
        float: The sum of a and b.
    """
    return a + b


def subtract(a: float, b: float):
    """Subtract the first number from the second number.
    
    Args:
        a (float): The number to subtract (subtrahend).
        b (float): The number to subtract from (minuend).
    
    Returns:
        float: The result of b minus a.
    """
    return b - a


def multiply(a: float, b: float):
    """Multiply two numbers together.
    
    Args:
        a (float): The first number to multiply.
        b (float): The second number to multiply.
    
    Returns:
        float: The product of a and b.
    """
    return a * b

```

To make this more interesting, let's add another LLM as a tool. Since LLMs are historically weak at math, we'll create a verify tool that calls a newer, more capable LLM to check our primary agent's work. Now we'll need to import from the dreaded LangChain.

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import  SystemMessage
from langgraph.graph import StateGraph

verifier = ChatOpenAI(model="gpt-5-mini")

def verify(state: MessagesState):
    """Verifies that the math is correct."""
    
    sys_msg = SystemMessage(
        "Verify that the math is correct. Return 'Correct' or 'Incorrect'. If incorrect, give the reason"
        )
    return {"messages": [verifier.invoke([sys_msg] + state['messages'])]}
```

The verify function takes the current MessagesState, adds a system prompt, calls the verifier LLM, and returns the LLM's response to be added back into the state.

Now, we're ready to create our list of tools and our main assistant.

```python

tools = [add, subtract, multiply, verify]

llm = ChatOpenAI(model='gpt-4.1')
llm_with_tools = llm.bind_tools(tools)


sys_msg = SystemMessage(
    """You are an expert at math and a helpful assistant. 
    Always verify the final answer with your tool, and if it is incorrect, recalculate. 
    Return just the final numeric answer.""")

def assistant(state: MessagesState):
    return {"messages": [llm_with_tools.invoke([sys_msg] + state['messages'])]}
```

Notice how we bound our tools list to the primary llm. The assistant function will act as the first node in our graph. Now let's build the graph itself.

```python
from langgraph.graph import StateGraph, MessagesState, START
from langgraph.prebuilt import ToolNode, tools_condition
from IPython.display import Image, display

builder = StateGraph(MessagesState)
builder.add_node("assistant", assistant)
builder.add_node("tools", ToolNode(tools))
builder.add_edge(START, "assistant")
builder.add_conditional_edges("assistant", tools_condition)
builder.add_edge("tools", "assistant")
graph = builder.compile()

display(Image(graph.get_graph().draw_mermaid_png()))
```

One of the cool things about LangGraph is that you can easily display a Mermaid diagram of the graph. In this case, the graph is pretty simple:

![LangGraph graph](/assets/images/2025-10-15-graph.png)

Now let's invoke the graph and display the chain of node and tool calls.

```python

msg = HumanMessage("Calculate (2 + 3) * 10 - 100 * 1.5 then verify your answer")
response = graph.invoke({"messages": msg})
for msg in response['messages']:
    msg.pretty_print()

```

```
================================ Human Message =================================

Calculate (2 + 3) * 10 - 100 * 1.5 then verify your answer
================================== Ai Message ==================================
Tool Calls:
  add (call_Lrnd29vAhmFKiIiJfFRnoesF)
 Call ID: call_Lrnd29vAhmFKiIiJfFRnoesF
  Args:
    a: 2
    b: 3
  multiply (call_ir7GwV9WB3CK6DIwmwcH2aZO)
 Call ID: call_ir7GwV9WB3CK6DIwmwcH2aZO
  Args:
    a: 100
    b: 1.5
================================= Tool Message =================================
Name: add

5.0
================================= Tool Message =================================
Name: multiply

150.0
================================== Ai Message ==================================
Tool Calls:
  multiply (call_p0a4ndPi4LvnguaQRr8GtNqS)
 Call ID: call_p0a4ndPi4LvnguaQRr8GtNqS
  Args:
    a: 5
    b: 10
================================= Tool Message =================================
Name: multiply

50.0
================================== Ai Message ==================================
Tool Calls:
  subtract (call_ZikU6SfgljcSjMZaWOKSUHcP)
 Call ID: call_ZikU6SfgljcSjMZaWOKSUHcP
  Args:
    a: 150
    b: 50
================================= Tool Message =================================
Name: subtract

-100.0
================================== Ai Message ==================================
Tool Calls:
  verify (call_RozIbhVSu4Osemor4ex689st)
 Call ID: call_RozIbhVSu4Osemor4ex689st
  Args:
    state: {'messages': [{'content': 'Calculate (2 + 3) * 10 - 100 * 1.5 then verify your answer', 'type': 'human'}, 
    {'content': 'First, (2 + 3) = 5. Then, 5 * 10 = 50. Next, 100 * 1.5 = 150. Finally, 50 - 150 = -100.', 'type': 'ai'}]}
================================= Tool Message =================================
Name: verify

{'messages': [AIMessage(content='Correct', ...)]}
================================== Ai Message ==================================

-100
```

As you can see, the agent methodically used the tools to perform the calculations and then called the verify tool to confirm its answer before responding.

## Beyond Tools to Model Context Protocol

While the tool-using loop is powerful, agents truly shine in multi-agent systems. LangGraph supports the Model Context Protocol (MCP), and even includes prebuilt functions for creating standard agent types like ReAct agents.

Let's build a ReAct agent that can interact with external services via MCP. If you're like me, you hate dealing with timezones (timezone hell!). We'll give our agent tools to handle timezone conversions and to search the web.

First, install a couple of MCP-compatible tool servers:

```
pip install mcp-server-time mcp-server-fetch
```

Next, we'll use LangGraph to create MCP clients and automatically start the MCP servers.

```python
from langchain_mcp_adapters.client import MultiServerMCPClient
from langgraph.prebuilt import create_react_agent

client = MultiServerMCPClient(
    {
        "time": {
            "command": "python",
            "args": ["-m", "mcp_server_time", "--local-timezone=America/New_York"],
            "transport": "stdio"
        },
        "fetch": {
            "command": "python",
            "args": ["-m", "mcp_server_fetch"],
            "transport": "stdio"
        }
    }
)

tools = await client.get_tools()
agent = create_react_agent("openai:gpt-5-mini", tools)
```

The create_react_agent function abstracts away the graph-building boilerplate for this common pattern. Now, we just need to invoke it.

```python
response = await agent.ainvoke({
    "messages": "Convert 10:30 am New York time to Tokyo time. Then tell me when Claude Haiku 4.5 released."
    })
for message in response['messages']:
    message.pretty_print()
```

The full output of that is too long to display here, so here is the final message content:

```
- 10:30 AM New York (America/New_York) = 11:30 PM Tokyo (Asia/Tokyo) ...
- According to Anthropic’s blog, "Introducing Claude Haiku 4.5" was published on Oct 15, 2025. ...
```

## Wrapping Up

This has been a simple introduction, but hopefully it displayed the power and flexibility of LangGraph. We only scratched the surface. LangGraph also integrates with LangSmith for evaluation and monitoring, and there's a great studio for debugging and visualizing your graphs. We'll dive into those features another day.