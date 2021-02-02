const jwt = require("jsonwebtoken")
const DB = require('./Database/DB')

const tokenadmin = (req, res, next) => {
  
    //  let token = req.headers.authorization.split(" ")[1]

    let token;
    if (req && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }

     console.log(token);
    
    let decoded = jwt.verify(token,'secret') 
 console.log(decoded);
        if (decoded.admin === true) {
            next()
        } else {
            res.status(403).send("Vous n'etes pas l'admin")
        }
}

const tokenuser = (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    console.log(token);
   
   let decoded = jwt.verify(token, "secret") 
console.log(decoded);
       if (decoded.user === true) {
           next()
       } else {
           res.status(403).send("Vous n'etes pas l'utilisateur")
       }
}

const emailMiddleware = (req, res, next) => {
    // console.log(req.headers);


    DB.query(`SELECT * FROM administrateur WHERE email = '${req.body.email}'`, function (err, results) {
        console.log(err);
        if (results.length) {
            // console.log('err email already exist')
            res.status(203).send("Cet email existe deja")
        } else {
            next()
        }
    })
}

module.exports = { tokenadmin,tokenuser,emailMiddleware  }