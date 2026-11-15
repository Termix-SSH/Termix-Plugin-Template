import { Hand } from "lucide-react";
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
      try {
        await app.api.post("/notes", { text: draft });
        setDraft("");
      } catch {
        setFailed(true);
        return;
      }
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
    icon: Hand,
    titleKey: "tab.title",
    kind: "tab",
    permission: "use",
  });
  app.registerTab(TAB_ID, createTab(app), {
    icon: Hand,
    titleKey: "tab.title",
    singleton: true,
    hostless: true,
  });
}
