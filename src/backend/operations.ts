import type { PluginContext } from "@termix-ssh/plugin-sdk/backend";
import { eq } from "drizzle-orm";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NotesTable = any;

/**
 * The actions this plugin declares in contributes.operations. Once registered,
 * they show up in Operations Center, Automations, the CLI and the phone app
 * with no other wiring.
 */
export function registerOperations(
  ctx: PluginContext,
  notesTable: NotesTable,
): void {
  if (typeof ctx.operations?.register !== "function") return;
  const client = () => ctx.db.client<BetterSQLite3Database>();

  ctx.operations.register("hello-world.count-notes", {
    run: async () => {
      const userId = ctx.currentActor() as string;
      const rows = await (
        await client()
      )
        .select()
        .from(notesTable)
        .where(eq(notesTable.userId, userId));
      return {
        summary: `${rows.length} notes`,
        data: {
          value: rows.length,
          status: "ok",
          label: `${rows.length} notes`,
        },
      };
    },
  });

  ctx.operations.register("hello-world.add-note", {
    describe: (input) => `Would add the note ${String(input.text)}`,
    run: async (input) => {
      const userId = ctx.currentActor() as string;
      await (
        await client()
      )
        .insert(notesTable)
        .values({ userId, text: String(input.text) });
      await ctx.db.persist({ lazy: true });
      return { summary: "Added a note", changed: true };
    },
  });
}
