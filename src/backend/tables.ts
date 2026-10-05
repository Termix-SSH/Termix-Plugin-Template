import {
  defineTable,
  id,
  refUser,
  text,
  timestamp,
} from "@termix/plugin-sdk/db";

// Stored as p_hello_world_notes. The prefix comes from the plugin id.
export const notes = defineTable(
  "notes",
  {
    id: id(),
    userId: refUser(),
    text: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  {
    indexes: [{ name: "idx_p_hello_world_notes_user_id", columns: ["userId"] }],
  },
);

// termix-plugin migrations reads this list.
export const tables = [notes];
