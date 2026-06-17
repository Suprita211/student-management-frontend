import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "../pages/auth/login";
import Dashboard from "../pages/operator/Dashboard";
import CreateStudent from "../pages/operator/CreateStudent";
import SearchStudent from "../pages/operator/SearchStudent";
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
  path="/operator/create-student"
  element={<CreateStudent />}
/>

<Route
  path="/operator/search-student"
  element={<SearchStudent />}
/>

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;