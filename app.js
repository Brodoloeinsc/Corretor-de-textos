function verifyRepeats(frase){
    let words = frase.split(' ');
    let wordCount = {};
    let ponteiro = [];
    let ponteiroFinal = []

    for(let word of words){
        if(wordCount[word]){
            wordCount[word].repeticoes++
            wordCount[word].locals.push(words.indexOf(word, wordCount[word].repeticoes))
            if(!ponteiro.includes(word)){
                ponteiro.push(word);
            }
        } else {
            wordCount[word] = {
                repeticoes: 1,
                locals: []
            }
        }
    }

    for(let e of ponteiro){
        if(wordCount[e].repeticoes > 2){
            document.getElementById('resultados').innerHTML += `<li>${e}: ${wordCount[e]}</li>`;
            ponteiroFinal.push(e);
        }
    }

    return {wordCount, ponteiroFinal, words}
}

function changeText(frase, word, newWord){
    let words = frase.split(' ');
    words[word] = newWord;

    return words.join(" ")
}

function showModal(repeatIndex, phrase, words, wordCount){

    const currentWord = words[repeatIndex];
    const repetitions = wordCount[currentWord].repeticoes;

    document.getElementById('resultados').innerHTML = `
        A frase é:<br>"${phrase}"<br><br>
        A palavra "${currentWord}" repetiu ${repetitions} vezes, mude as que você quiser.
    `;
    
    for (let i = 0; i < repetitions; i++) {
        document.getElementById('resultados').innerHTML += `
            <br>${i + 1} <input type="text" id="input${i}">
        `;
    }

    document.getElementById('buttons').innerHTML = `
        <button id="submitChange" class="btn btn-success">Enviar Alterações</button>
        <button id="next" class="btn btn-primary">Próxima Palavra</button>
    `;

    // Adicionar eventos aos botões
    document.getElementById('submitChange').onclick = function () {
        for (let i = 0; i < repetitions; i++) {
            let newWord = document.getElementById(`input${i}`).value;
            if (newWord) {
                phrase = changeText(phrase, i, newWord);
            }
        }
        alert('Alterações enviadas!');
    };

    document.getElementById('next').onclick = function () {
        if (repeatIndex + 1 < words.length) {
            showModal(repeatIndex + 1, phrase, words, wordCount);
        } else {
            alert('Todas as palavras foram verificadas.');
            document.getElementById("fechar").click()
            document.getElementById('NovaFrase').innerHTML = `A frase final é: ${phrase}`;
        }
    }


}

document.getElementById('Enviar').addEventListener('click', (e)=>{
    e.preventDefault();
    let frase = document.getElementById('frase').value;
    let { wordCount, ponteiroFinal } = verifyRepeats(frase);
    
    if (ponteiroFinal.length > 0) {
        document.getElementById('resultados').innerHTML = `
            Palavras repetidas:<br>${ponteiroFinal.join(", ")}<br>
            Você deseja alterar alguma dessas palavras?
        `;
        document.getElementById('sim').addEventListener('click', (e)=>{
            frase = showModal(0, frase, ponteiroFinal, wordCount);
        })
    } else {
        document.getElementById('resultados').innerHTML = 'Não há palavras repetidas';
    }

    document.getElementById('frase').value = '';
})