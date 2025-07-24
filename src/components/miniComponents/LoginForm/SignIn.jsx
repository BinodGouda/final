import React from "react";

function SignIn({ signinForm, setSigninForm, passwordVisible, togglePasswordVisibility, handleFormSubmit, handleForgotPassword, handleTabChange }) {
    return (
        <div className="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="signinEmail" className="form-label">Email ID</label>
                    <input
                        type="email"
                        className="form-control"
                        id="signinEmail"
                        placeholder="Enter Email Id..."
                        value={signinForm.email}
                        onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="signinPassword" className="form-label">Password</label>
                    <div className="form-control d-flex align-items-center justify-content-between">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="signinPassword"
                            placeholder="Enter Password..."
                            value={signinForm.password}
                            onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
                            required
                        />
                        <span id="showPassSignin" onClick={togglePasswordVisibility}>
                            <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`} id="SignintogglePasswordIcon"></i>
                        </span>
                    </div>
                </div>
                <a className="anc-link" id="forgetpass" onClick={handleForgotPassword}>Forget Password</a>
                <button type="submit" className="btn regBtn mt-2">Sign In</button>
                <button type="button" className="google-btn">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" /> Sign In with Google
                </button>
                <p className="mt-3">
                    Don't have an account?
                    <a href="#" className="mt-0 anc-link" id="toggleToSignup" onClick={() => handleTabChange("signup")}>Sign Up</a>
                </p>
            </form>
        </div>
    );
}

export default SignIn;