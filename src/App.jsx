// import AppRoutes from "./routes/AppRoutes";
import Login from "./pages/auth/login.jsx"
import HomePage from "./pages/auth/HomePage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;