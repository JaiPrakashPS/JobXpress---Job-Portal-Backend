export const sendToken = async (user, statusCode, res, message) => {
  const token = user.getJWTToken();  // Assuming this generates the JWT token

  // Set the expiration directly to 24 hours (in milliseconds)
  const options = {
    expires: new Date(Date.now() + 86400000), // 86400000 ms = 24 hours
    httpOnly: true, // Make sure the cookie is accessible only via HTTP requests for security
  };

  console.log(options);  // This will help you verify the expiration time

 try{
    res.cookie("token", token, options);
    console.log("cookies is being set");
 }
  catch{
    console.log("cant set cookies. you're fucked up");
  }
  res.status(statusCode)  // Set the cookie with the token
    .json({
      success: true,
      user,
      message,
      token,
    });
};
