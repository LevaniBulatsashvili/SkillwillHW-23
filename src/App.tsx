import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import PageLayout from "./layouts/PageLayout";
import TodoPage from "./pages/TodoPage";
import Header from "./layouts/Header";
import CreatePage from "./pages/CreatePage";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <PageLayout>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </PageLayout>
    </Provider>
  );
}

export default App;
