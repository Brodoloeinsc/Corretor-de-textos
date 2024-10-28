function verifyRepeats(frase) {
    let words = frase.split(' ');
    let wordCount = {};
    let ponteiro = [];
    let ponteiroFinal = [];

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (wordCount[word]) {
            wordCount[word].repeticoes++;
            if (!ponteiro.includes(word)) {
                ponteiro.push(word);
            }
            wordCount[word].locals.push(i);
        } else {
            wordCount[word] = {
                repeticoes: 1,
                locals: [i]
            };
        }
    }

    for (let e of ponteiro) {
        if (wordCount[e].repeticoes > 2) { 
            document.getElementById('resultados').innerHTML += `<li>${e}: ${wordCount[e].repeticoes} vezes</li>`;
            ponteiroFinal.push(e);
        }
    }

    return { wordCount, ponteiroFinal, words };
}

function changeText(words, index, newWord) {
    words[index] = newWord;
    return words.join(" ");
}

function showModal(repeatIndex, phrase, words, wordCount) {
    const currentWord = words[repeatIndex];
    const repetitions = wordCount[currentWord].repeticoes;
    const locals = wordCount[currentWord].locals;

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

    document.getElementById('submitChange').onclick = function () {
        for (let i = 0; i < repetitions; i++) {
            let newWord = document.getElementById(`input${i}`).value;
            if (newWord) {
                phrase = changeText(phrase.split(' '), locals[i], newWord);  // Corrigido: Atualiza usando índice correto
            }
        }
        alert('Alterações enviadas!');
    };

    document.getElementById('next').onclick = function () {
        if (repeatIndex + 1 < words.length) {
            showModal(repeatIndex + 1, phrase, words, wordCount);
        } else {
            alert('Todas as palavras foram verificadas.');
            document.getElementById("fechar").click();
            document.getElementById('NovaFrase').innerHTML = `<b>A frase final é:</b> <p><span id="newPhrase">${phrase}</span> <br><br>`;
        }
    }
}

document.getElementById('Enviar').addEventListener('click', (e) => {
    e.preventDefault();
    let frase = document.getElementById('frase').value;
    let { wordCount, ponteiroFinal } = verifyRepeats(frase);
    
    document.getElementById('buttons').innerHTML = `
        <button id="sim" class="btn btn-success">Sim</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Não</button>
    `;

    if (ponteiroFinal.length > 0) {
        document.getElementById('resultados').innerHTML = `
            Palavras repetidas:<br>${ponteiroFinal.join(", ")}<br>
            Você deseja alterar alguma dessas palavras?
        `;
        document.getElementById('sim').addEventListener('click', () => {
            showModal(0, frase, ponteiroFinal, wordCount);
        });
    } else {
        document.getElementById('resultados').innerHTML = 'Não há palavras repetidas';
        document.getElementById('buttons').innerHTML = ``;
    }

    document.getElementById('frase').value = '';
});
