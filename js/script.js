function startGameUX() {
    // At the beginning of the game, only the select attack section remains visible
    let sectionSelectAttack = document.getElementById("select-attack");
    sectionSelectAttack.style.display = "none";

    let sectionResetGame = document.getElementById("reset-game");
    sectionResetGame.style.display = "none";
}


function selectPlayerPet() {
    // After clicking the select pet button, the select attack section is displayed
    let sectionSelectAttack = document.getElementById("select-attack");
    sectionSelectAttack.style.display = "block";

    let spanPlayerPetName = document.getElementById("player-pet-name");

    if(document.getElementById("pikachu").checked) {
        spanPlayerPetName.innerHTML = "Pikachu";
    } else if(document.getElementById("charmander").checked) {
        spanPlayerPetName.innerHTML = "Charmander";
    } else if(document.getElementById("charizard").checked) {
        spanPlayerPetName.innerHTML = "Charizard";
    } else {
        // Prevent the player from being able to move to the attack section without havin chosen a pet
        alert("You must select a pet!");
        location.reload()
    }
    // Once the player selects his pet, the PC selects a random pet
    selectEnemyPet();
}


function selectEnemyPet() {
    let randomSelection = generateRandomSelection(1, 3);
    let spanEnemyPetName = document.getElementById("enemy-pet-name");

    if(randomSelection == 1) {
        spanEnemyPetName.innerHTML = "Pikachu";
    } else if(randomSelection == 2) {
        spanEnemyPetName.innerHTML = "Charmander";
    } else {
        spanEnemyPetName.innerHTML = "Charizard";
    }
}


function generateRandomSelection(min, max) {
    return Math.floor(Math.random() * (max + min + 1) + min);
}


let playerAttack = null, enemyAttack = null
let resultGame = null

function selectPlayerAttack() {
    // After the enemy chooses a pet, this section is hidden
    //let sectionSelectPet = document.getElementById("select-pet");
    //sectionSelectPet.style.display = "none";

    // Generates a dynamic message when any attack is selected
    let fireAttackButton = document.getElementById("fire-attack");
    fireAttackButton.addEventListener("click", () => {
        playerAttack = "FIRE";
        // Once the player selects his attack, the PC selects a random attack
        selectEnemyAttack();
    })

    let waterAttackButton = document.getElementById("water-attack");
    waterAttackButton.addEventListener("click", () => {
        playerAttack = "WATER";
        selectEnemyAttack();
    })

    let landAttackButton = document.getElementById("land-attack");
    landAttackButton.addEventListener("click", () => {
        playerAttack = "LAND";
        selectEnemyAttack();
    })

    //selectEnemyAttack(); --> UNREACHABLE STATEMENT
    // NO SE PUEDE PONER AQUI PORQUE EL ANTERIOR SON FUNCIONES Y CUANDO ENTRE TERMINARAN Y NO LLEGARA
}


function selectEnemyAttack() {
    let randomSelection = generateRandomSelection(1, 3);

    if(randomSelection == 1) {
        enemyAttack = "FIRE";
    } else if(randomSelection == 2) {
        enemyAttack = "WATER";
    } else {
        enemyAttack = "LAND";
    }
    // After having selected the two attacks, the combat is made
    combat();
}


function combat() {
    if(playerAttack == enemyAttack) {
        resultGame = "TIE";
    } else if((playerAttack == "FIRE" && enemyAttack == "LAND") || (playerAttack == "WATER" && enemyAttack == "FIRE") 
        || (playerAttack == "LAND" && enemyAttack == "WATER")) {
            resultGame = "WON";
    } else {
        resultGame = "LOSE";
    }
    // INCLUSO AUNQUE SE EJECUTE EL ELSE Y PERDAMOS SE HA DE MOSTRAR UN MENSAJE AL RESPECTO
    generateAttackMessages();

    //
    generateLivesMessages();
}


function generateAttackMessages() {
    // nombre de la etiqueta HTML a crear con JS
    let dynamicAttackMessages = document.createElement("p");

    // UNA VEZ CREADO EL PARRAFO MODIFICAMOS EL CONTENIDO INCLUIDO DENTRO DEL HTML
    dynamicAttackMessages.innerHTML = "You have selected " + playerAttack + " as attack and your enemy has selected "
                                + enemyAttack + " as attack. ==> " + resultGame;
    // PREVIAMENTE YA HA CREADO EL PARRAFO PERO FALTA INDICARLE DONDE QUEREMOS QUE LO META LE INDICAMOS QUE SE LO AÑADA A LA SECCION
    let spanGameMessages = document.getElementById("game-messages");
    spanGameMessages.appendChild(dynamicAttackMessages);
}


let playerPetLivesCount = 3, enemyPetLivesCount = 3

function generateLivesMessages() {
    let spanPlayerPetLives = document.getElementById("player-pet-lives");
    spanPlayerPetLives.innerHTML = playerPetLivesCount;

    let spanEnemyPetLives = document.getElementById("enemy-pet-lives");
    spanEnemyPetLives.innerHTML = enemyPetLivesCount;

    if(resultGame == "WON") {
        enemyPetLivesCount--;
        spanEnemyPetLives.innerHTML = enemyPetLivesCount;
    } else if(resultGame == "LOSE") {
        playerPetLivesCount--;
        spanPlayerPetLives.innerHTML = playerPetLivesCount;
    }
    //
    checkLives();
}


function checkLives() {
    if(playerPetLivesCount == 0) {
        generateResultMessage();
    } else if(enemyPetLivesCount == 0) {
        generateResultMessage();
    }
}


function generateResultMessage() {
    let resultMessage = document.createElement("p");
    resultMessage.innerHTML = "The game is over and you have " + resultGame;

    let spanGameMessages = document.getElementById("game-messages");
    spanGameMessages.appendChild(resultMessage);

    // After the final message is displayed, avoid further pressing the attack buttons
    let fireAttackButton = document.getElementById("fire-attack");
    fireAttackButton.disabled = true;

    let waterAttackButton = document.getElementById("water-attack");
    waterAttackButton.disabled = true;

    let landAttackButton = document.getElementById("land-attack");
    landAttackButton.disabled = true;

    // Once the game is finished and the final result message is displayed, the restart button is shown
    let sectionResetGame = document.getElementById("reset-game");
    sectionResetGame.style.display = "block";
}


// Requires the browser to notify us when all HTML components have been loaded
window.addEventListener("load", () => {
    // The script will be executed when the browser has loaded all HTML elements
    let selectPetButton = document.getElementById("select");
    selectPetButton.addEventListener("click", selectPlayerPet);

    let resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
        location.reload();
    })

    // Functions are called after all HTML elements are loaded
    startGameUX();

    selectPlayerAttack();

    generateLivesMessages();
})

// TODO: https://www.w3schools.com/html/html5_syntax.asp
// TODO: https://stackoverflow.com/questions/6028211/what-is-the-standard-naming-convention-for-html-css-ids-and-classes