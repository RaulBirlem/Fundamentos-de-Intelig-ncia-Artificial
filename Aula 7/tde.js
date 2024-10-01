let perguntas = [
    {
        identificador: "verificar-sintomas",
        pergunta: "Você está sentindo algum sintoma?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "sintomas-comuns"
            },
            {
                respostaPossivel: "Não",
                resposta: "Procure um médico para avaliação."
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "sabe-descrever-sintomas"
            }
        ]
    },
    {
        identificador: "sabe-descrever-sintomas",
        pergunta: "Você sabe descrever quais sintomas está sentindo?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "sintomas-comuns"
            },
            {
                respostaPossivel: "Não",
                resposta: "É importante que você consiga descrever seus sintomas para um profissional."
            }
        ]
    },
    {
        identificador: "sintomas-comuns",
        pergunta: "Quais sintomas você está sentindo?",
        respostas: [
            {
                respostaPossivel: "Dor de cabeça",
                redireciona: "verificar-dor-cabeca",
                diagnostico: "Dor de cabeça"
            },
            {
                respostaPossivel: "Febre",
                redireciona: "verificar-febre",
                diagnostico: "Febre"
            },
            {
                respostaPossivel: "Tosse",
                redireciona: "verificar-tosse",
                diagnostico: "Tosse"
            }
        ]
    },
    {
        identificador: "verificar-dor-cabeca",
        pergunta: "A dor de cabeça é intensa?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "sintomas-associados",
                diagnostico: "Dor de cabeça intensa"
            },
            {
                respostaPossivel: "Não",
                redireciona: "sintomas-associados"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "ajuda-profissional"
            }
        ]
    },
    {
        identificador: "verificar-febre",
        pergunta: "Você está medindo a temperatura e está acima de 38°C?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "sintomas-associados",
                diagnostico: "Febre alta"
            },
            {
                respostaPossivel: "Não",
                redireciona: "sintomas-associados"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "ajuda-profissional"
            }
        ]
    },
    {
        identificador: "verificar-tosse",
        pergunta: "A tosse é seca ou produtiva?",
        respostas: [
            {
                respostaPossivel: "Seca",
                redireciona: "sintomas-associados",
                diagnostico: "Tosse seca"
            },
            {
                respostaPossivel: "Produtiva",
                redireciona: "sintomas-associados",
                diagnostico: "Tosse produtiva"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "ajuda-profissional"
            }
        ]
    },
    {
        identificador: "sintomas-associados",
        pergunta: "Você está sentindo mais algum dos seguintes sintomas: falta de ar, dor no peito, ou fadiga?",
        respostas: [
            {
                respostaPossivel: "Sim",
                redireciona: "ajuda-imediata",
                diagnostico: "Sintomas associados preocupantes"
            },
            {
                respostaPossivel: "Não",
                redireciona: "ajuda-profissional"
            },
            {
                respostaPossivel: "Não sei",
                redireciona: "ajuda-profissional"
            }
        ]
    },
    {
        identificador: "ajuda-imediata",
        pergunta: "Recomendamos que você procure atendimento médico imediatamente.",
        respostas: [
            {
                respostaPossivel: "Ok",
                resposta: "Procure um pronto-socorro ou um médico."
            }
        ]
    },
    {
        identificador: "ajuda-profissional",
        pergunta: "É importante consultar um profissional de saúde para uma avaliação adequada.",
        respostas: [
            {
                respostaPossivel: "Ok",
                resposta: "Procure um médico para discutir seus sintomas."
            }
        ]
    }
];

diagnostico = [];
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
    let opcoes = "\n";
    for (let index = 0; index < node.respostas.length; index++) {
        opcoes += index + " - " + node.respostas[index].respostaPossivel + "\n";
    }
    let respostaEscolhida = await fazPergunta(node.pergunta + opcoes);
    if (node.respostas[respostaEscolhida].hasOwnProperty('diagnostico')) {
        diagnostico.push(node.respostas[respostaEscolhida].diagnostico);
    }
    if (node.respostas[respostaEscolhida].hasOwnProperty('redireciona')) {
        let identificador = node.respostas[respostaEscolhida].redireciona;
        if (identificador === 'fim') {
            return false;
        }
        var otherNode = perguntas.find(item => item.identificador == identificador);
        return await processNode(otherNode);
    }
    if (node.respostas[respostaEscolhida].hasOwnProperty('resposta')) {
        console.log(node.respostas[respostaEscolhida].resposta);
        return false;
    }
}

async function iniciarPerguntas(perguntas) {
    resposta = await processNode(perguntas[0]);
    respostaInterface.close();
    if (diagnostico.length > 0) {
        console.log("Problemas identificados:");
        for (let index = 0; index < diagnostico.length; index++) {
            console.log(diagnostico[index] + "\n");
        }
    } else {
        console.log("Nenhum problema foi identificado.");
    }
}

iniciarPerguntas(perguntas);
