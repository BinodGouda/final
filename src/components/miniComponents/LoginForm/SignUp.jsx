import React from "react";

function SignUp({ signupForm, setSignupForm, signupPasswordVisible, togglePasswordVisibility, handleFormSubmit, handleTabChange }) {
    return (
        <div className="tab-pane fade show active" id="signup" role="tabpanel" aria-labelledby="signup-tab">
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email ID</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email Id..."
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="newUsername" className="form-label">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="newUsername"
                        placeholder="Enter User Name..."
                        value={signupForm.username}
                        onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3 position-relative">
                    <label htmlFor="signupPassword" className="form-label">Password</label>
                    <div className="form-control d-flex align-items-center justify-content-between">
                        <input
                            type={signupPasswordVisible ? "text" : "password"}
                            id="signupPassword"
                            placeholder="Enter Password..."
                            value={signupForm.password}
                            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                            required
                        />
                        <span id="showPassSignup" onClick={togglePasswordVisibility}>
                            <i className={`fas ${signupPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} id="SignuptogglePasswordIcon"></i>
                        </span>
                    </div>
                </div>
                <button type="submit" className="btn regBtn">Register</button>
                <button type="button" className="google-btn">
                    <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" /> Sign Up with Google
                </button>
                <p className="mt-3">
                    Already have an account?
                    <a href="#" className="mt-0 anc-link" id="toggleToSignin" onClick={() => handleTabChange("signin")}>Sign In</a>
                </p>
            </form>
        </div>
    );
}

export default SignUp;