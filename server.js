const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); //cteni ze souboru a ukladani
//sablonovaci system
const path = require('path');
const app = express(); //konstruktor web aplikace pomoci express
const port = 3000;
const csv = require('csvtojson');
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'pug'); //set the template engine as pug
app.set('views' , path.join(__dirname , 'views'));

/*nastavuje adresu web stranky */
app.use(express.static('public')); 


/*nastaveni endpointu, na kterem server provede odpoved a posle klientovi */
/*http://localhost:3000/secret?user=1&password=2 */


app.post('/save', urlencodedParser, (req, res) => {
    let user = req.body.user;
    let celkem = req.body.celkem;
    let rozdil = req.body.rozdil;
    let state = req.body.state;


    let date = new Date();
    let str = ` ${user},${celkem}, ${rozdil},${state}, ${date.toLocaleDateString()}, ${date.toLocaleTimeString()}\n`;
   fs.appendFile('./data/result.csv',str, function(err) {
if (err) {
    console.error('err');
  return res.status(400).json({
success: false,
message: 'Byla zjistena chyba pri zapisu do souboru'

  });
   }
}); 
    res.redirect(301, '/results'); //presmeruje zpet na puvodni stranku
});

app.get('/results',(req,res) => {
csv().fromFile('./data/result.csv').then((data) => {
console.log(data);
// res.send(data);
res.render('results.pug',{'players':data,'nadpis': 'Vysledky hracu'});
})
    .catch(err => {  //kdyz nastane chyba 
console.log(err);
    });

});


/*spusteni web serveru, ktery nasloucha na portu 3000 */
app.listen(port, () => {
    console.log(`Server funguje na portu ${port}`);
});


// get -  skrz url adresu , nez posilani dat radsi
//WriteFileSync - nejprve se zapise a pote se pokracuje dal 
//csv - Comma-separated values , text soubor rozdelen carkou