document.addEventListener('DOMContentLoaded',()=>{
    //* select the elements
    const textToTypeElement =   document.getElementById('text-to-type');
    const typingInputElement = document.getElementById('typing-input');
    const speedElement = document.getElementById('speed');
    const accuracyElement = document.getElementById('accuracy');
    
    // text to display
    const sampleText = ["you","me","when","They"];
    // initial values
    let currIndex = 0;
    let startTime = new Date();
    let errors = 0;

    // function to initialise or restart the game
    function initialzeGame(){
        const text = sampleText[Math.floor(Math.random()*sampleText.length)];
        textToTypeElement.textContent = text;
        typingInputElement.value = "";
        currIndex=0;
        errors=0;
        startTime = new Date();
        // update user feedback
        updateFeedback();
    }
    // function to update the speed and accuracy
    function updateFeedback(){
        const currentTime = new Date();
        const elapsedTime = (currentTime-startTime)/60000;
        if(elapsedTime <= 0){
            speedElement.textContent=0;
        }else{
            const wordsType = typingInputElement.value.trim().split(/\s+/).length;
            const speed = Math.round(wordsType/elapsedTime);
            speedElement.textContent = speed;
        }

        // calculate accuracy
        const accuracy = currIndex > 0 ? Math.round(((currIndex-errors)/currIndex)*100): 100;
        accuracyElement.textContent = accuracy;
    }
    // function to check typed character
    function checkCharacter(inputChar , targetChar){
        if(inputChar !== targetChar){
            errors++;
            // play the error sound
            // new Audio('./error.mp3').play();
            return false;
        }
        else{
            return true;
        }
    }
    //  fn to display msg
    function displayMessage(message){
        const msgArea = document.getElementById('message-area')
        msgArea.textContent=message;
        setTimeout(()=>{
            msgArea.textContent = "";
        },3000);
    }
    // event listener for typing input
    typingInputElement.addEventListener('input',(e)=>{
        const typedText = typingInputElement.value;
        const targetText = textToTypeElement.textContent;
        if(currIndex < targetText.length)
        {
            const isCorrect = checkCharacter(typedText[currIndex],targetText[currIndex]);
            textToTypeElement.innerHTML = targetText.substring(0,currIndex)+`<span class='${isCorrect?'correct':'incorrect'}'>${targetText[currIndex]}</span>`+targetText.substring(currIndex+1);
            currIndex++;
            if(currIndex === targetText.length){
                displayMessage('Text completed, Starting a new one.');
                initialzeGame();
            }
        }
        // update the feedback
        updateFeedback();
        // start the game   
    });
    initialzeGame(); 
});