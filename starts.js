import fastify from "fastify";
import fs from "node:fs/promises";

const serverOptions = {
  logger: {
    level: "debug",
    transport: {
      target: "pino-pretty",
    },
  },
  // disableRequestLogging: true,
  requestIdLogLabel: "reqId",
  requestIdHeader: "request-id",
  genReqId: function (httpIncomingMessage) {
    return `foo-${Math.random()}`;
  },
};

async function start() {
  const app = fastify(serverOptions);

  app.addHook("onRoute", function inspector(routeOptions) {
    console.log(routeOptions);
  });

  app.addHook("onRegister", function inspector(plugin, pluginOptions) {
    console.log(`Plugin ${plugin}, options ${pluginOptions}`);
  });

  app.addHook("onReady", async function preLoading() {
    console.log("onReady");
  });
  app.addHook("onReady", function preLoading(done) {
    console.log("onReady2");
    done();
  });

  app.addHook("onClose", function manageClose(done) {
    console.log("onClose");
    done();
  });

  app.route({
    url: "/hello",
    method: "GET",
    handler: myHandler,
  });

  app.get("/short/handler", myHandler);
  app.get("/short/opts", { handler: myHandler });
  app.get("/short/mix", {}, myHandler);

  function myHandler(request, reply) {
    reply.send("world");
  }

  function bussiness(request, reply) {
    return { helloFrom: this.server.address() };
  }

  app.get("/server", bussiness);
  app.get("/fail", (request, reply) => {
    reply.send({ helloFrom: this.server.address() });
  });

  app.get("/multi", function multi(request, reply) {
    reply.send("one");
    reply.send("two");
    reply.send("three");
    this.log.info("this line is executed");
  });

  async function foo(request, reply) {
    return { one: 1 };
  }
  async function bar(request, reply) {
    const onResponse = await foo(request, reply);
    return { one: onResponse, two: 2 };
  }

  app.get("/foo", foo);
  app.get("/bar", bar);

  app.get("/file", function promiseHandler(request, reply) {
    const fileName = "./package.json";
    const readPromise = fs.readFile(fileName, { encoding: "utf8" });
    return readPromise;
  });

  const cats = [];
  app.post("/cat", function saveCat(request, reply) {
    cats.push(request.body);
    reply.code(201).send({ allcats: cats });
  });

  app.get("/xray", function xRay(request, reply) {
    // send back all the request properties
    return {
      id: request.id, // id assigned to the request in req-<progress>
      ip: request.ip, // the client ip address
      ips: request.ips, // proxy ip addressed
      hostname: request.hostname, // the client hostname
      protocol: request.protocol, // the request protocol
      method: request.method, // the request HTTP method
      url: request.url, // the request URL
      routerPath: request.routeOptions.url, // the generic handler URL
      is404: request.is404, // the request has been routed or not
    };
  });

  app.get("/log", function log(request, reply) {
    request.log.info("hello"); // [1]
    request.log.info("world");
    reply.log.info("late to the party"); // same as request.log

    app.log.info("unrelated"); // [2]
    reply.send();
  });

  await app.listen({ port: 0, host: "0.0.0.0" });

  app.log.debug(app.initialConfig, "fastify listening with the config");
  app.log.info("HTTP Server port is %i", app.server.address().port);
}

start();
