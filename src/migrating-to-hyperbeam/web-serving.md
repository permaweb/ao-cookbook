# Web Serving

Serve dynamic web content directly from AO processes using HyperBEAM. This guide shows how to host websites, serve HTML/CSS/JavaScript, and update content in real-time using an experimental Hyper AOS light implementation.

## Prerequisites

- HyperBeam server running locally
  - `rebar3 shell` from your local HyperBeam repo
- Experimental Hyper AOS light module

## Setting Up the Environment

First, export the AOS module and install the latest preview version of the AOS console:

```bash
# Install the latest preview version of AOS console
preview_ao.arweave.net
```

This installation enables the Lua device on HyperBeam to function as your process's virtual machine.

## Creating a Process

To create a new process on your HyperBeam server:

1. Spin up a new process using the AOS module as the initialization script
   - `export AOS_MODULE=<HyperAOS-Module-ID>`
2. Select the Lua device in the configuration options
3. Verify the process is running with the experimental Hyper AOS

## File Structure

For this demonstration, we'll use three main files:

- `app.css.lua` - CSS styling wrapped in a Lua file
- `app.js.lua` - JavaScript functionality wrapped in a Lua file
- `now.html.lua` - HTML content wrapped in a Lua file

## State Management

Unlike Genesis WASM which requires sending messages to cache with the patch device, Hyper AOS makes state directly available:

```lua
-- Access state
State["someProperty"]
-- Modify state
State["someProperty"] = newValue
```

## Loading Web Assets

### CSS File

Load the CSS file into the process state:

```lua
.load app.css.lua
```

The CSS file sets the content type and body:

```lua
State["app.css"] = {
  ["content-type"] = "text/css",
  body = [[
        /* CSS styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(180deg, #87CEEB 0%, #9980C8 100%);
          min-height: 100vh;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        h1 {
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
          font-size: 2.5rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .marquee-container {
          width: 100%;
          height: 200px;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .marquee-track {
          display: flex;
          position: absolute;
          animation: scroll 20s linear infinite;
          height: 100%;
          align-items: center;
        }
    ]]
}
```

### JavaScript File

Similarly, load the JavaScript file:

```lua
.load app.js.lua
```

The JavaScript file follows the same pattern:

```lua
State["app.js"] = {
  ["content-type"] = "application/javascript",
  body = [[ // JavaScript content here ]]
}
```

### HTML File

Finally, load the HTML file:

```lua
.load now.html.lua
```

The HTML file is placed at the root of the state:

```lua
State["content-type"] = "text/html"
State["body"] = [[
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HyperBeam Marquee Demo</title>
        <link rel="stylesheet" type="text/css" href="now/app.css" />
    </head>
    <body>
        <div class="cloud cloud1"></div>
        <div class="cloud cloud2"></div>

        <h1>Elephant Parade</h1>

        <div class="marquee-container">
            <div class="marquee-track" id="marqueeTrack">
                <!-- Elephants will be added here by JavaScript -->
            </div>
        </div>
        <div class="ground"></div>

        <script type="text/javascript" src="now/app.js"></script>
    </body>
    </html>
]]
```

Note that the HTML references other assets using the path `now/app.css` and `now/app.js`.

## Accessing Your Web Application

1. Retrieve your process ID by examining the inbox commitments:

```lua
Inbox[1].commitments
```

- Look for the signed ID (RSAPS-SHA-256). This appears as a long alphanumeric string like `6oNYypU3EIeauMkTL4EEYKgzASYFebqTCLP8W1idmMB`.

2. Access your web application in a browser:

```
localhost:8734/<processID>~process@1.0/now
```

- Replace the process ID with your actual process ID from the commitments

## Making Dynamic Updates

To demonstrate the dynamic nature of this approach:

1. Modify your HTML file (e.g., change a heading to "Elephant Parade on the beam")
2. Save the changes
3. Reload the file in the AOS console:

```lua
.load now.html.lua
```

4. Refresh your browser to see the changes

## Advanced Capabilities

This approach allows for:

- Real-time updates to web content
- Processing incoming messages to modify the website
- Adding additional content dynamically
- Creating interactive web applications directly within HyperBeam processes

## Warning

The Hyper AOS light implementation used in this guide is experimental and should not be used for production environments. It is intended for demonstration purposes only.
