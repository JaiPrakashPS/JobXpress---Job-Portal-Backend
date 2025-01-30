export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();  // Assuming this generates the JWT token

  // Set the expiration directly to 24 hours (in milliseconds)
  const options = {
    expires: new Date(Date.now() + 86400000), // 86400000 ms = 24 hours
    httpOnly: true, // Make sure the cookie is accessible only via HTTP requests for security
  };

  console.log(options);  // This will help you verify the expiration time

  res.status(statusCode)
    .cookie("token", token, options)  // Set the cookie with the token
    .json({
      success: true,
      user,
      message,
      token,
    });
};
