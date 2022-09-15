tailwind.config ={
    theme: {
      colors : {
        lightCyan: 'hsl(193, 38%, 86%)',
        neonGreen: 'hsl(150, 100%, 66%)',
        grayishBlue: 'hsl(217, 19%, 38%)',
        darkGrayishBlue: 'hsl(217, 19%, 24%)',
        darkBlue: 'hsl(218, 23%, 16%)'
      },
      extend: {
        fontFamily: {
          manrope: ['Manrope', 'sans-serif']
        },
        boxShadow: {
          '3xl': '0 0 20px 4px hsl(150, 100%, 66%) 0 0 20px 4px hsl(150, 100%, 66%)  0 0 20px 4px hsl(150, 100%, 66%) 0 0 20px 4px hsl(150, 100%, 66%) ',
        }
      }
    }
  }

const diceButton = document.querySelector('#generateAdviceButton');
const slideShow = document.querySelector('#slideshow');

let showSlideshow = false;

const audio = new Audio();

const audioSrc = [
    'audios/Cinematic-Indie.mp3',
    'audios/tunetank_53 (1).mp3',
    'audios/tunetank_53 (2).mp3',
    'audios/tunetank_53 (3).mp3',
    'audios/tunetank_53 (4).mp3',
    'audios/tunetank_53 (5).mp3',
];

const generateAdvice = () => {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('loadend', () => {
        console.log(JSON.parse(xhr.response));
        const data = JSON.parse(xhr.response);

        const { slip: { id, advice } } = data;
        
        document.getElementById('adviceID').innerText = id;
        document.getElementById('adviceText').innerText = `"${advice}"`;


    })
    
    xhr.open('GET', 'https://api.adviceslip.com/advice', true);
    xhr.send();
}

diceButton.addEventListener('click',() => {showSlideshow = false; audio.pause(); slideShow.classList.remove('aniamte-ping'); generateAdvice();});

slideShow.addEventListener('click', () => {
    showSlideshow = !showSlideshow;
    slideShow.classList.toggle('animate-ping');

    audio.src = audioSrc[Math.floor(Math.random() * audioSrc.length)-1];    

    generateAdvice();
    const slideshowInterval = setInterval( () => {
        if(showSlideshow) {
            generateAdvice();
            audio.play();
            audio.loop = true; 
        }   
    }, 8000);
});



