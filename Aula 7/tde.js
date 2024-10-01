let perguntas = [
    {
        id: "verificar-sintomas",
        textoPergunta: "Você está sentindo algum sintoma?",
        opcoes: [
            {
                resposta: "Sim",
                redirecionaPara: "sintomas-comuns"
            },
            {
                resposta: "Não",
                mensagem: "Procure um médico para avaliação."
            },
            {
                resposta: "Não sei",
                redirecionaPara: "sabe-descrever-sintomas"
            }
        ]
    },
    {
        id: "sabe-descrever-sintomas",
        textoPergunta: "Você sabe descrever quais sintomas está sentindo?",
        opcoes: [
            {
                resposta: "Sim",
                redirecionaPara: "sintomas-comuns"
            },
            {
                resposta: "Não",
                mensagem: "É importante que você consiga descrever seus sintomas para um profissional."
            }
        ]
    },
    {
        id: "sintomas-comuns",
        textoPergunta: "Quais sintomas você está sentindo?",
        opcoes: [
            {
                resposta: "Dor de cabeça",
                redirecionaPara: "verificar-dor-cabeca",
                diagnostico: "Dor de cabeça"
            },
            {
                resposta: "Febre",
                redirecionaPara: "verificar-febre",
                diagnostico: "Febre"
            },
            {
                resposta: "Tosse",
                redirecionaPara: "verificar-tosse",
                diagnostico: "Tosse"
            }
        ]
    },
    {
        id: "verificar-dor-cabeca",
        textoPergunta: "A dor de cabeça é intensa?",
        opcoes: [
            {
                resposta: "Sim",
                redirecionaPara: "sintomas-associados",
                diagnostico: "Dor de cabeça intensa"
            },
            {
                resposta: "Não",
                redirecionaPara: "sintomas-associados"
            },
            {
                resposta: "Não sei",
                redirecionaPara: "ajuda-profissional"
            }
        ]
    },
    {
        id: "verificar-febre",
        textoPergunta: "Você está medindo a temperatura e está acima de 38°C?",
        opcoes: [
            {
                resposta: "Sim",
                redirecionaPara: "sintomas-associados",
                diagnostico: "Febre alta"
            },
            {
                resposta: "Não",
                redirecionaPara: "sintomas-associados"
            },
            {
                resposta: "Não sei",
                redirecionaPara: "ajuda-profissional"
            }
        ]
    },
    {
        id: "verificar-tosse",
        textoPergunta: "A tosse é seca ou produtiva?",
        opcoes: [
            {
                resposta: "Seca",
                redirecionaPara: "sintomas-associados",
                diagnostico: "Tosse seca"
            },
            {
                resposta: "Produtiva",
                redirecionaPara: "sintomas-associados",
                diagnostico: "Tosse produtiva"
            },
            {
                resposta: "Não sei",
                redirecionaPara: "ajuda-profissional"
            }
        ]
    },
    {
        id: "sintomas-associados",
        textoPergunta: "Você está sentindo mais algum dos seguintes sintomas: falta de ar, dor no peito, ou fadiga?",
        opcoes: [
            {
                resposta: "Sim",
                redirecionaPara: "ajuda-imediata",
                diagnostico: "Sintomas associados preocupantes"
            },
            {
                resposta: "Não",
                redirecionaPara: "ajuda-profissional"
            },
            {
                resposta: "Não sei",
                redirecionaPara: "ajuda-profissional"
            }
        ]
    },
    {
        id: "ajuda-imediata",
        textoPergunta: "Recomendamos que você procure atendimento médico imediatamente.",
        opcoes: [
            {
                resposta: "Ok",
                mensagem: "Procure um pronto-socorro ou um médico."
            }
        ]
    },
    {
        id: "ajuda-profissional",
        textoPergunta: "É importante consultar um profissional de saúde para uma avaliação adequada.",
        opcoes: [
            {
                resposta: "Ok",
                mensagem: "Procure um médico para discutir seus sintomas."
            }
        ]
    }
];

let diagnostico = [];
const readline = require('readline');
const respostaInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        respostaInterface.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

Object.prototype.hasOwnProperty = function (property) {
    return this[property] !== undefined;
};

async function processNode(node) {
    let opcoesTexto = "\n";
    for (let index = 0; index < node.opcoes.length; index++) {
        opcoesTexto += index + " - " + node.opcoes[index].resposta + "\n";
    }
    let respostaEscolhida = await fazPergunta(node.textoPergunta + opcoesTexto);
    if (node.opcoes[respostaEscolhida].hasOwnProperty('diagnostico')) {
        diagnostico.push(node.opcoes[respostaEscolhida].diagnostico);
    }
    if (node.opcoes[respostaEscolhida].hasOwnProperty('redirecionaPara')) {
        let identificador = node.opcoes[respostaEscolhida].redirecionaPara;
        let otherNode = perguntas.find(item => item.id === identificador);
        return await processNode(otherNode);
    }
    if (node.opcoes[respostaEscolhida].hasOwnProperty('mensagem')) {
        console.log(node.opcoes[respostaEscolhida].mensagem);
        return false; // encerra
    }
}

async function iniciarPerguntas(perguntas) {
    await processNode(perguntas[0]);
    respostaInterface.close();
    if (diagnostico.length > 0) {
        console.log("Problemas identificados:");
        diagnostico.forEach(item => console.log(item + "\n"));
    } else {
        console.log("Nenhum problema foi identificado.");
    }
}

iniciarPerguntas(perguntas);