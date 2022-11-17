import { Hono } from "hono";

let cardList = [{ id: 1, name: "2022夏", title: "" }];

const cards = new Hono();

const getCard = (KV: KVNamespace, key: string) => {
  return KV.get(key)
}

cards.get("/:id", async (c) => {
  const id = c.req.param("id")
  const card = await getCard(c.env.first_worker, id)
  return c.json(card)
});

cards.post("/", async (c) => {
  const param = await c.req.json();
  console.log(JSON.stringify(param))
  return c.json("ok", 201);
});

export { cards };