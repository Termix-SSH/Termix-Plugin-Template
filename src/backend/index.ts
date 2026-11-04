import type { Router } from "express";
import type { PluginContext } from "@termix-ssh/plugin-sdk/backend";
import { notes } from "./tables.js";
import { registerOperations } from "./operations.js";
import { registerRoutes } from "./routes.js";

export async function activate(ctx: PluginContext) {
  const notesTable = await ctx.db.define(notes);
  registerRoutes(ctx.http.router<Router>(), ctx, notesTable);
  registerOperations(ctx, notesTable);
}

export async function deactivate() {
  // Everything registered through ctx is disposed by core.
}
