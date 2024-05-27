const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {

    // autorización por el header
    const { authorization } = req.headers;
    let token = null;

    // si hay un token en el header
    if (authorization && authorization?.startsWith('Bearer')) {
        try {
          token = authorization.split(' ')[1]
          const decored = jwt.verify(token, "LLAVESECRETA")
          return next()
        } catch (e) {
          const error = new Error('Token no válido')
          return res.status(403).json({ msg: error.message })
        }
    }
  

    if (!token) {
        const error = new Error('Token requerido')
        return res.status(403).json({ msg: error.message })
    }
     
    next()

}