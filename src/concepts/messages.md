# Messages

ao Messages is the data protocol of ao, messages are designed from ANS-104 DataItems, so they are native to Arweave. The structure of a message when interacting in a ao Process looks like the following:

```lua
{
    Cron = false,
    Data = "Hello aos",
    Epoch = 0,
    From = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs",
    Id = "ayVo53qvZswpvxLlhMf8xmGjwxN0LGuHzzQpTLT0_do",
    Nonce = 1,
    Owner = "z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08",
    Signature = "nXtO4fNC7rQ_b0sMp22A6cY68NQXGTnsqGqGcvhAWULSYpAbWVwL4PX_u6lPEMJE_SdMu-9Ci4ohR25Y-d7T4k3v_t3VaLCvyib9XsLFiJ_Py_S2d58BmbDSgtLA05vOatsjzmkRMf-xltMQdjkcvbJseELjKWyzstib7X6U-y4wKhLa9AG5-3IcsjsNMw0U8Dql5yGFPYspb__bAvkTAfHNpYa2bMgkwCsv727LsZ-yZKPMi5kyhnCVNN1gM7OLr679vn6kGr2BzCgXGyFHLfRDzBLrZESymVocsFuStlGQROwi1M2POzSqQLP3FM-ExdxsdsbaUwCRqbS3LTJ_aBLZcXX3kOUPW-uVR28r8pQUl7Gx3e-cU9Vu2xsuGisR1EpKF57cFitIMDU0hM8HOtGhOGh0Y2rrQ1rCOtgEdaKsMHIBIZl6EaJTJXZG05LmoqvfPx67L9wy9kLEeyTsy2sMS9z4ihje4C1RDY8SerfNXtO5ctzkY2QR46EQPK04-mDXa8mt4b3YWvPtbVYspfQUpKXxsD-u66j0Go_oVACcAWVne0VyD7MliUU2LJ7Id-ghNs8f-jn9dSYc86KADdkGmpPXOw6Qh9ND1wHrqPaano15V1rTsbAH6GiQqO0XXZtc6WDjHJShnKSSs0-5xJ-SgnDFSy8CE_S9worynk0",
    TagArray = {
        [1] = {
            name = "Data-Protocol",
            value = "ao"
        },
        [2] = {
            name = "Variant",
            value = "ao.TN.1"
        },
        [3] = {
            name = "Type",
            value = "Message"
        },
        [4] = {
            name = "From-Process",
            value = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs"
        },
        [5] = {
            name = "From-Module",
            value = "lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ"
        },
        [6] = {
            name = "Data-Protocol",
            value = "ao"
        },
        [7] = {
            name = "Type",
            value = "Message"
        },
        [8] = {
            name = "Variant",
            value = "ao.TN.1"
        },
        [9] = {
            name = "From-Process",
            value = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs"
        }
    },
    Tags = {
        Type = "Message",
        Variant = "ao.TN.1",
        ["Data-Protocol"] = "ao",
        ["From-Module"] = "lXfdCypsU3BpYTWvupgTioLoZAEOZL2_Ihcqepz6RiQ",
        ["From-Process"] = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs"
    },
    Target = "5WzR7rJCuqCKEq02WUPhTjwnzllLjGu6SA7qhYpcKRs",
    Timestamp = 1704936415711,
    ["Block-Height"] = 1340762,
    ["Forwarded-By"] = "z1pq2WzmaYnfDwvEFgUZBj48anUsxxN64ZjbWOsIn08",
    ["Hash-Chain"] = "hJ0B-0yxKxeL3IIfaIIF7Yr6bFLG2vQayaF8G0EpjbY"
}
```

See the spec for most of these, but one property, you will not find on the spec. It is the `From` property, this will either be the `Process` that sent the message or a `Signer`, if it is a `Signer` then the value will be the same as the `Owner` property.
