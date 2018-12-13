/**
 * Arquivo: server.js
 * Descrição:
 * Author: Alessandra Nastassja
 * Data de criação: 10/12
 */

// Configurar o setup
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Produto = require('./app/models/produto');
const app = express();

mongoose.Promise = global.Promise;

//URL: MLab
mongoose.connect('mongodb://anastassja:anastassja123@ds027748.mlab.com:27748/node-mongo-crud-api',{
    useMongoClient:true
});

//Maneira Local: Mongodb
// mongoose.connect('mongodb://localhost:27017/node-mongo-crud-api', {
//     useMongoClient:true
// });

//Configuração da variável app para usar o 'body-parser'
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

//Definindo uma port aonde será executada a nossa api
const port = process.env.port || 8000;

//Rotas da nossa API
//-------------------------------------------------------------------------------------------------------------

//Criado a constante das rotas via Express
const router = express.Router();

router.use(function(req,res, next){
    console.log('Algo acontece aqui!');
    next();
});

//Rota de exemplo
router.get('/', function(req, res){
    res.json({message: 'Ok'})
});

//API
//-------------------------------------------------------------------------------------------------------------
router.route('/produtos')

//MÉTODO POST - Criar produto (Acessar em http://localhost:8000/api/produtos)

.post(function(req, res){
    const produto = new Produto();

    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function(error){
        if(error)
            res.send('Error ao tentar salvar o produto:' + error);
        
        res.json({ message: 'Produto cadastrado com sucesso' });
    });
})

//MÉTODO GET - Seleciona todos os produtos (Acessar em http://localhos:8000/api/produtos)

.get(function(req, res){
    Produto.find(function(error, produtos){
        if(error)
            res.send('Error ao tentar selecionar os produtos:' + error);

        res.json(produtos);
    });

});

//MÉTODO GET, PUT, DELETE - Seleciona, atualiza, exclui por ID (Acessar em http://localhost:8000/api/produto/:produto_id)
router.route('/produtos/:produto_id')

// MÉTODO GET - Seleciona por ID
.get(function(req,res){
    Produto.findById(req.params.produto_id, function(error, produto){
        if(error)
            res.send('Error ao tentar selecionar um produto por id: ' + error);
    
    res.json(produto);;
    });
})

//MÉTODO PUT - Atualizar por ID

.put(function(req, res){

    //PRIMEIRA COISA À FAZER
    Produto.findById(req.params.produto_id, function(error, produto){
        if(error)
            res.send('Error ao tentar selecionar um produto por id: ' + error);
        
    //SEGUNDO COISA À FAZER
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;
        
    //TERCEIRA COISA À FAZER
        produto.save(function(error){
            if(error)
                res.send('Error ao tentar atualizar o produto: ' + error);
        
        res.json({message: 'Produto atualizado com sucesso'});
        })

    });      
})

//MÉTODO DELETE - Deletar por ID

.delete(function(req, res){
    Produto.remove({
        _id: req.params.produto_id 
    }, function(error){
        if(error)
            res.send('Error ao tentar deletar um produto por id' + error);
        res.json({message: 'Produto deletado com sucesso'});
    });
});

//Definindo um padrão das rotas prefixadas: '/api'
app.use('/api', router);

//Iniciando o servidor/aplicação
app.listen(port);
console.log('server na port ' + port);