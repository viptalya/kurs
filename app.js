const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(express.static('views'));
const jsonParser = bodyParser.json();
const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "courier",
  password: "005511052000xfC"
});
app.set("view engine", "hbs");

app.use(express.static('views'));
app.get("/meals", function(req, res){
  pool.query("SELECT * FROM eda", function(err, data) {
    if(err) return console.log(err);
    res.render("gh.hbs", {
        users: data
    });
  });
});


// возвращаем форму для добавления данных
app.get("/", function(req, res){
  res.render("curs.hbs");
})

// получаем отправленные данные и добавляем их в БД 
app.post("/create", urlencodedParser, function (req, res) {
         
    if(!req.body) return res.sendStatus(400);
    const surname = req.body.surname;
    const name = req.body.name;
    const patronymic = req.body.patronymic;
    const employment = req.body.employment;
    const phone = req.body.phone;
    const email = req.body.email;
    const seriespas = req.body.seriespas;
    const numberpas = req.body.numberpas;
    pool.query("INSERT INTO executor (surname, name, patronymic, employment, phone, email, seriespas, numberpas) VALUES (?,?,?,?,?,?,?,?)", [surname, name, patronymic, employment, phone, email, seriespas, numberpas], function(err, data) {
      if(err) return console.log(err);
      res.redirect("/");
    });
});
app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});
