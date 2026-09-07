# Recall
 
A drag-and-drop sticky notes app built with React and Supabase. Create notes, move them around a freeform canvas, recolor them, and edit their text — everything autosaves to a Postgres backend as you go.
 
## Features
 
- **Freeform canvas** — notes can be dragged anywhere on the board; position persists across reloads
- **Debounced autosave** — text and position changes save automatically 2 seconds after you stop editing, with a "Saving..." indicator in each note's header
- **Color picker** — select a note, then click a swatch in the side controls to recolor it
- **Add / delete notes** — a floating "+" button creates a new note; each note has its own delete button
- **Persisted backend** — all notes are stored in Supabase (Postgres) and survive refreshes/reloads
## Tech Stack
 
- **Frontend:** React (Vite)
- **Backend:** [Supabase](https://supabase.com) — Postgres database + auto-generated REST API
- **Styling:** plain CSS (no framework)

## How It Works
 
- **State** lives in `NoteContext`, which wraps the app and exposes notes plus CRUD methods (`addNote`, `removeNote`, `saveNote`, `changeNoteColor`) via the `useNotes()` hook.
- **Note data** (`body`, `colors`, `position`) is stored as stringified JSON in the database and parsed back into objects on the client.
- **Dragging** tracks mouse movement while the header is held down, then saves the final position via a debounced save on mouse-up.
- **Text edits** save via the same debounce, 2 seconds after the last keystroke.
- **Color changes** apply to whichever note was last selected (clicked or focused), and clicking empty canvas space deselects the current note.
## Possible Next Steps
 
- Real user accounts with per-user note scoping (currently all notes are globally accessible)
- Realtime sync across tabs/devices via Supabase Realtime subscriptions
- Search/filter across notes
