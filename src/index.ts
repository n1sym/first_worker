import { Hono } from "hono";
import { cards } from "./cards/api"

const app = new Hono();
app.route("/api/cards", cards)

export default app;