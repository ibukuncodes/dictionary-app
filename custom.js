const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');

btn.addEventListener("click", () => {
    let searchWord = document.getElementById("search-word").value;
    fetch(`${url}${searchWord}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `
        <div class="word">
            <h4>${searchWord}</h4>
            <button onclick ="playSound">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="transcribe">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="result_meaning">
            ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="result_example">${data[0].meanings[0].definitions[0].example || ""}</p>`;
        sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        console.log(sound);
    })
    .catch(() => {
        result.innerHTML = `<h4 class="error">Word not found. try checking the spelling or try another word</h4>`;
    });
});

function playSound(){
    sound.play();
}

