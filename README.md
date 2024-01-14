#### Useful links:

- A PDF file that has color images of the screenshots/diagrams. [Click here to download it](https://packt.link/df1Dm).
- [Code](https://github.com/PacktPublishing/Accelerating-Server-Side-Development-with-Fastify)

### Test server API

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
curl -Li -w '@.curl-format' localhost:8080
```

Usage a config file for POST with json body request  
Put down json body in .curl.json file

```bash
curl -K .curl.conf localhost:8080/test
```
