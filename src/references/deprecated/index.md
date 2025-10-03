# Deprecated Features

This section documents features and APIs that have been deprecated in the AO ecosystem. While some deprecated features may still work, they are no longer recommended for new development and may be removed in future releases.

## Overview

As the AO ecosystem evolves, certain features become outdated or are replaced by better alternatives. This documentation helps developers understand:

- Why features were deprecated
- What alternatives to use instead
- Migration timelines and deadlines
- How to update existing code

## Currently Deprecated Features

### Dry Run (Legacynet)

The `dryrun` method for reading process state has been deprecated in favor of HyperBEAM's state exposure mechanism.

- **Status**: Deprecated as of October 2024
- **Deadline**: October 10, 2025 (Legacynet will stop supporting dry runs)
- **Alternative**: [State Patching](../../migrating-to-hyperbeam/state-exposure.md)
- **Details**: [Dry Run Deprecation Guide](./dry-run.md)

## Migration Support

If you need help migrating away from deprecated features:

- Check the [Migrating to HyperBEAM](../../migrating-to-hyperbeam/why-migrate.md) guide
- Join the [Discord community](https://discord.gg/qWgGxJKwNJ) for support
- Review the specific migration guides linked above

## Deprecation Policy

When a feature is deprecated, the AO team typically:

1. Announces the deprecation with clear migration guidance
2. Provides a transition period (when possible)
3. Updates documentation with alternatives
4. Maintains backward compatibility during the transition period
5. Eventually removes the feature in a future release

Always check release notes and this documentation to stay informed about deprecations.
