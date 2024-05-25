import { Hono } from "hono";
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from "@hono/zod-validator";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createId } from '@paralleldrive/cuid2';

const app = new Hono()
    .get("/",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            if (!auth?.userId) {
                return c.json({ error: "Not authenticated" }, 401);
            }

            const data = await db
                .select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId));

            return c.json({ data });
        })
    .post("/",
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({ name: true })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({ error: "Not authenticated" }, 401);
            }
            const [data] = await db
                .insert(accounts)
                .values({
                    id: createId(),
                    userId: auth.userId,
                    ...values,
                })
                .returning();
            if (!data) {
                return c.json({ error: "Error" }, 404);
            }
            return c.json({ data });

        }
    )
export default app;