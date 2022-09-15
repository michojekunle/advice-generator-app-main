const diceButton = document.querySelector('#generateAdviceButton');
const slideShow = document.querySelector('#slideshow')

diceButton.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('loadend', () => {
        console.log(JSON.parse(xhr.response));
        const data = JSON.parse(xhr.response);

        const { slip: { id, advice } } = data;
        
        document.getElementById('adviceID').innerText = id;
        document.getElementById('adviceText').innerText = advice;


    })
    
    xhr.open('GET', 'https://api.adviceslip.com/advice', true);
    xhr.send();

})