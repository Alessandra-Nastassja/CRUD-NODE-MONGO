/**
 * Arquivo: server.js
 * Descrição:
 * Author: Alessandra Nastassja
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//MLab
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = "mongodb://anastassja:anastassja123@ds027748.mlab.com:27748/node-mongo-crud-api";

mongoose.connect(uri,{
    useMongoClient:true,
});

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const router = express.Router();

router.use(function(req,res, next){
    console.log('Algo acontece aqui!');
    next();
});

app.use(express.static('public'));

app.use('/', router);
router.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});

//Produto
router.get('/produto/new', function(req, res){
    res.sendFile(__dirname + "/public/cadastrarProduto.html");
});

const produtoModel = require('./src/produto/produto.model');
produtoModel(app)

// router.get('/produto/todosProdutos', function(req, res){
//     res.sendFile(__dirname + "/public/todosProdutos.html");
// });

const port = process.env.port || 8000;

app.listen(port);
console.log('server na port ' + port);