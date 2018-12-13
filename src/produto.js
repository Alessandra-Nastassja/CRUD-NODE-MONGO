/**
 * Arquivo: Produto.js
 * Author: Alessandra Nastassja
 * Descrição: arquivo responsável onde tratarmos o modelo da classe 'Produto'
 * Data de criação: 10/12
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

/**
 * Produto
 *  ID: Int
 *  Nome: String
 *  Preco: Number
 *  Descrição: String
 */

const ProdutoSchema = new Schema({
    nome: String,
    preco: Number,
    descricao: String
});

module.exports = mongoose.model('Produto', ProdutoSchema);