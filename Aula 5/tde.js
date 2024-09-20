const readline = require('readline');

// Estrutura de dados das perguntas e respostas
const perguntas = [
    {
        pergunta: "É Homem?",
        subElemento: {
            sim: {
                pergunta: "Ele joga futebol?",
                subElemento: {
                    sim: "Neymar",
                    nao: "Ayrton Senna"
                }
            },
            nao: {
                pergunta: "Ele é um personagem animado?",
                subElemento: {
                    sim: "Dragon Ball",
                    nao: "Outros"
                }
            }
        }
    },
    {
        pergunta: "É Mulher?",
        subElemento: {
            sim: {
                pergunta: "Ela é modelo?",
                subElemento: {
                    sim: "Gisele Bündchen",
                    nao: "Margot Robbie"
                }
            },
            nao: {
                pergunta: "Ele é um super-herói?",
                subElemento: {
                    sim: "Superman",
                    nao: "Outros"
                }
            }
        }
    },
    {
        pergunta: "É Personagem animado?",
        subElemento: {
            sim: {
                pergunta: "Ele é do Dragon Ball?",
                subElemento: {
                    sim: "Goku",
                    nao: "Naruto"
                }
            },
            nao: {
                pergunta: "Ele é um personagem de filme?",
                subElemento: {
                    sim: "Indiana Jones",
                    nao: "Outros"
                }
            }
        }
    },
    {
        pergunta: "É um animal?",
        subElemento: {
            sim: {
                pergunta: "Ele é o melhor amigo do homem?",
                subElemento: {
                    sim: "Cachorro",
                    nao: "Vaca"
                }
            },
            nao: {
                pergunta: "É um objeto?",
                subElemento: {
                    sim: "Carro",
                    nao: "Outros"
                }
            }
        }
    }
];

// Lista de respostas possíveis
const arrayDeRespostasPossiveis = ["Neymar", "Ayrton Senna", "Gisele Bündchen", "Margot Robbie", "Goku", "Naruto", "Cachorro", "Vaca", "Dragon Ball", "Outros", "Superman", "Indiana Jones", "Carro"];

// Informa ao usuário para ele pensar em uma das opções válidas
console.log("Pense em uma das opções abaixo para eu tentar adivinhar:");
arrayDeRespostasPossiveis.forEach(resposta => {
    console.log(resposta);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function fazPergunta(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta.trim());
        });
    });
}

async function processarPergunta(perguntaAtual) {
    const resposta = await fazPergunta(`${perguntaAtual.pergunta} (1 para SIM, 2 para NÃO): `);
    
    if (resposta === '1') {
        const proximaPergunta = perguntaAtual.subElemento.sim;
        if (typeof proximaPergunta === 'string') {
            console.log(`Resposta: ${proximaPergunta}`);
            rl.close();
        } else {
            await processarPergunta(proximaPergunta);
        }
    } else if (resposta === '2') {
        const proximaPergunta = perguntaAtual.subElemento.nao;
        if (typeof proximaPergunta === 'string') {
            console.log(`Resposta: ${proximaPergunta}`);
            rl.close();
        } else {
            await processarPergunta(proximaPergunta);
        }
    } else {
        console.log("Resposta inválida. Tente novamente.");
        await processarPergunta(perguntaAtual);
    }
}

// inicia o processo de perguntas
async function iniciarPerguntas() {
    const perguntaInicial = perguntas[0];
    await processarPergunta(perguntaInicial);
}

iniciarPerguntas();
