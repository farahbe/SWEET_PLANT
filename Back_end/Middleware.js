const jwt = require("jsonwebtoken")
const DB = require('./Database/DB')

//--------Token Admin
const tokenadmin = (req, res, next) => {
  
    let token;
    if (req && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    //si il ya bien autorisation dans le front au niveau de la route  on stock le res dans token
    

     console.log(token);
    
    let decoded = jwt.verify(token,'secret') 
 console.log(decoded);
        if (decoded.admin === true) {
            next()
        } else {
            res.status(403).send("Vous n'etes pas l'admin")
        }
        //si le token de decoded est true alors 'next'
}

//------------Token User
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
            res.status(400).send("Cet email existe deja")
        } else {
            next()
        }
    })
}

module.exports = { tokenadmin,tokenuser,emailMiddleware  }