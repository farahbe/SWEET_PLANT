const con = require('../Database/DB');
const express = require('express');
const router = express.Router();
const saltRounds = 10;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../Middleware')

//------------------------------------------------COMPTE-----------------------------------

// Creation de compte pour le user
router.use("/sign-up", middleware.emailMiddleware)

router.post('/sign-up', (req, res) => {
    try {
        console.log(req.body);
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            console.log(hash);
            let Newadmin = `INSERT INTO administrateur (Email, Password) VALUES ('${req.body.email}','${hash}')`;
            con.query(`SELECT * FROM administrateur WHERE Email = '${req.body.email}'`, function (err, result) {
                if (result.length) {
                    res.status(400).json("Cette email existe deja");
                } else {
                    con.query(Newadmin, function (error, resultat) {
                        res.status(200).json('Valide')
                    })
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
})


// Connexion pour l'admin

router.post('/sign-in', function (req, res) {
    try {
        console.log('je rentre dans signin');
        con.query(`SELECT*FROM administrateur WHERE Email = '${req.body.email}'`, function (err, result) {
            if (result.length) {
                console.log(result[0].password);
                //Hash le password
                bcrypt.compare(req.body.password, result[0].password, function (err, resultat) {
                    console.log(resultat)
                    //creer un token
                    let token = jwt.sign({
                        id: result[0].id_admin,
                        email: result[0].email,
                        admin: true
                    }, "secret");
                    if (resultat == true) {
                        res.status(200).json({
                            msg: 'Valide',
                            auth: true,
                            token: token
                        });
                    } else {
                        res.status(203).json('Desoler le mot de passe est incorrect!')
                    }
                })
            } else {
                res.status(203).json('Desoler utilisateur introuvable')
            }
        })
    } catch (error) {
        console.log(error);
    }
})

//-----------------------------------------------------------ARTICLE----------------------------------------------

//Creer un article
router.use("/articles", middleware.tokenadmin)

router.post('/articles', function (req, res) {
    try {
        let addarticle = `INSERT INTO articles (titre,paragraphe,image,date_de_publication,id_admin,aime) VALUES ('${req.body.titre}','${req.body.paragraphe}','${req.body.image}','${req.body.date_de_publication}','${req.body.id_admin}','${req.body.aime}')`;
        con.query(addarticle, function (err, result) {
            res.status(200).json('articles ajoute')
        })
    } catch (error) {
        console.log(error);
    }
})

// Modifier un article
router.use("/articles/:id_article", middleware.tokenadmin)

router.put('/articles/:id_article', function (req, res) {
    try {

        let change_articles = `UPDATE articles SET titre = '${req.body.titre}', paragraphe = '${req.body.paragraphe}', 
        image = '${req.body.image}', date_de_publication = '${req.body.date_de_publication}' WHERE id_article = '${req.params.id_article}'`;

        con.query(change_articles, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).send(result)
        })
    } catch (error) {
        res.status(400);

    }

})

// Supprimer un article
router.use("/articles/:id_article", middleware.tokenadmin)

router.delete('/articles/:id_article', function (req, res) {
    try {
        con.query("DELETE FROM articles WHERE id_article = ?", [req.params.id_article], function (err, result) {
            if (err) throw err
            res.send(result)
        })
    } catch (error) {
        res.status(203).send(error)
    }

})

//_Recuperer toutes les articles posté par un user
router.get('/get_articles/:id', function (req, res) {
    try {

        let idarticle = req.params.id
        let articleadmin = `SELECT administrateur.email, articles.Titre, articles.paragraphe, articles.image, articles.Date_de_publication FROM administrateur INNER JOIN articles on administrateur.id_admin = articles.id_admin WHERE articles.id_admin = '${idarticle}'`
        con.query(articleadmin, function (err, results) {
            if (err) res.status(203).send(err)
            res.send(results)
        })
    } catch (error) {
        res.status(203).send(error)
    }
})

router.get('/getarticles', function (req, res) {
    con.query('SELECT * FROM articles', function (err, results){
        if (err) res.status(203).send(err)
        res.send(results)
    })

})



//-----------------------------------CATEGORIE----------------------------------

//poster les categories
router.post('/categorie', function (req, res) {
    try {
        let addcategorie = `INSERT INTO categorie (id_nom_categorie,Nom_categorie,Date_de_creation) VALUES ('${req.params.id_nom_categorie}','${req.body.Nom_categorie}','${req.params.Date_de_creation}')`;
        con.query(addcategorie, function (err, result) {
            res.status(200).json('categorie ajoute')
        })
    } catch (error) {
        console.log(error);
    }
})

router.get('/categorie', function (req, res) {
    con.query(`SELECT * FROM categorie`, (err, result) => {
        if (err) res.send(err)
        res.json(result)
    })
})

   
 

module.exports = router