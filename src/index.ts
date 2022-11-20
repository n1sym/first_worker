import { Hono } from "hono";
import { cards } from "./cards/api"
import { cors } from 'hono/cors'
import { basicAuth } from 'hono/basic-auth'

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  BASIC_ID: string
  BASIC_PASS: string
  
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const app = new Hono();
    app.use('/api/*', cors({ origin: '*' }))
    app.use(
      '/api/*',
      basicAuth({
        username: env.BASIC_ID,
        password: env.BASIC_PASS,
      })
    )
    app.route("/api/cards", cards)
    return app.fetch(request, env, ctx)
  },
}