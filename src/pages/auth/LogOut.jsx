import React from 'react'
import { useNavigate } from "react-router-dom";

function LogOut() {
     const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.clear();

        navigate("/");
    };

  return (
      <nav >

            <button
                className="btn btn-danger"
                onClick={handleLogout}
            >
                Logout
            </button>

        </nav>

    );

  
}

export default LogOut