import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/about/AboutPage";

function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
