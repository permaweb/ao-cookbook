---
prev:
  text: "Building with HyperBEAM"
  link: "./building"
---

# Concepts & Migration

Deep dive into AO's architecture, the actor model, and migration strategies for legacy applications.

## AO-Core Protocol

AO-Core is the fundamental protocol enabling trustless, distributed computation across the world. Inspired by Erlang's actor model, it provides mathematical guarantees about program execution while supporting composable development through modular devices.

- **Trustless computation** with mathematical execution guarantees
- **Actor model architecture** for concurrent, message-passing systems
- **Permanent storage** on Arweave with full state recall capability
- **Permissionless access** requiring no registration or central authority

This creates a resilient foundation with no single point of failure, enabling distributed applications that operate indefinitely across the global network.

## AO Processes

AO Processes are persistent, programmable smart contracts that embody the actor model as independent computational units. Each process maintains private state and memory that persists across interactions while storing their complete message history permanently on Arweave.

- **Stateful & persistent** with permanent message history
- **Message-driven communication** ensuring isolation and fault tolerance
- **Dynamic process creation** for complex, evolving systems
- **Ideal for agents, DeFi, games, and social platforms**

This enables complex systems that scale through concurrent execution with natural scalability and resilience.

## Integration & Performance

HyperBEAM transforms AO processes into real-time APIs that seamlessly bridge Web2 and Web3 worlds. This eliminates the traditional oracle problem while providing instant access to permanent computation on Arweave.

- **Built-in Oracle**: Direct HTTP integration with external APIs and web services
- **Real-Time State Access**: Instant reads from permanent Arweave storage
- **Live Web Applications**: Responsive frontends with decentralized backends
- **Cross-Chain Integration**: Unified interface for multi-system interactions

This enables a new class of applications that combine the trustlessness of blockchain with the responsiveness of modern web applications.

## Network Evolution

AO has evolved through distinct network phases, with HyperBEAM Mainnet representing the current state-of-the-art. Launched in February 2025, HyperBEAM introduces high-performance message processing with direct HTTP state exposure that dramatically improves frontend integration.

- **HyperBEAM Mainnet**: HTTP state exposure, high performance, production-ready
- **AO Legacynet**: Original architecture, legacy support, educational use
- **Recommendation**: Use HyperBEAM for all new development

The default node `https://forward.computer` provides access to the production network with modern features and reliability.

## Migration Strategy

Transitioning to HyperBEAM involves replacing expensive dry-run patterns with efficient HTTP state exposure. This fundamentally changes how frontends interact with process data by enabling instant HTTP access that's orders of magnitude faster than traditional queries.

- **Update connection** to use `--node https://forward.computer`
- **Replace dry-run handlers** with HTTP state exposure patterns
- **Add initial state sync** for immediate data availability
- **Update frontend calls** from dry-run to direct HTTP requests

The migration maintains existing process logic while dramatically improving data access patterns and application performance.

## Next Steps

You now have a solid understanding of AO's architecture and migration strategies. The ecosystem provides comprehensive resources for continued learning to help you develop expertise and build sophisticated applications.

- [Tutorials](../tutorials/) - Hands-on projects and practical examples
- [Guides](../guides/) - Specific patterns and implementation techniques
- [References](../references/) - API documentation and technical specifications
- [Migration Guide](../guides/hyperbeam/migration.md) - Detailed step-by-step migration process

For additional support, join the [Discord community](https://discord.gg/qWgGxJKwNJ), check the [HyperBEAM documentation](https://hyperbeam.arweave.net), or browse [community projects](https://marketverse.arweave.net/) for inspiration.
