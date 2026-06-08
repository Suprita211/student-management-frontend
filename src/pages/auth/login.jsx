import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
function Login() {
     const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axiosInstance.post(
                "/auth/login",
                {
                    email,
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

            // SAVE EMAIL
            localStorage.setItem(
                "email",
                email
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

                    <div className="card p-4">

                        <h3 className="text-center mb-4">
                            Login
                        </h3>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>

                            <div className="mb-3">

                                <label>
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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