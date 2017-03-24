let gameState = {
    currentLetter : "",
    playCount : 0,
    elements : []
};

function generateGrid () {
    let gridStr = "";
    for(let row = 0; row < 3; row++) {
        gridStr = gridStr + "<div class='row'>";;
        for(let col = 0; col < 3; col++) {
            gridStr = gridStr + "<div class='cell' onclick='handleClick(this)'></div>";
        }
        gridStr = gridStr + "</div>";
    }
    gridStr = gridStr + `<div class="hline line1"></div>
                          <div class="hline line2"></div>
                          <div class="vline line3"></div>
                          <div class="vline line4"></div>`;
    document.getElementById("game").innerHTML = gridStr;
}

function handleClick(element) {
    if(element.innerHTML != "")
        showPopup(true, "already clicked", null);
    else {
        element.innerHTML = getLetter();
        checkAndUpdateState(element);
    }    
}

function checkAndUpdateState(element) {
    gameState.playCount++;
    gameState.elements.push(element);

    if(gameState.playCount === 9) {
       showPopup(false, "Game over!", "Would you like to play again?");
    }
}

function getLetter() {
    let returnHtml = "";

    if(gameState.currentLetter === "") {
        gameState.currentLetter = "X";
        returnHtml = "<div class='x'></div>";
    }
    else if(gameState.currentLetter === "X") {
        gameState.currentLetter = "O";
        returnHtml = "<div class='o'></div>";
    }
    else {
        gameState.currentLetter = "X";    
        returnHtml = "<div class='x'></div>";
    }
    return returnHtml;        
}

function restartGame () {
    gameState.currentLetter = "";
    gameState.elements.forEach((element)=>{
        element.innerText = "";
    });
    gameState.elements.length = 0;
    gameState.playCount = 0;
    hidePopup();
}

function showPopup(isMultipleClick, message, subMessage) {
    if(isMultipleClick) {
        document.getElementById("yes-button").style.display = "none";
        document.getElementById("no-button").style.display = "none";
        document.getElementById("ok-button").style.display = null;
        document.getElementById("modal-message-header").innerText = message;
        document.getElementById("modal-subMessage").innerText = subMessage;
    } else {
        document.getElementById("yes-button").style.display = null;
        document.getElementById("no-button").style.display = null;
        document.getElementById("ok-button").style.display = "none";
        document.getElementById("modal-message-header").innerText = message;
        document.getElementById("modal-subMessage").innerText = subMessage;
    }
    document.getElementById("popup").style.display = "block";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
}