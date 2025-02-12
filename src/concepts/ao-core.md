# AO Core

AO-Core is a protocol built to enable decentralized computations, offering a
series of universal primitives to achieve this end. Instead of enforcing a single,
monolithic architecture, AO-Core provides a framework into which any number of
different computational models, encapsulated as primitive `devices`, can be attached.

AO-Core's protocol offers a framework for decentralized computations, built upon the
following fundamental primitives:

1. Hashpaths: A mechanism for referencing locations in a program's state-space
   prior to execution. These state-space `links` are represented as Merklized lists of
   programs inputs and initial states.
2. A unified data structure for representing program states as HTTP documents,
   as described in the [HTTP Semantics RFC](https://www.rfc-editor.org/rfc/rfc9110.html).
3. A unified protocol for expressing `attestations` of the `states` found at
   particular `hashpaths`. These attestations allow nodes to participate in varied
   economic and cryptographic mechanisms to prove and challenge each-other's
   representations regarding the programs that operate inside the AO-Core protocol.
4. A meta-VM that allows any number of different virtual machines and computational
   models (`devices`) to be executed inside the AO-Core protocol, while enabling their
   states and inputs to be calculated and attested to in a unified format.
