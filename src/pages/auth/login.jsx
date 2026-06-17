import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Login() {


const navigate = useNavigate();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {

    e.preventDefault();

    try {

        const response = await axiosInstance.post(
            "/auth/login",
            {
                username,
                password
            }
        );

        // SAVE JWT
        localStorage.setItem(
            "token",
            response.data.token
        );

        // SAVE ROLE
        localStorage.setItem(
            "role",
            response.data.role
        );

        // SAVE USERNAME
        localStorage.setItem(
            "username",
            username
        );

        console.log("Login Success");

        if (response.data.role === "ROLE_ADMIN") {

            navigate("/admin/dashboard");

        } else {

            navigate("/operator/dashboard");

        }

    } catch (error) {

        console.log(error);

        alert("Invalid Credentials");

    }

};

return (

    <div className="container mt-5">

        <div className="row justify-content-center">

            <div className="col-md-4">

                <div className="card p-4 shadow">

                    <h3 className="text-center mb-4">
                        Login
                    </h3>

                    <form onSubmit={handleLogin}>

                        <div className="mb-3">

                            <label className="form-label">
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>

    </div>

);


}

export default Login;
