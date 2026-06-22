import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import Dashboard from "../pages/operator/Dashboard";
import CreateStudent from "../pages/operator/CreateStudent";
import SearchStudent from "../pages/operator/SearchStudent";
import UploadDocument from "../pages/operator/UploadDocument";
import AdminEditStudent from "../pages/admin/AdminEditStudent";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {

    return (

        <Routes>

            <Route path="/" element={<Login />} />

            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/operator/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/operator/create-student"
                element={
                    <ProtectedRoute>
                        <CreateStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/operator/search-student"
                element={
                    <ProtectedRoute>
                        <SearchStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/operator/upload-document"
                element={
                    <ProtectedRoute>
                        <UploadDocument />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/edit-student/:studentId"
                element={
                    <ProtectedRoute>
                        <AdminEditStudent />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/search-student"
                element={
                    <ProtectedRoute>
                        <SearchStudent />
                    </ProtectedRoute>
                }
            />

        </Routes>
    );
}

export default AppRoutes;