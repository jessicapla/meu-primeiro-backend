const express = require("express") //inicia o express
const router = express.Router() //configura a primeira parte da rota
const cors = require("cors") //traz o pacote cors que permite consumir esta api no front-end

const conectaBancoDeDados = require("./bancoDeDados") //
conectaBancoDeDados() //função que conecta o banco de dados

const Mulher = require("./mulherModel") //chama o modelo de objeto Mulher

const porta = 3333 //determina a porta
const app = express() //inicia o app express
app.use(express.json()) //determina o body em json
app.use(cors())

//mostra a porta e mensagem de servidor rodando
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch(erro) {
        console.log (erro)
    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({

        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request,response) {
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome
        }
    
        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem
        }
    
        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio
        }

        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

        response.json(mulherAtualizadaNoBancoDeDados)   

    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request,response) {
    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso!"})
    } catch(erro) {
        console.log(erro)
    }
}

app.use(router.get("/mulheres", mostraMulheres)) //configura segunda parte da rota
app.use(router.post("/mulheres", criaMulher)) //configura a rota do post
app.use(router.patch("/mulheres/:id", corrigeMulher)) //configura a rota do patch
app.use(router.delete("/mulheres/:id", deletaMulher)) //configura a rota do delete
app.listen(porta, mostraPorta) //faz o servidor escutar a porta