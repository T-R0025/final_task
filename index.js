"use strict"

document.addEventListener("DOMContentLoaded", () => {
    const currentNumberElement = document.getElementById("current-number");
    const scoreElement = document.getElementById("score");
    const resultMessageElement = document.getElementById("result-message");
    const restartButton = document.getElementById("restart-btn");
    const haiButton = document.getElementById("hai-btn");
    const lowButton = document.getElementById("low-btn");

    let currentNumber = getRandomNumber();
    let score = 0;

    function getRandomNumber(exclude = null) {
        let num;
        do {
            num = Math.floor(Math.random() * 13) + 1; //ランダムな数字を作る処理
        } while (num === exclude); //同じ数字が出ないようにする処理
        return num;
    }

    function updateNumberDisplay() {
        currentNumberElement.textContent = currentNumber;
    }

    function checkGuess(isHigh) {
        const nextNumber = getRandomNumber(currentNumber);
        const isCorrect = (isHigh && nextNumber > currentNumber) || (!isHigh && nextNumber < currentNumber);

        if (isCorrect) {
            score++;
            scoreElement.textContent = score;
            resultMessageElement.textContent = `正解！ 次の数字は ${nextNumber} でした。`;
            currentNumber = nextNumber;
            updateNumberDisplay();
        } else {
            resultMessageElement.textContent = `ゲームオーバー！ 正解は ${nextNumber} でした。`;
            haiButton.disabled = true;
            lowButton.disabled = true;
            restartButton.classList.remove("hidden");  //もう一度プレイを表示させるhiddenを消してる
        }
    }

    haiButton.addEventListener("click", () => checkGuess(true));
    lowButton.addEventListener("click", () => checkGuess(false));

    restartButton.addEventListener("click", () => {  //もう一度プレイを押したときの処理
        score = 0;
        scoreElement.textContent = score;
        resultMessageElement.textContent = "";
        currentNumber = getRandomNumber();
        updateNumberDisplay();
        haiButton.disabled = false;
        lowButton.disabled = false;
        restartButton.classList.add("hidden");
    });

    updateNumberDisplay();
});
