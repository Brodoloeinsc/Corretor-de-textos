function verifyRepeats(frase){
    let words = frase.split(' ');
    let wordCount = {};
    let ponteiro = [];
    let ponteiroFinal = []

    for(let word of words){
        if(wordCount[word]){
            wordCount[word]++;
        } else {
            wordCount[word] = 1;
        }
        if(!ponteiro.includes(word)){
            ponteiro.push(word);
        }
    }

    for(let e of ponteiro){
        if(wordCount[e] > 2){
            document.getElementById('resultados').innerHTML += `<li>${e}: ${wordCount[e]}</li>`;
            ponteiroFinal.push(e);
        }
    }

    return {wordCount, ponteiroFinal}
}

document.getElementById('Enviar').addEventListener('click', (e)=>{
    e.preventDefault();
    let frase = document.getElementById('frase').value;
    let wordCount = verifyRepeats(frase);

    document.getElementById('resultados').innerHTML = `<h2>Palavras repetidas:</h2><br>${wordCount.ponteiroFinal}<ul>`;

    let palavrasRepetidas = wordCount.ponteiroFinal;

    document.getElementById('frase').value = '';
})