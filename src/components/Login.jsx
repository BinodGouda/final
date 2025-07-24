import React, { useState, useEffect, useRef } from "react";
import "./styles/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./miniComponents/LoginForm/SignIn";
import SignUp from "./miniComponents/LoginForm/SignUp";
import ForgotPassword from "./miniComponents/LoginForm/ForgotPassword";

function Login() {
    const [activeTab, setActiveTab] = useState("signin");
    const [isForgotPasswordActive, setIsForgotPasswordActive] = useState(false);
    const [forgotStep, setForgotStep] = useState("forgot");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignupActive, setIsSignupActive] = useState(false);
    const [signinForm, setSigninForm] = useState({ email: "", password: "" });
    const [signupForm, setSignupForm] = useState({ email: "", username: "", password: "" });
    const passwordResetModalRef = useRef(null);

    useEffect(() => {
        document.body.classList.add("login-page");
        return () => {
            document.body.classList.remove("login-page");
        };
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setIsSignupActive(tab === "signup");
    };

    const showPasswordResetModal = () => {
        if (passwordResetModalRef.current) {
            const modal = new window.bootstrap.Modal(passwordResetModalRef.current);
            modal.show();
        }
    };

    const hidePasswordResetModal = () => {
        if (passwordResetModalRef.current) {
            const modal = window.bootstrap.Modal.getInstance(passwordResetModalRef.current);
            if (modal) {
                modal.hide();
            }
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
        setSignupPasswordVisible(!signupPasswordVisible);
    };

    const handleForgotPassword = () => {
        setIsForgotPasswordActive(true);
    };

    const handleResendOTP = () => {
        alert("OTP Resent Successfully");
    };

    const handleOTPVerification = () => {
        showPasswordResetModal();
    };

    const handleResetPassword = () => {
        togglePasswordVisibility();
        setIsForgotPasswordActive(false);
        setForgotStep("forgot");
        hidePasswordResetModal();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (activeTab === "signup") {
            if (!signupForm.email || !signupForm.username || !signupForm.password) {
                alert("Please fill in all fields.");
                return;
            }
        } else {
            if (!signinForm.email || !signinForm.password) {
                alert("Please fill in all fields.");
                return;
            }
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get("tab");
        if (tab && (tab === "signup" || tab === "signin")) {
            setActiveTab(tab);
            setIsSignupActive(tab === "signup");
        }
    }, []);

    return (
        <div className="Login">
            <nav className="navbar navbar-expand-lg ">
                <div className="container">
                    <div className="logo col-md-2">UdhyogUnity</div>
                </div>
            </nav>
            <header id="header">
                <div className="container px-4">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center justify-content-start">
                            <img src="./src/assets/login.jpg" alt="login img" className="img-fluid hero-img" />
                        </div>
                        <div className="col-md-6 rightSec">
                            <div id="ele1" className={`OuterCircle animateElement signup d-flex align-items-center justify-content-center ${isSignupActive ? "signup" : "signin"}`}>
                                <div className="InnerCircle"></div>
                            </div>
                            <div id="ele2" className={`OuterCircle1 animateElement signup d-flex align-items-center justify-content-center ${isSignupActive ? "signup" : "signin"}`}>
                                <div className="InnerCircle1"></div>
                            </div>
                            <div id="ele3" className={`CustomerOuter animateElement signup d-flex align-items-center justify-content-center ${isSignupActive ? "signup" : "signin"}`}>
                                <p>Customer</p>
                            </div>
                            <div id="ele4" className={`BusinessesOuter animateElement signup d-flex align-items-center justify-content-center ${isSignupActive ? "signup" : "signin"}`}>
                                <p>Businesses</p>
                            </div>
                            <div id="card" className={`card py-1 d-flex flex-column align-items-center gap-3 ${isForgotPasswordActive ? "flipped" : ""}`}>
                                <div className="front">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <button className={`nav-link ${activeTab === "signup" ? "active" : ""}`} id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab" aria-controls="signup" aria-selected="true" onClick={() => handleTabChange("signup")}>Sign Up</button>
                                        </li>
                                        <li className="nav-item">
                                            <button className={`nav-link ${activeTab === "signin" ? "active" : ""}`} id="signin-tab" data-bs-toggle="tab" data-bs-target="#signin" type="button" role="tab" aria-controls="signin" aria-selected="false" onClick={() => handleTabChange("signin")}>Sign In</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        {activeTab === "signin" && <SignIn signinForm={signinForm} setSigninForm={setSigninForm} passwordVisible={passwordVisible} togglePasswordVisibility={togglePasswordVisibility} handleFormSubmit={handleFormSubmit} handleForgotPassword={handleForgotPassword} handleTabChange={handleTabChange} />}
                                        {activeTab === "signup" && <SignUp signupForm={signupForm} setSignupForm={setSignupForm} signupPasswordVisible={signupPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} handleFormSubmit={handleFormSubmit} handleTabChange={handleTabChange} />}
                                    </div>
                                </div>
                                <div className="back">
                                    <ForgotPassword forgotStep={forgotStep} setForgotStep={setForgotStep} handleOTPVerification={handleOTPVerification} handleResendOTP={handleResendOTP} handleResetPassword={handleResetPassword} isForgotPasswordActive={isForgotPasswordActive} />
                                </div>
                            </div>
                            <div className="modal fade p-3" id="PasswordReset" aria-labelledby="PasswordReset" aria-hidden="true" ref={passwordResetModalRef}>
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div id="resetPassModal" className="modal-body d-flex justify-content-center align-items-center flex-column gap-5">
                                            <h1>Forgot Password</h1>
                                            <form id="resetPass" onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
                                                <div className="mb-4">
                                                    <label htmlFor="newPass" className="form-label">New Password</label>
                                                    <input type="password" className="form-control" id="newPass" placeholder="Enter Password..." required />
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="confirmPass" className="form-label">Confirm Password</label>
                                                    <input type="password" className="form-control" id="confirmPass" placeholder="Enter Confirm Password..." required />
                                                </div>
                                                <div id="PasswordAlert" style={{ display: "none" }}>
                                                    <p style={{ color: "rgb(196, 45, 45)" }}>Password Doesn't Match</p>
                                                </div>
                                                <button type="submit" className="btn regBtn mt-2">Reset Password</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Login;