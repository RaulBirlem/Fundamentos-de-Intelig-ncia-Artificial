

//3 entradas=3pesos

//bias- valor auxiliar
//peso com valor único
//entrada a mais com valor fixo



const treinamento = [
    {entrada:[0,0,0], resultadoEsperado: [0]}, //Laranja - Citrico
    { entrada:[0,0,1],resultadoEsperado:[0]},//Abacaxi - Citrico
    { entrada:[0,1,0],resultadoEsperado: [0]},//Morango - Citrico
    { entrada:[0,1,1],resultadoEsperado: [0]},//Kiwi - Citrico
    { entrada:[1,0,0],resultadoEsperado: [1]},// Mamão - Doce
    { entrada:[1,0,1],resultadoEsperado: [1]},// Mamão - Doce
    { entrada:[1,1,0],resultadoEsperado: [1]},// Mamão - Doce
    { entrada:[1,1,1],resultadoEsperado: [1]}// Mamão - Doce
]


class Neuronio {
    
    constructor(numeroEntradas) {
        this.numeroEntradas = numeroEntradas;
        this.pesos = [];    

        for (let i = 0; i < numeroEntradas; i++) {
            this.pesos.push(Math.random());
        }
        this.bias = Math.random();
        this.taxaAprendizagem = 0.1;
//precisão para ajustar valores até chegar ao valor esperado
    }

    somar(entrada){
        let somaPonderada = this.bias;
        for (let i = 0; i < this.numeroEntradas; i++) {
            somaPonderada += entrada[i] * this.pesos[i];
        }
        return somaPonderada;//0 / 1
    }

    ativacao(valor) {
        return valor < 0 ? 0 : 1;
    }
//  a função somar combina os valores de entrada 
//  com os pesos e o bias, enquanto a função ativacao
//  aplica uma função de ativação ao resultado da soma 
//  ponderada para produzir a saída do neurônio.


    processar(entrada) {
        let resultadoSoma = this.somar(entrada);
        this.saida = this.ativacao(resultadoSoma);
    }

    ajustar(erro, entrada) {
        for (let i = 0; i < this.numeroEntradas; i++) {
            this.pesos[i] += erro * entrada[i] * this.taxaAprendizagem;
        }
    }

    treinarRede(arrayTreinamento) {
        let ajustesNecessarios = true;

        while(ajustesNecessarios) {
            ajustesNecessarios = false;


            for (let i = 0; i < arrayTreinamento.length; i++) {
                //percorre entradas

                const entrada = arrayTreinamento[i].entrada;

                const resultadoEsperado = arrayTreinamento[i].resultadoEsperado;

                const resultadoObtido = this.processar(entrada);
                //saida
                const erro = resultadoEsperado - resultadoObtido;
                //taxa de erro
                
                if(erro !== 0){
                    ajustesNecessarios = true;
                    this.ajustar(erro, entrada)
                }
            }
        }
    }
}

