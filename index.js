const express = require('express');
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const csv = require('csvtojson');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.post('/results', urlencodedParser, (req, res) => {
  let date =  new Date();
  let user = (!req.body.user) ? "anonym" : req.body.user;
  let str = `${date.toLocaleDateString()}, ${user},${req.body.sum}, ${req.body.rozdil},${req.body.state}\n`;
    fs.appendFile(path.join(__dirname, 'data/pocty.csv'), str, function (err) {
    if (err) {
    console.error(err);
    return res.status(400).json({
    success: false,
    message: "Nastala chyba během ukládání souboru"
    });
    }
    });
    res.redirect(301, '/results');
    });
    
app.get("/results", (req, res) => {
    csv().fromFile(path.join(__dirname,'data/pocty.csv')).then(data => {
    console.log(data);
   res.render('results.pug', {'users':data,'nadpis': 'Předchozí výpočty'});
    })
     .catch(err => {
    console.log(err);
    res.render('error.pug', {nadpis: "Nastala chyba v aplikaci", chyba: err});
    });
    });
    
app.listen(4000, () => {
console.log('Server naslouchá na portu 4000');
});

