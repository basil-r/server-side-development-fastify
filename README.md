# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

#### Useful links:

- A PDF file that has color images of the screenshots/diagrams. [Click here to download it](https://packt.link/df1Dm).
- [Code](https://github.com/PacktPublishing/Accelerating-Server-Side-Development-with-Fastify)

## Test server API

### _curl_

POST request `curl` example

```bash
curl -w '\n' -X POST -H 'Content-Type: application/json' -d '{"name":"test"}' http://localhost:1234/json
```

With headers example

```bash
curl -i -w '\n' localhost:8080/test
```

Only status code

```bash
curl -w '\n%{http_code}\n' localhost:8080/test
```

Info for two requests in parallel

```bash
curl -w '\n' -Z localhost:8080/{routeError,routeError}
```

With format file

```bash
curl -Li -w '@.curl-fmt' localhost:8080
```

Usage a config file for POST with json body request  
Put down json body in .curl.json file

```bash
curl -K .curl.conf localhost:8080/test
```
