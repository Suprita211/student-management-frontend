import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [step, setStep] = useState(1);

    const sendOtp = async () => {

        try {

            const response = await axiosInstance.post(
                "/auth/forgot-password",
                {
                    username
                }
            );

            alert(response.data);
            setStep(2);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Failed to send OTP"
            );
        }
    };

    const verifyOtp = async () => {

        try {

            const response = await axiosInstance.post(
                "/auth/verify-otp",
                {
                    username,
                    otp
                }
            );

            alert(response.data);

            setStep(3);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Invalid OTP"
            );
        }
    };

    const resetPassword = async () => {

        try {

            const response = await axiosInstance.post(
                "/auth/reset-password",
                {
                    username,
                    newPassword
                }
            );

            alert(response.data);

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data ||
                "Password reset failed"
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h3 className="text-center mb-4">
                            Forgot Password
                        </h3>

                        {step === 1 && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">
                                        Username
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <button
                                    className="btn btn-primary w-100"
                                    onClick={sendOtp}
                                >
                                    Send OTP
                                </button>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">
                                        OTP
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={otp}
                                        onChange={(e) =>
                                            setOtp(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <button
                                    className="btn btn-success w-100"
                                    onClick={verifyOtp}
                                >
                                    Verify OTP
                                </button>
                            </>
                        )}

                        {step === 3 && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <button
                                    className="btn btn-warning w-100"
                                    onClick={resetPassword}
                                >
                                    Reset Password
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;