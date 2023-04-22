const express = require("express") //inicia o express
const router = express.Router() //configura a primeira parte da rota
const { v4: uuidv4 } = require('uuid') //inicia o uuid

const porta = 3333 //determina a porta
const app = express() //inicia o app express
app.use(express.json()) //determina o body em json

//cria o objeto lista de mulheres
const listaMulheres = [
    {
        id: "1",
        nome: "Bel Pesce",
        img: "https://meiamolemeiadura.com",
        minibio: "Empreendedora, autora e engenheira de computação conhecida por seu trabalho com startups e educação tecnológica no Brasil."
    },
    {
        id: "2",
        nome: "Camila Achutti",
        img: "https://img.com",
        minibio: "Cientista da computação, educadora e defensora da diversidade e inclusão na tecnologia, especialmente para mulheres e pessoas com deficiência."
    },
    {
        id: "3",
        nome: "Marcela Lacerda",
        img: "https://images.com",
        minibio: "Co-fundadora da Olabi, um hub de tecnologia e inovação no Brasil focado na promoção de impacto social e diversidade na indústria de tecnologia."
    }
]

//mostra a porta e mensagem de servidor rodando
function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

//cria uma nova mulher
function criaMulher(request, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio
    }
    listaMulheres.push(novaMulher)
    response.json(listaMulheres)
}

//mostra a lista completa de mulheres
function mostraMulheres(request, response) {
    response.json(listaMulheres)
}

app.use(router.get("/mulheres", mostraMulheres)) //configura segunda parte da rota
app.use(router.post("/mulheres", criaMulher)) //configura o post
app.listen(porta, mostraPorta) //faz o servidor escutar a porta