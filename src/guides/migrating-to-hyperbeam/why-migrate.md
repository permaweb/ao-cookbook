# Why Migrate to HyperBEAM?

Migrating processes from `legacynet` to HyperBEAM is essential for leveraging significant advancements in performance, features, and developer experience on AO.

HyperBEAM is a new, more robust foundation for decentralized applications on AO, offering several key advantages:

- **Enhanced Performance:** Built on an architecture optimized for concurrency, HyperBEAM provides faster message scheduling and more responsive applications.
- **Direct State Access:** HyperBEAM allows processes to expose their state directly via HTTP. This enables immediate reads of your process's data, eliminating the need for [dry-run](../aoconnect/calling-dryrun.md) messages which were a common performance bottleneck.
- **Easy Extensibility:** It allows core feature extensibility through [modular devices](https://hyperbeam.arweave.net/build/devices/hyperbeam-devices.md).

The most impactful change when migrating is the ability to expose parts of your process state for immediate reading. This dramatically improves the performance of web frontends and data-driven services.

To learn how to implement this, see [Exposing Process State](./exposing-process-state.md).
