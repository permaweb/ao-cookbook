# Tracing a Message or Process

Messenger Units (MU's), provide a trace endpoint which allows you to see what is going on with a Message or Process. You must trace on the MU that you wrote the Message to because MU's do not share what they have done with each other. It is valid to write to many different MU's for one process.

The subsequent processing that can occur in the background after a Message is sent from a user/developer, that is related to the Message, can be very large because there is no telling how many Messages and Spawns are coming from the Process.

<strong>You can access the trace endpoint directly from the browser or using another http client</strong>

## Tracing by Message ID

```sh
curl "https://ao-mu-1.onrender.com/?debug=true&message=txidofmessage"
```

## Tracing by Process ID

```sh
curl "https://ao-mu-1.onrender.com/?debug=true&process=txidofprocess"
```

## Tracing everything going on in the MU

```sh
curl "https://ao-mu-1.onrender.com/?debug=true"
```

## Tracing from javascript

```js
fetch("https://ao-mu-1.onrender.com/?debug=true&message=txidofmessage")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```
