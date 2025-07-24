import React from "react";

function ForgotPassword({ forgotStep, setForgotStep, handleOTPVerification, handleResendOTP, handleResetPassword, isForgotPasswordActive }) {
    return (
        <div className="tab-pane justify-content-center align-items-center" id="forgetPassword" role="tabpanel" aria-labelledby="forget-tab" style={{ display: isForgotPasswordActive ? "flex" : "none" }}>
            {forgotStep === "forgot" ? (
                <div id="forgetScreen">
                    <h1 id="forgetHead">Forget Password</h1>
                    <form onSubmit={(e) => { e.preventDefault(); setForgotStep("otp"); }}>
                        <div className="mb-3">
                            <label htmlFor="forget-email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="forget-email" name="email" placeholder="Enter Email Id..." required />
                        </div>
                        <button type="submit" className="btn regBtn">Send OTP</button>
                    </form>
                </div>
            ) : (
                <div id="OTPPage">
                    <h1 className="mb-4">OTP Verification</h1>
                    <p className="mb-4 otpContent">Enter the code from the sms we sent to your email</p>
                    <p><span id="timer">2:30</span></p>
                    <div className="otp-inputs d-flex justify-content-center mt-4 ">
                        <form id="otpForm" className="d-flex gap-2" onSubmit={handleOTPVerification}>
                            <input type="text" maxLength="1" className="otp-box" onInput={(e) => e.target.value && e.target.nextSibling.focus()} />
                            <input type="text" maxLength="1" className="otp-box" onInput={(e) => e.target.value && e.target.nextSibling.focus()} />
                            <input type="text" maxLength="1" className="otp-box" onInput={(e) => e.target.value && e.target.nextSibling.focus()} />
                            <input type="text" maxLength="1" className="otp-box" onInput={(e) => e.target.value && e.target.nextSibling.focus()} />
                            <input type="text" maxLength="1" className="otp-box" onInput={(e) => e.target.value && e.target.nextSibling.focus()} />
                            <input type="text" maxLength="1" className="otp-box" onInput={(e) => e.target.value && e.target.nextSibling.focus()} />
                        </form>
                    </div>
                    <p className="mt-3">
                        I didn't receive any code.
                        <a className="mt-0 anc-link" id="resendOTP" onClick={handleResendOTP}>Resend</a>
                    </p>
                    <button type="submit" className="btn regBtn" onClick={handleOTPVerification}>Verify OTP</button>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;