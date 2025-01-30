export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure cookies in production
    sameSite: "None",  // Required for cross-origin authentication
  };

  console.log("Cookie Options:", options); // Debugging

  res.status(statusCode)
    .cookie("token", token, options) // Sets the cookie
    .json({
      success: true,
      user,
      message,
      token,
    });
};
