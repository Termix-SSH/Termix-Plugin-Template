import type { Request, Response, Router } from "express";
import { desc, eq } from "drizzle-orm";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import type { PluginContext } from "@termix-ssh/plugin-sdk/backend";

// The table object ctx.db.define hands back. Drizzle's own types are
// per dialect, so the routes treat it loosely.
type NotesTable = any;

export function registerRoutes(
  router: Router,
  ctx: PluginContext,
  notesTable: NotesTable,
): void {
  router.use(ctx.rbac.require("use") as never);

  const client = () => ctx.db.client<BetterSQLite3Database>();
  const actor = () => ctx.currentActor() as string;

  /**
   * @openapi
   * /plugin-api/hello-world/notes:
   *   get:
   *     summary: List the signed-in user's notes and the admin greeting
   *     tags:
   *       - Hello World
   *     responses:
   *       200:
   *         description: The greeting and the notes, newest first
   */
  router.get("/notes", async (_req: Request, res: Response) => {
    const db = await client();
    const rows = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.userId, actor()))
      .orderBy(desc(notesTable.id));
    const greeting = (await ctx.settings.get<string>("greeting")) ?? "Hello";
    res.json({ greeting, notes: rows });
  });

  /**
   * @openapi
   * /plugin-api/hello-world/notes:
   *   post:
   *     summary: Add a note for the signed-in user
   *     tags:
   *       - Hello World
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               text:
   *                 type: string
   *     responses:
   *       201:
   *         description: Note added
   *       400:
   *         description: Missing or empty text
   */
  router.post("/notes", async (req: Request, res: Response) => {
    const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
    if (!text || text.length > 1000) {
      return res.status(400).json({ error: "text is required" });
    }
    const db = await client();
    // No returning(): MySQL does not support it.
    await db.insert(notesTable).values({ userId: actor(), text });
    res.status(201).json({ success: true });
  });
}
