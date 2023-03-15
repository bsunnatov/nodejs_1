const express = require('express')
const fs = require('fs');
const dotenv = require('dotenv');
const multer = require("multer");
const { generateAccessToken, authenticateToken } = require('./services/jwt.service');
dotenv.config();
const app = express()
var cors = require('cors')
app.use(express.json())
app.use(cors())
// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
// определяем Router
//Routers
const personRouter = require('./routers/persons')
app.use('/persons', authenticateToken, personRouter)
app.use(express.static(__dirname));
app.use(multer({ dest: "uploads" }).single("filedata"));
app.post("/upload", function (req, res, next) {

    let filedata = req.file;
    console.log(filedata);
    if (!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.post('/auth', function (req, res) {
    const users_string = fs.readFileSync('users.json', 'utf-8');
    const users = [...JSON.parse(users_string)];
    const { email, password } = req.body;
    //bazadan login va parol mos keluvchi userni  qidirish
    const user = users.find(a => a.email == email && a.password == password);
    if (user) {
        const token = generateAccessToken(user.id);
        console.log(token)
        res.status(200);
        res.json(token);
    }
    else {
        res.status(400);
        res.send('User not found')
    }


})
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/ui/index.html")
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Dastur ${port} da ishga tushdi...`)
})