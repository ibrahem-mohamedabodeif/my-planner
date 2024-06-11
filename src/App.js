import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import TodoPage from "./pages/Todo";
import NotesPage from "./pages/Notes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="todolist" element={<TodoPage />} />
        <Route path="notes" element={<NotesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
