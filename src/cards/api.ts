import { Hono } from "hono";

const PREFIX = "v1:card:";

const cards = new Hono();

const getCard = (KV: KVNamespace, id: string) => {
  return KV.get(`${PREFIX}${id}`, "json")
}

const createCard = async (KV: KVNamespace, param: any) => {
  const id = crypto.randomUUID().slice(0,8)
  await KV.put(`${PREFIX}${id}`, JSON.stringify(param))
  return id
}

cards.get("/:id", async (c) => {
  const id = c.req.param("id")
  const card = await getCard(c.env.first_worker, id)
  return c.json(card)
});

cards.post("/", async (c) => {
  const param = await c.req.json();
  const res = await createCard(c.env.first_worker, param)
  return c.json(res, 201);
});

export { cards };