import fastify from "fastify";

const app = fastify();

app.get("/health", (request, reply) => {
  reply.send({ status: "ok" });
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
