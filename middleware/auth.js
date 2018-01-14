const jwt = require("jsonwebtoken")

exports.loginRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(decoded){
        next();
      } else {
        res.status(401).json({message: 'Please log in first'})
      }
    });
  } catch(e){
    res.status(401).json({message: 'Please log in first'})
  }
}

exports.authorizationRequired = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if(decoded && decoded.id === req.params.uid){
        next();
      } else {
        res.status(401).json({message: 'Unauthorized'})
      }
    });
  } catch(e){
    res.status(401).json({message: 'Unauthorized'})
  }
}
