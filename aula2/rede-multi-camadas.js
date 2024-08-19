

class Entrada {
    valorEntrada = 0;
    peso = 0;
    
}



//entradas

const entradas_pesos = [
    {entrada: -1, peso: 0},
    {entrada: 1, peso:-1},
    {entrada: 1, peso:2}
];


let p1=-1, p2=-1, p3=-1

//0- citrico 1 - doce
const treinamento = [
    [0,0,0,0], //Laranja - Citrico
    [0,0,1,0],//Abacaxi - Citrico
    [0,1,0,0],//Morango - Citrico
    [0,1,1,0],//Kiwi - Citrico
    [1,0,0,1],// Mamão - Doce
    [1,0,1,1],// Mamão - Doce
    [1,1,0,1],// Mamão - Doce
    [1,1,1,1]// Mamão - Doce
]

//cada 0 e 1 é uma entrada


//escolha a funcao(LR,FR,FS)
let funcaoEscolhida = 'FS'

let y = 0;

switch (funcaoEscolhida) {
    case 'LR':
        y = limiteRapido(soma(entradas_pesos))
        console.log("Saída "+ y + ", Função utilizada: "+funcaoEscolhida)
        break;

        case 'FR':
        y = funcaoRampa(soma(entradas_pesos))
        console.log("Saída: "+ y + ", Função utilizada: " + funcaoEscolhida)
        break;
        case 'FS':
            y = funcaoSigmoide(soma(entradas_pesos))
            console.log("Saída: "+ y + ", Função utilizada: " + funcaoEscolhida)
        break;

    default:
        console.log("A operação não e válida.")
        break;
}


function soma(entradas_pesos){
    var soma = 0;
    for (let i = 0; i < entradas_pesos.length; i++) {
        soma = soma + (entradas_pesos[i].entrada * entradas_pesos[i].peso)
    }
    //soma todas as entradas e pesos

    console.log("Soma: "+ soma );
    return soma
}

function limiteRapido(soma){
    
    return soma <= 0 ? -1 : 1

}



function funcaoRampa(soma){
    if (soma < 0){
        return 0
    }else  if (soma >= 0 && soma <=1){
        return soma;
    }else {
        return 1
    }
}


function funcaoSigmoide(soma){
    if (soma >= 0){
        return 1 - 1 / (1+soma)
    }else {
        return -1 + 1 / (1 - soma)
    }
}