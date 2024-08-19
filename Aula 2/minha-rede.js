


let x11 = 0, x12 = 0, resultado1 = 0
let x21 = 0, x22 = 1, resultado2 = 0
let x31 = 1, x32 = 0, resultado3 = 1
let x41 = 1, x42 = 1, resultado4 = 1

let p1 = -1, p2 = -1

let soma, ajustes, quantidadeAjustesTotais = 0, repeticoes = 0

do {
    ajustes = 0
    verificaSeNecessitaAjustar(x11,x12,resultado1)
    verificaSeNecessitaAjustar(x21,x22,resultado2)
    verificaSeNecessitaAjustar(x31,x32,resultado3)
    verificaSeNecessitaAjustar(x41,x42,resultado4)

} while (ajustes != 0);

console.log("Teste de aprendizagem com rede neural \n");
console.log("\nPeso 1 = " + p1);
console.log("\nPeso 2 = " + p2);
console.log("\nForam necessarios "+ quantidadeAjustesTotais + " ajustes para treinar a rede.");

function somar (x1, x2) {
    return (x1 * p1) + (x2 * p2)
}


function transferencia(soma) {

    //função rampa 
    if (soma < 0){
        return 0
    }
    if (soma >1) {
        return 1
    }
    return soma

}


function ajustar(entrada1, entrada2, resultadoEsperado, resultadoObtido) {
    
    p1 = p1 + 1 * (resultadoEsperado - resultadoObtido) * entrada1
    p2 = p2 + 1 * (resultadoEsperado - resultadoObtido) * entrada2
    //combina os valores para poder ajustar
}





function verificaSeNecessitaAjustar(x1,x2, resultadoEsperado){
    soma = somar(x1,x2)
    resultadoObtido = transferencia(soma)
    if(y != resultadoEsperado){
        verificaSeNecessitaAjustar(x1,x2, resultadoEsperado, resultadoObtido)
        ajustes++
        quantidadeAjustesTotais++
    }
}