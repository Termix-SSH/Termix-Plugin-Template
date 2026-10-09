import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import {
  renderWithApp,
  type RenderedPluginApp,
} from "@termix-ssh/plugin-sdk/testing";
import type { PluginManifest } from "@termix-ssh/plugin-sdk/manifest";
import * as plugin from "../../src/frontend/index";
import manifestJson from "../../manifest.json";
import locales from "../../locales/en.json";

const manifest = manifestJson as unknown as PluginManifest;

let rendered: RenderedPluginApp | null = null;

afterEach(async () => {
  await rendered?.deactivate();
  rendered = null;
});

describe(`${manifest.id} activate`, () => {
  it("registers the rail item and tab", async () => {
    rendered = await renderWithApp(plugin, { manifest, locales });
    expect(rendered.registered.tabs()).toEqual(["hello-world"]);
    expect(rendered.registered.railItems()).toEqual([
      expect.objectContaining({
        id: "hello-world",
        permission: "hello-world.use",
      }),
    ]);
  });

  it("shows the greeting and notes", async () => {
    rendered = await renderWithApp(plugin, {
      manifest,
      locales,
      api: {
        get: vi.fn(async () => ({
          data: {
            greeting: "Hi there",
            notes: [{ id: 1, text: "first", createdAt: "" }],
          },
        })),
      } as never,
    });
    rendered.renderTab("hello-world", { isVisible: true });
    expect(await screen.findByText("Hi there")).toBeTruthy();
    expect(screen.getByText("first")).toBeTruthy();
  });

  it("shows an error when a note cannot be saved", async () => {
    rendered = await renderWithApp(plugin, {
      manifest,
      locales,
      api: {
        get: vi.fn(async () => ({ data: { greeting: "Hello", notes: [] } })),
        post: vi.fn(async () => {
          throw new Error("offline");
        }),
      } as never,
    });
    rendered.renderTab("hello-world", { isVisible: true });
    await screen.findByText(locales.tab.empty);
    fireEvent.change(screen.getByPlaceholderText(locales.tab.placeholder), {
      target: { value: "note" },
    });
    fireEvent.click(screen.getByText(locales.tab.add));
    expect(await screen.findByText(locales.tab.error)).toBeTruthy();
  });
});
