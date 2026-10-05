import { useEffect, useState, type FormEvent } from "react";
import {
  useTranslation,
  type TabProps,
  type TermixApp,
} from "@termix-ssh/plugin-sdk/frontend";

const TAB_ID = "hello-world";

interface Note {
  id: number;
  text: string;
  createdAt: string;
}

function HandIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.9-6-2.4l-3.6-3.6a2 2 0 0 1 2.8-2.8L7 15" />
    </svg>
  );
}

function createTab(app: TermixApp) {
  return function HelloWorldTab({ isVisible }: TabProps) {
    const { t } = useTranslation();
    const [greeting, setGreeting] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [draft, setDraft] = useState("");
    const [failed, setFailed] = useState(false);

    const load = async () => {
      try {
        const { data } = await app.api.get<{ greeting: string; notes: Note[] }>(
          "/notes",
        );
        setGreeting(data.greeting);
        setNotes(data.notes);
        setFailed(false);
      } catch {
        setFailed(true);
      }
    };

    useEffect(() => {
      if (isVisible) void load();
    }, [isVisible]);

    const add = async (event: FormEvent) => {
      event.preventDefault();
      if (!draft.trim()) return;
      await app.api.post("/notes", { text: draft });
      setDraft("");
      await load();
    };

    return (
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold">{greeting}</h2>
        <form onSubmit={add} className="flex gap-2">
          <input
            className="flex-1 border border-border bg-transparent px-2 py-1"
            value={draft}
            placeholder={t("tab.placeholder")}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button type="submit" className="border border-border px-3 py-1">
            {t("tab.add")}
          </button>
        </form>
        {failed && <p className="text-sm text-destructive">{t("tab.error")}</p>}
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("tab.empty")}</p>
        ) : (
          <ul className="flex flex-col gap-1">
            {notes.map((note) => (
              <li key={note.id} className="border-b border-border py-1">
                {note.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
}

export function activate(app: TermixApp): void {
  app.registerRailItem({
    id: TAB_ID,
    icon: HandIcon,
    titleKey: "tab.title",
    kind: "tab",
  });
  app.registerTab(TAB_ID, createTab(app), {
    icon: HandIcon,
    titleKey: "tab.title",
    singleton: true,
    hostless: true,
  });
}
