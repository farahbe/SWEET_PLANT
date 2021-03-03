const con = require ('../Database/DB');
const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const middleware = require('../Middleware')

//----------------------------------------------COMPTE----------------------------

// Creation de compte pour le user
router.use('/sign-up', middleware.emailMiddleware)
// verifie si le mail existe deja

router.post('/sign-up', (req, res) => {
    try {
        if (!req.body.pseudo) throw 'NO pseudo';
        if (!req.body.prenom) throw 'NO prenom';
        if (!req.body.email) throw 'NO Email';
        if (!req.body.password) throw 'NO password';
        // if (!req.body.Date_de_naissance) throw 'NO Date de naissance';
        if (!req.body.Avatar) throw 'NO Avatar';
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            console.log(hash);
            let NewUser = `INSERT INTO user (pseudo, prenom, Email, Password, Date_de_naissance, Avatar, inscrit_a_la_newsletter) VALUES ('${req.body.pseudo}','${req.body.prenom}','${req.body.email}','${hash}','${req.body.Date_de_naissance}','${req.body.Avatar}','${req.body.inscrit_a_la_newsletter}')`;
            con.query(`SELECT * FROM user WHERE Email = '${req.body.email}'`, function (err, result) {
                if (result.length) {
                    res.status(400).json("Cette email existe deja");
                }else{
                    con.query(NewUser, function (error, resultat){
                        res.status(200).json('Valide')
                    })
                }
            })
        })
    } catch (error){
        console.log(error);
    }
})

//Connecxion au compte de l'utilisateur
router.post('/sign-in', function (req, res) {
    try {
        con.query(`SELECT * FROM user WHERE Email = '${req.body.email}'`, function (err, result) {
            console.log(result);
             
            if (result.length > 0) {
                bcrypt.compare(req.body.password, result[0].password, function (err, resultat) {
                    console.log('je suis dans le compare');
                    console.log(resultat);
                    let token = jwt.sign({ id_user: result[0].id_user, pseudo: result[0].pseudo, email: result[0].email, avatar: result[0].avatar, user: true }, 'secret', { expiresIn: 86400 });
                    if (resultat == true) {
                        console.log(token);
                        res.status(200).json({ auth: true, token: token });
                    } else {
                       res.status(203).send ('Désolé le mot de passe est incorrecte !')
                    }
                })
            } else {
               res.status(203).send ('Désolé Utilisateur introuvable !')
            }
        })
    } catch (error) {
        res.status(203).send(error);
    }
})

router.get('/user/:id', (req, res)=> {
    try {
       
        let id_user_infos = req.params.id
        let infosuser = `SELECT * FROM user WHERE id_user = '${id_user_infos}'`
        con.query(infosuser, function (err, results){
            if (err) res.status(203).send(err)
            res.send(results)
        })
    
    } catch (error) {
        res.status(203).send(error)
    }

})


// Suprimmer son compte user
router.delete('/user/:id', function (req, res){
    try {
        con.query("DELETE FROM user WHERE id_user = ?", [req.params.id], function (err, result) {
            if (err) throw err
             res.send(result)
    })
    } catch (error){
        res.status(203).send(error)
    }
   
})

// Modifier le compte user
router.put('/user/:id_user', function (req, res) {
    try {

        let change_user = `UPDATE user SET pseudo = '${req.body.pseudo}', prenom = '${req.body.prenom}', 
        Email = '${req.body.email}', Password = '${req.body.password}', Date_de_naissance = '${req.body.date_de_naissance}', avatar = '${req.body.avatar}', WHERE id_user = '${req.params.id_user}'`;

    con.query(change_user, function(err, result){
        if (err) throw err;
        console.log(result);
        res.status(200).send(result)
    })      
    } catch (error) {
        res.status(400);

    }
    
})


 //------------------------------------------------COMMENTAIRE USER--------------------------------------------

// Poster un commentaire utilisateur
// router.use('/postcomments', middleware.tokenuser)

router.post('/postcomments', (req, res)=> {
    try {
        let addcomment = `INSERT INTO commentaires_user (pseudo, commentaire, avatar, date_de_commentaire, id_article, id_user) VALUE ('NULL','${req.body.commentaire}','NULL','${new Date}','${req.body.id_article}','${req.body.id_user}')`;
        con.query(addcomment, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).send(result)
        })      
        } catch (error) {
            res.status(400);
    
        }
        
    })
           
// Modifier le commentaire d'un utilisateur
router.put('/postcomments/:id_commentaire_user', function (req, res) {
    try {

        let change_comments = `UPDATE commentaires_user SET pseudo = '${req.body.pseudo}', commentaire = '${req.body.commentaire}', 
        avatar = '${req.body.avatar}', date_de_commentaire = '${req.body.date_de_commentaire}' WHERE id_commentaire_user = '${req.params.id_commentaire_user}'`;

    con.query(change_comments, function(err, result){
        if (err) throw err;
        console.log(result);
        res.status(200).send(result)
    })      
    } catch (error) {
        res.status(400);

    }
    
})


// Supprimer son commentaire

router.delete('/postcomments/:id', function (req, res){
    try {
        con.query("DELETE FROM commentaires_user WHERE id_commentaire_user = ?", [req.params.id], function (err, result) {
            if (err) throw err
             res.send(result)
    })
    } catch (error){
        res.status(203).send(error)
    }
   
})

// recupere commentaire du user (ID)
router.get('/postcomments/:id', (req, res)=> {
    try {
       
        let iduser = req.params.id
        let commentaireuser = `SELECT * FROM commentaires_user WHERE id_commentaire_user = '${iduser}'`
        con.query(commentaireuser, function (err, results){
            if (err) res.status(203).send(err)
            res.send(results)
        })
    
    } catch (error) {
        res.status(203).send(error)
    }

})

router.get('/commentsbypostid/:id', (req, res)=> {
    try {
       
        let idarticle = req.params.id
        let commentaireuser = `SELECT * FROM commentaires_user WHERE id_article = '${idarticle}'`
        con.query(commentaireuser, function (err, results){
            if (err) res.status(203).send(err)
            res.send(results)
        })
    
    } catch (error) {
        res.status(203).send(error)
    }

})

//recupere tout les commentaires

router.get('/postcomments', function (req, res) {
    con.query(`SELECT * FROM commentaires_user `, (err, result) => {
        if (err) res.send(err)
        res.json(result)
    })
})


//-----------------------------------------------------ARTICLES--------------------------------------------------

//Affiche tout les articles
router.get('/articles', function (req, res) {
    try{
       con.query(`SELECT * FROM articles `,function (err, result) {
        if (err) throw (err)
        res.send(result)
    })  
    } catch (error){
        res.status(203).send(error)
    }
   
  })

  //--------------------NEWSLETTER

router.post('/ajoutadresse', function (req, res) {
    try {
        let newsletter = `INSERT INTO newsletter (Email) VALUES ('${req.body.Email}')`;
        con.query(newsletter, function (err, result) {
           
            if (err) res.status(203).send(err) 
            res.status(200).json('Email ajoute')
        })
    }catch (error) {
        res.status(203).send(error)
    }
})
  

// router.get('/users', function (req, res) {
//     try{
//         con.query('SELECT name, id FROM user', function (err, result) {
//             if (err) throw (err)
//             res.send(result)
//         })
//     } catch (error){
//         res.status(203).send(error)
//     }    
// })

module.exports = router