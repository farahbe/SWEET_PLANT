const mysql = require('mysql2');

 
// create the connection to database
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'my_sweet_plant',
  port: 3308
});


con.connect(error => {
    if (error) throw error;
    console.log('Bienvenue dans votre Database !');
})


              con.query(`CREATE TABLE IF NOT EXISTS categorie
              (id_nom_categorie INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
              Nom_categorie VARCHAR(250) NOT NULL, 
              Date_de_creation DATE NOT NULL)`);

                con.query(`CREATE TABLE IF NOT EXISTS articles
                (id_article INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                 Titre VARCHAR(250) NOT NULL, 
                 paragraphe MEDIUMTEXT NOT NULL,
                 image TEXT(500) NOT NULL, 
                 Date_de_publication DATE NOT NULL,
                 id_admin INT,
                 id_categorie VARCHAR(250) NOT NULL,
                 Aime VARCHAR(250) NOT NULL,
                 FOREIGN KEY (id_admin) REFERENCES admin(id_admin),
                 FOREIGN KEY (id_categorie) REFERENCES categorie(id_nom_categorie))`);


                 con.query(`CREATE TABLE IF NOT EXISTS administrateur
                 (id_admin INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                 Email VARCHAR(250) NOT NULL, 
                 Password VARCHAR(250) NOT NULL)`);



                con.query(`CREATE TABLE IF NOT EXISTS commentaires_user
                (id_commentaire_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                 Pseudo VARCHAR(250) NOT NULL, 
                 Commentaire VARCHAR(500
                  ) NOT NULL,
                 Avatar BLOB NOT NULL, 
                 Date_de_commentaire DATE NOT NULL,
                 id_article INT,
                 FOREIGN KEY (id_article) REFERENCES article(id_article),
                 id_user INT,
                 FOREIGN KEY (id_user) REFERENCES user(id_user))`);

                 con.query(`CREATE TABLE IF NOT EXISTS user
                (id_user INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                 pseudo VARCHAR(250) NOT NULL, 
                 prenom VARCHAR(250) NOT NULL, 
                Email VARCHAR (250) NOT NULL,
                Password VARCHAR (250) NOT NULL,
                 Date_de_naissance DATE NOT NULL,
                 Avatar BLOB NOT NULL, 
                inscrit_a_la_newsletter BOOLEAN NOT NULL)`);
                
                con.query(`CREATE TABLE IF NOT EXISTS newsletter
                (id_newsletter INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                Email VARCHAR (250) NOT NULL,
                id_user INT,
                FOREIGN KEY (id_user) REFERENCES user(id_user))`);
               
               
               
                                   
module.exports = con;