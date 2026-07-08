import { BrowserRouter, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function AppContent() {

    const location = useLocation();

  const hideNavbarRoutes = [
    "/",
    "/login",
    "/forgot-password"
];

    return (
        <>
            {/* {!hideNavbarRoutes.includes(location.pathname) &&
                <Navbar />
            } */}

            <AppRoutes />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;