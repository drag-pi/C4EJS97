const MAX = 10;
const MIN = 0;
const MAX_TRIES = 3;
var luckyNumber;

let inputNumber;
let countTries = 0;
let isCorrect = false;

let trial = document.getElementById('trial');
trial.innerText = `Guess a natural number in [${MIN}, ${MAX}]`;

let inputDiv = document.getElementById('input-number');
let submitBtn = document.getElementById('submit-btn');
let alertDiv = document.getElementById('alert');
let modal = document.getElementById('my-modal');
let closeModalBtn = document.getElementsByClassName('close')[0];

function initialize(){
    luckyNumber = Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
    countTries = 0;
    isCorrect = false;
}

initialize();

inputDiv.onkeyup = () => {
    inputNumber = inputDiv.value;
    if (inputNumber.length === 0){
        alertDiv.innerText = "Please enter a number!";
        alertDiv.style.color = 'red';
        alertDiv.style.display = 'block';
        submitBtn.disabled = true;
    }
    if (!isValidInput(inputNumber)) {
        alertDiv.innerText = "Please enter a valid number!";
        alertDiv.style.color = 'red';
        alertDiv.style.display = 'block';
        submitBtn.disabled = true;
    }
    else {
        alertDiv.style.display = 'none';
        submitBtn.disabled = false;
    }
}

submitBtn.onclick = () => {
    countTries++;
    if (countTries >= MAX_TRIES && !isCorrect){
        alertDiv.style.display = 'none';
        inputDiv.value = '';
        alert(`You lose! Lucky number for today is ${luckyNumber}!`);
        initialize();
        return;
    }
    let inputString = inputDiv.value;
    inputNumber = Number(inputString);
    if (inputNumber === luckyNumber) {
        alert(`Jackpot!!!`);
        inputDiv.value = '';
        alertDiv.style.display = 'none';
        initialize();
        return;
    }
    else {
        inputDiv.value = '';
        alertDiv.innerText = `Bad luck! You have ${MAX_TRIES - countTries} more chance(s)!`;
        alertDiv.style.color = 'red';
        alertDiv.style.display = 'block';
    }
}

function isValidInput(input) {
    const VALID_REGEX = /^[0-9]+$/;
    return input.match(VALID_REGEX);
}