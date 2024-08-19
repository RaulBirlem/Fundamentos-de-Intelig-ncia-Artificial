let x11 = 0, x12 = 0, resultado1 = 0
let x21 = 0, x22 = 1, resultado2 = 0
let x31 = 1, x32 = 0, resultado3 = 1
let x41 = 1, x42 = 1, resultado4 = 1

let p1 = -1, p2 = -1

let soma, ajustes, quantidadeAjustesTotais = 0, repeticoes = 0

do {
    ajustes = 0
    soma = somar(x11, x12)
    resultadoRecebido = transferencia(soma)

    if(resultadoRecebido != resultado1) {
//resultado1 = resultado esperado
        ajustar(x11, x12, resultado1, resultadoRecebido)
        ajustes++
        quantidadeAjustesTotais++
    }
    

    soma = somar(x21, x22)
    resultadoRecebido = transferencia(soma)

    if(resultadoRecebido != resultado2) {

        ajustar(x11, x12, resultado2, resultadoRecebido)
        ajustes++
        quantidadeAjustesTotais++
    }

    soma = somar(x31, x32)
    resultadoRecebido = transferencia(soma)

    if(resultadoRecebido != resultado3) {

        ajustar(x31, x32, resultado3, resultadoRecebido)
        ajustes++
        quantidadeAjustesTotais++
    }

    soma = somar(x41, x42)
    resultadoRecebido = transferencia(soma)

    if(resultadoRecebido != resultado4) {

        ajustar(x41, x42, resultado4, resultadoRecebido)
        ajustes++
        quantidadeAjustesTotais++
    }


} while (ajustes != 0);

console.log("Teste de aprendizagem com rede neural \n");
console.log("\nPeso 1 = " + p1);
console.log("\nPeso 2 = " + p2);
console.log("\nForam necessarios "+ quantidadeAjustesTotais + " ajustes para treinar a rede.");

function somar (x1, x2) {
    return (x1 * p1) + (x2 * p2)
}


function transferencia(soma) {
//converte os valores para 0 e 1
    return soma <= 0 ? 0 : 1;
// se soma for menor ou igual a 0 
//então retorna 0 senão retorna 1 
}


function ajustar(entrada1, entrada2, resultadoEsperado, resultadoObtido) {
    
    p1 = p1 + 1 * (resultadoEsperado - resultadoObtido) * entrada1
    p2 = p2 + 1 * (resultadoEsperado - resultadoObtido) * entrada2
    //combina os valores para poder ajustar
}