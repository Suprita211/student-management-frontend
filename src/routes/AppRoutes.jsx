import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "../pages/auth/login";
import Dashboard from "../pages/operator/Dashboard";
import CreateStudent from "../pages/operator/CreateStudent";
import SearchStudent from "../pages/operator/SearchStudent";
import UploadDocument from "../pages/operator/UploadDocument"
import AdminEditStudent from "../pages/admin/AdminEditStudent"
import AdminDashboard from "../pages/admin/AdminDashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>
 <Route
    path="/operator/dashboard"
    element={<Dashboard />}
    
/>


  
    <Route
  path="/operator/create-student"
  element={<CreateStudent />}
/>

<Route
  path="/operator/search-student"
  element={<SearchStudent />}
/>
<Route
  path="/operator/upload-document"
  element={<UploadDocument />}
/>
<Route
  path="/admin/edit-student/:studentId"
  element={<AdminEditStudent />}
/>
<Route
  path="/admin/search-student"
  element={<SearchStudent />}
/>
<Route
    path="/forgot-password"
    element={<ForgotPassword />}
/>
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;