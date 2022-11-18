import { Hono } from "hono";
import { cards } from "./cards/api"
import { cors } from 'hono/cors'

const app = new Hono();
app.use('/api/*', cors({origin: ['http://localhost:3000', 'https://animecard.pages.dev', 'https://animecard.n1sym.com']}))
app.route("/api/cards", cards)

export default app;