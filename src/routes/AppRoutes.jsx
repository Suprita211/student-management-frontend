import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "../pages/auth/login";
import Dashboard from "../pages/operator/Dashboard";
function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />
 <Route
    path="/operator/dashboard"
    element={<Dashboard />}
    
/>


    <Route
        path="/admin/dashboard"
        element={<Dashboard />}
    />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;