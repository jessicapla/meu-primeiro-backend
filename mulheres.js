const express = require("express")
const router = express.Router()

const porta = 3333
const app = express()

const mulheres = [
    {
        nome: "Bel Pesce",
        img: "https://meiamolemeiadura.com",
        minibio: "Empreendedora, autora e engenheira de computação conhecida por seu trabalho com startups e educação tecnológica no Brasil."
    },
    {
        nome: "Camila Achutti",
        img: "https://img.com",
        minibio: "Cientista da computação, educadora e defensora da diversidade e inclusão na tecnologia, especialmente para mulheres e pessoas com deficiência."
    },
    {
        nome: "Marcela Lacerda",
        img: "https://images.com",
        minibio: "Co-fundadora da Olabi, um hub de tecnologia e inovação no Brasil focado na promoção de impacto social e diversidade na indústria de tecnologia."
    }
]

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

function mostraMulheres(request, response) {
    response.json(mulheres)
}

app.use(router.get("/mulheres", mostraMulheres))
app.listen(porta, mostraPorta)