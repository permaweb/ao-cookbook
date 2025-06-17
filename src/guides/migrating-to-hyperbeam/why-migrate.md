# Why Migrate to HyperBEAM?

HyperBEAM represents a significant evolution from the original `legacynet`, offering a more robust, performant, and feature-rich environment for running AO processes. If you have processes currently running on `legacynet`, migrating them to HyperBEAM is a crucial step to leverage these advancements.

HyperBEAM is not just an update; it's a new foundation for building high-performance decentralized applications. Key benefits include:

- **Enhanced Performance:** Built on Erlang/OTP, HyperBEAM's architecture is optimized for concurrency and fault tolerance, resulting in faster scheduling and more responsive applications.
- **Powerful Developer Tools:** HyperBEAM exposes all of it's state through HTTP, you can use any standard HTTP library to interact with it.
- **Easy Extensibility:** It allows core feature extensibility through [modular devices](../introduction/hyperbeam-devices.md).

The process of migration involves updating your process to take advantage of the new features available in HyperBEAM. One of the most impactful new features is the ability to directly expose parts of your process state for immediate reading via HTTP, which dramatically improves the performance of web frontends and data-driven services. This replaces the need to [call dryruns](https://cookbook_ao.arweave.net/guides/aoconnect/calling-dryrun.html) from legacynet, which was known to cause severe bottlenecks in AO web applications.

### Why Use the Patch Device?

Standard AO process execution typically involves sending a message to a process, letting it compute, and then potentially reading results from its outbox or state after the computation is scheduled and finished. This is asynchronous.

The `patch` device allows for a more direct, synchronous-like read pattern. A process can use it to "patch" specific data elements from its internal state into a location that becomes directly accessible via an HTTP GET request _before_ the full asynchronous scheduling might complete.

This is particularly useful for:

- **Web Interfaces:** Building frontends that need to quickly read specific data points from an AO process without waiting for a full message round-trip.
- **Data Feeds:** Exposing specific metrics or state variables for monitoring or integration with other systems.
- **Caching:** Allowing frequently accessed data to be retrieved efficiently via simple HTTP GETs.
