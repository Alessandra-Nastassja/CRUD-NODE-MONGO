/**
 * Arquivo: produto.model.js
 * Descrição: é responsável por gerenciar os dados e seus comportamentos.
 * Autor: Alessandra Nastassja
 */

const server = require('../../server')
module.exports = function (app) {
    const Produto = require('./produto.controller')

    //MÉTODO POST - Criar produto
    app.post('/produto/new', (req, res) => {
        const produto = new Produto();

        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save()
            .then(item => {
                res.send("Produto salvo com sucesso");
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    })
    //MÉTODO GET - Seleciona todos os produtos
    app.get('/produto/todosProdutos', function (req, res) {
        Produto.find(function (error, produtos) {
            if (error)
                res.send('Error ao tentar selecionar os produtos:' + error);

            res.json(produtos);

        });
    })
    // MÉTODO GET - Seleciona por ID
    app.get('/produto/:produto_id', function (req, res) {
        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.send('Error ao tentar selecionar um produto por id: ' + error);

            res.json(produto);
        });
    });
    //MÉTODO PUT - Atualizar por ID
    app.put('/produto/:produto_id', function (req, res) {

        Produto.findById(req.params.produto_id, function (error, produto) {
            if (error)
                res.send('Error ao tentar selecionar um produto por id: ' + error);

            produto.nome = req.body.nome;
            produto.preco = req.body.preco;
            produto.descricao = req.body.descricao;

            produto.save(function (error) {
                if (error)
                    res.send('Error ao tentar atualizar o produto: ' + error);

                res.json({ message: 'Produto atualizado com sucesso' });
            })

        });
    })
    //MÉTODO DELETE - Deletar por ID
    app.delete('/produto/:produto_id', function (req, res) {
        Produto.remove({
            _id: req.params.produto_id
        }, function (error) {
            if (error)
                res.send('Error ao tentar deletar um produto por id' + error);
            res.json({ message: 'Produto deletado com sucesso' });
        });
    });
}