const wordUrl = 'https://random-words-api.vercel.app/word';
var hangmanClasses = ['','.man-head','.man-body','.man-left-hand','.man-right-hand','.man-left-leg','.man-right-leg']
words = ['boredom'];
var buttons = $('.alpha');
var letter = $('.letters');
var clicked = null;
var lose = null;
var mistakeCounter = {totalMistakes : 0,temporaryMistakes : 0};
var userGuesses = {}
var hint = $('.hint');
getWord();
getHint();
for(var i=0;i<=buttons.length;i++){
    buttons.eq(i).click(function(){
        clicked = this.textContent;
        addingClass(this);
        console.log(clicked);
        guessed();
    });
}
function userGuess(){
    userGuesses.userSees = userView(userGuesses.answer);
    userGuesses.splittedAnswer = userGuesses.answer.split('');
    userGuesses.splittedUserSees = userGuesses.userSees.split('');
    refreshLetters();
}
function mistakeCounting(action){
    if(action == 'adding'){
        mistakeCounter.temporaryMistakes += 1;
    }else if (action == 'checking'){
        if(mistakeCounter.temporaryMistakes == userGuesses.answer.length){
            mistakeCounter.totalMistakes += 1;
            addHangmanClass();
            mistakeCounter.temporaryMistakes = 0;
            if(mistakeCounter.totalMistakes == 6){
                alert('You Lose');
                lose=true;
            }
        }else(
            mistakeCounter.temporaryMistakes = 0
        )
    }
}
function checkWord(){
    if(lose == true){
    }else{
        if(userGuesses.answer == userGuesses.userSees){
            alert('Congratulation! You win.. Thanks for playing')
        }
    }
}
function addingClass(classAdded){
    $(classAdded).addClass('disabled');
}
function refreshLetters(){
    $(letter).text(userGuesses.userSees);
    checkWord();
}
function addHangmanClass(){
    for(var i = 0; i<=mistakeCounter.totalMistakes;i++){
        if(i == 1){
            $(hangmanClasses[i]).css('border-color','black'); 
        }else{
            $(hangmanClasses[i]).css('background-color','black');
        }
    }
}
function guessed(){
    for(var i=0;i<userGuesses.answer.length;i++){
        if (clicked == userGuesses.splittedAnswer[i]){
            userGuesses.splittedUserSees[i] = userGuesses.splittedAnswer[i];
            userGuesses.userSees = userGuesses.splittedUserSees.join('');
            refreshLetters();
        }else{
            mistakeCounting('adding');
        }
    }
    mistakeCounting('checking');
}
function randomWord(){
    var orderOfWord = Math.floor(Math.random()*words.length)
    return words[orderOfWord].toUpperCase();
}
function userView(word){
    letterLength = '';
    for(var i= 0; i< word.length;i++){
        letterLength = letterLength + '_';
    }
    return letterLength;
}
function getHint() {
    
}
async function getWord(){
    await fetch(wordUrl)
        .then(res => res.json())
        .then(function (data){
            userGuesses.answer = data[0].word.toUpperCase();
            hint.text(`Definition : ${data[0].definition}`);
            userGuess();
        })
        .catch(error => console.log('error'))
}