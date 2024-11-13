---
prev:
  text: "Guides"
  link: "/guides/index"

next: false
---

# AO Dev-Cli 0.1

The AO dev-cli is a tool that is used to build ao wasm modules, the first versions of the tool only supported lua as the embedded language or c based module. With this release developers now can add any pure c or cpp module to their wasm builds. This opens the door for many different innovations from indexers to languages.

## Install

> [!Warning] Requirements
> Docker is required: https://docker.com

```shell
curl -L https://install_ao.g8way.io | sh
```

## Start a project

```shell
ao init [project-name]
```

## Build a project

```shell
cd [project-name]
ao build
```

## Deploy a project

> [!Warning] Requirements
> You will need an arweave keyfile, you can create a local one using this command `npx -y @permaweb/wallet > wallet.json`

```shell
ao publish -w [path_to_wallet] [path_to_wasm]
```

## Configuration

To customize your build process, create a `config.yml` file in the root directory of your project. This file will modify your settings during the build.

### Configuration Options:

- **`preset`**: Selects default values for `stack_size`, `initial_memory`, and `maximum_memory`. For available presets, see [Config Presets](#config-presets). _(Default: `md`)_

- **`stack_size`**: Specifies the stack size, overriding the value from the preset. Must be a multiple of 64. _(Default: `32MB`)_

- **`initial_memory`**: Defines the initial memory size, overriding the preset value. Must be larger than `stack_size` and a multiple of 64. _(Default: `48MB`)_

- **`maximum_memory`**: Sets the maximum memory size, overriding the preset value. Must be larger than `stack_size` and a multiple of 64. _(Default: `256MB`)_

- **`extra_compile_args`**: Provides additional compilation commands for `emcc`. _(Default: `[]`)_

- **`keep_js`**: By default, the generated `.js` file is deleted since AO Loader uses predefined versions. Set this to `true` if you need to retain the `.js` file. _(Default: `false`)_

## Libraries

Starting with version 0.1.3, you can integrate external libraries into your project. To do this, follow these guidelines:

### Adding Libraries

1. **Create a `libs` Directory**: At the root of your project, create a directory named `/libs`. This is where you'll place your library files.

2. **Place Your Library Files**: Copy or move your compiled library files (e.g., `.a`, `.so`, `.o`, `.dylib`, etc.) into the `/libs` directory.
   > [!NOTE]
   > Ensure that all library files are compiled using `emcc` to ensure compatibility with your project.

> [!IMPORTANT]
> More details to come including an example project...

### Example Directory Structure

```
project-root/
│
├── libs/
│ ├── libexample.a
│ ├── libanother.so
│ └── libmore.o
│
├── process.lua
├── ao.lua
│
└── config.yml
```

### Using Libraries in Your Code

After adding the library files to the `/libs` directory, you need to link against these libraries in your project. This often involves specifying the library path and names in your build scripts or configuration files. For example:

- **For C/C++ Projects**: You can just include any header files placed in the libs folder as the libs with be automatically built into your module.
- **For Lua Projects**: Depending on how your build your libraries and if you compiled them with Lua bindings you can just require the libs in your lua files. `markdown = require('markdown')`

> [!IMPORTANT]
> More details to come...

## Lua Build Example

To create and build a Lua project, follow these steps:

```sh
ao init -l lua [project-name]
cd [project-name]
ao build
```

## C Build Example

To create and build a C project, follow these steps:

```sh
ao init -l c [project-name]
cd [project-name]
ao build
```

## Config Presets

Here are the predefined configuration presets:

```js
'xs': {
    'stack_size': 8388608,        // 8mb
    'initial_memory': 16777216,   // 16mb
    'maximum_memory': 67108864    // 64mb
},
'sm': {
    'stack_size': 16777216,       // 16mb
    'initial_memory': 33554432,   // 32mb
    'maximum_memory': 134217728   // 128mb
},
'md': {
    'stack_size': 33554432,       // 32mb
    'initial_memory': 50331648,   // 48mb
    'maximum_memory': 268435456   // 256mb
},
'lg': {
    'stack_size': 50331648,       // 48mb
    'initial_memory': 67108864,   // 64mb
    'maximum_memory': 268435456   // 256mb
},
'xl': {
    'stack_size': 67108864,       // 64mb
    'initial_memory': 100663296,  // 96mb
    'maximum_memory': 536870912   // 512mb
},
'xxl': {
    'stack_size': 100663296,      // 96mb
    'initial_memory': 134217728,  // 128mb
    'maximum_memory': 4294967296  // 4096mb
},
```
