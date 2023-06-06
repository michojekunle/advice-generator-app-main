//Configuration For tailwind css
//Added custom colors, font-Family and box-shadow

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

//Selecting HTML DOM elements
const diceButton = document.querySelector('#generateAdviceButton');
const slideShow = document.querySelector('#slideshow');

//Initializing slideshow to false on page load
let showSlideshow = false;

//creating a new Audio Object
const audio = new Audio();

//Defining sources for audios
const audioSrc = [
    'audios/tunetank_53 (1).mp3',
    'audios/tunetank_53 (2).mp3',
    'audios/tunetank_53 (3).mp3',
    'audios/tunetank_53 (4).mp3',
    'audios/tunetank_53 (5).mp3',
];

//Function to generate Advice
const generateAdvice = () => {
    //Fetching data with AJAX
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('loadend', () => {
        console.log(JSON.parse(xhr.response));
        const data = JSON.parse(xhr.response);

        const { slip: { id, advice } } = data; //destructuring the needed data from data
        
        //Updating DOM Elments
        document.getElementById('adviceID').innerText = id;
        document.getElementById('adviceText').innerText = `"${advice}"`;
    })
    
    xhr.open('GET', 'https://api.adviceslip.com/advice', true);
    xhr.send(); //Sending the request
}

// Added event Listener that listens for a click event on the dice Button
diceButton.addEventListener('click', () => { 
    showSlideshow = false; 
    audio.pause(); 
    slideShow.classList.remove('animate-pulse'); 
    
    // Add Shadow && Animation to the button
    diceButton.classList.remove('shadow-3xl');
    diceButton.classList.remove('shadow-neonGreen');
    diceButton.classList.remove('animate-pulse');
    
    //Generate Advice      
    generateAdvice();
});

//Added Event Listener to listen for slideshow event on click of the slideshow button 
slideShow.addEventListener('click', () => {
    showSlideshow = !showSlideshow;
    slideShow.classList.toggle('animate-pulse');//Added pulse animation whenever the slideshow button is clicked
    
    // Add Shadow && Animation to the button
    diceButton.classList.toggle('shadow-3xl');
    diceButton.classList.toggle('shadow-neonGreen');
    diceButton.classlist.toggle('animate-pulse');
    
    //get and set random audio
    audio.src = audioSrc[Math.floor(Math.random() * audioSrc.length)];//This generates a random src file and assigns it to the src attribute of the audio   
    
    //Generates an advice first and then waits for 5secs for the next advice to be generated.
    generateAdvice();
    
    const slideshowInterval = setInterval( () => {
        if(showSlideshow) {
            generateAdvice();
            audio.play();
            audio.loop = true; 
        }   
    }, 8000);//Interval for the loop of generating advices
});


