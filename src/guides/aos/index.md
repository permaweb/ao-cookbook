---
prev:
  text: "Tutorials"
  link: "/guides/tutorials/"
next:
  text: "Introduction to aos"
  link: "/guides/aos/intro"
---

# aos: AO Operating System

aos is a powerful operating system built on top of the AO hyper-parallel computer. While AO provides the distributed compute infrastructure, aos offers a simplified interface for interacting with and developing processes in this environment.

## What is aos?

aos enables you to:

- Create and interact with processes on the AO network
- Develop distributed applications using a simple, intuitive approach
- Leverage the Lua programming language for deterministic, reliable operations

All you need to get started is a terminal and a code editor. aos uses [Lua](../../concepts/lua.md) as its primary language - a robust, deterministic, and user-friendly programming language that's ideal for distributed applications.

> **New to AO?** If you're just getting started, we recommend completing our [tutorials](../../tutorials/index) first. They take just 15-30 minutes and provide an excellent foundation.

## Getting Started with aos

Start here if you're new to aos:

- [Introduction to aos](intro) - Overview of aos capabilities and concepts
- [Installation Guide](installing) - Step-by-step instructions for setting up aos
- [aos Command Line Interface](cli) - Learn to use the aos CLI effectively
- [Customizing Your Prompt](prompt) - Personalize your aos development environment
- [Building a Ping-Pong Server](pingpong) - Create your first interactive aos application

## Developer Resources

More advanced topics for aos development:

- [Editor Setup & Configuration](editor) - Configure your development environment
- [Troubleshooting with ao.link](troubleshooting) - Debug aos applications
- [Understanding the Inbox & Message Handlers](inbox-and-handlers) - Learn how message handling works
- [Frequently Asked Questions](faq) - Find answers to common questions

## aos Modules

aos includes several built-in modules for common operations:

- [JSON Module](modules/json) - Parse and generate JSON data
- [AO Module](modules/ao) - Interface with the AO ecosystem
- [Crypto Module](modules/crypto) - Perform cryptographic operations
- [Base64 Module](modules/base64) - Encode and decode Base64 data
- [Pretty Module](modules/pretty) - Format data for easier reading
- [Utils Module](modules/utils) - Common utility functions

## Blueprints

Blueprints in aos are templates that streamline the development of distributed applications by providing a framework for creating consistent and efficient processes across the AO network.

### Available Blueprints

- [Cred Utils](blueprints/cred-utils) - Tools for managing credentials
- [Staking](blueprints/staking) - Framework for implementing staking mechanisms
- [Token](blueprints/token) - Guide for creating and managing tokens
- [Voting](blueprints/voting) - Blueprint for setting up voting systems
- [Chatroom](blueprints/chatroom) - Template for building chatroom applications

## Navigation

Use the sidebar to browse through specific aos guides. For a more structured learning path, we recommend following the guides in the order listed above.
