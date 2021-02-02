const express = require('express');
const app = express();
const con = require ('../Back_end/Database/DB')
const routerAdmin = require('./Routes/Admin_connect');
const routerUser = require('./Routes/User')
const cors = require('cors');
const port = 4000;
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/admin', routerAdmin);
app.use('/user', routerUser);


app.listen(port, () => {
  console.log('Vous êtes connecté au serveur !');
})