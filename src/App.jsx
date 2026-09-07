import NotesPage from "./pages/NotesPage";
import { NoteProvider } from "./context/NoteContext";

function App() {
    return (
        <NoteProvider>
            <div id="app">
                <NotesPage />
            </div>
        </NoteProvider>
    );
}

export default App;