//token for time windows
function verifyToken(req, res, next) {
    const bearerToken = req.header("user"); //condition for undefined user
    if (typeof bearerToken !== "undefined") {
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403); //no authorization by server ie forbidden error message
    }
  }
  
  module.exports = verifyToken;
  