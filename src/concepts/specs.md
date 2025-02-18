# ao Specs

### What is `ao`?

The `ao` computer is the [actor oriented](https://en.wikipedia.org/wiki/Actor_model) machine that emerges from the network of nodes that adhere to its core data protocol, running on the [Arweave](https://arweave.org) network. This document gives a brief introduction to the protocol and its functionality, as well as its technical details, such that builders can create new implementations and services that integrate with it.

The `ao` computer is a single, unified computing environment (a [Single System Image](https://en.wikipedia.org/wiki/Single_system_image)), hosted on a heterogenous set of nodes in a distributed network. `ao` is designed to offer an environment in which an arbitrary number of parallel processes can be resident, coordinating through an open message passing layer. This message passing standard connects the machine's independently operating processes together into a 'web' -- in the same way that websites operate on independent servers but are conjoined into a cohesive, unified experience via hyperlinks.
