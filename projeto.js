/* [M1S10] Mini-Projeto nº 1 - Produtos

Instruções do Exercício:

1 - Funcionalidades do CRUD:

A)Criar Produto:
Crie uma rota POST para adicionar um novo produto.
A rota deve receber um JSON com os dados do produto (por exemplo, nome, preço, descrição) para esta rota.
O servidor deve validar os dados recebidos e adicionar o produto a uma lista temporária.

B) Listar Produtos:
Crie uma rota GET para obter todos os produtos.
O servidor deve retornar a lista de produtos em formato JSON.

C) Atualizar Produto:
Crie uma rota PUT para atualizar um produto existente.
A rota deve receber um JSON com os dados atualizados do produto, incluindo o ID do produto a ser atualizado.
O servidor deve encontrar o produto na lista pelo ID e atualizar seus dados.

D) Excluir Produto:
Crie uma rota DELETE para excluir um produto existente.
A rota deve receber o ID do produto a ser excluído.
O servidor deve encontrar o produto na lista pelo ID e removê-lo.

2 - Testando com o Postman:
Monte uma coleção no Postman para realizar as operações CRUD.
As rotas devem enviar requisições para as rotas criadas, usando os métodos HTTP corretos (POST, GET, PUT, DELETE).

3 - Aplicando Middlewares:
Adicione Middlewares nas rotas para logar as informações de cada chamada realizada

4- Recursos Adicionais (opcional):
Você pode adicionar validação de entrada para garantir que os dados enviados para o servidor sejam válidos.
Também pode implementar um mecanismo de persistência simples, usando um array em memória para armazenar os produtos.
Os alunos podem experimentar com outros tipos de requisições, como PATCH para atualizações parciais ou OPTIONS para obter informações sobre as rotas disponíveis */

import express, { request } from 'express';

const app = express();

app.use(express.json());

const PORT = 3000;

let produtos = [];

app.listen(PORT, function(){
    console.log("Minha aplicação esta ligada")
});

// Middleware para fazer log das requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

app.post('/novoproduto', (request,response) => {
    const { nome, preço, descrição } = request.body;
    const produto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
        nome: nome, 
        preço: preço,
        descrição: descrição
    }
    produtos.push(produto);
    response.status(201).json({ mensagem: 'Novo produto adicionado com sucesso', dados: produto });   
})

app.get('/listarprodutos', (request,response) => {
    response.json(produtos);
})

 app.put('/novoproduto/:id', (request, response) => {
    const id = request.params.id; 
    const { nome, preço, descrição } = request.body;
    const index = produtos.findIndex(produto => produto.id === parseInt(id));

    if (index === -1) {
        response.status(404).send('Produto não encontrado.');
        return;
    }

    const produto = produtos[index]

    produto.nome = nome
    produto.preço = preço
    produto.descrição = descrição

    produtos[index] = produto;
    response.status(200).json({mensagem: 'Produto atualizado com sucesso.', dados: produto });
});

app.delete('/novoproduto/:id', (request,response) => {
    const { id } = request.params;
    const index = produtos.findIndex(produto => produto.id === parseInt(id));

    if (index === -1) {
        response.status(404).send('Produto não encontrado.');
        return;
    }
    produtos.splice(index, 1);
    response.status(200).send('Produto deletado com sucesso.');
});