
import Login from "./pages/auth/login.jsx";
import HomePage from "./pages/auth/HomePage.jsx";
import Dashboard from "./pages/auth/dashboard.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddStudent from "./pages/operator/AddStudent.jsx";
import SearchStudent from "./pages/operator/SearchStudent.jsx";
import UploadDocument from "./pages/operator/UploadDocument.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Dashboard />}>

          <Route path="add-student" element={<AddStudent />} />

          <Route path="search-student" element={<SearchStudent />} />

          <Route path="upload-document" element={<UploadDocument />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;