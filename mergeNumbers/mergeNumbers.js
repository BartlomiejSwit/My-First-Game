window.runMergeScript = function () {
    const canvas = document.getElementById('mergeCanvas');
    const ctx = canvas.getContext('2d');

    var gameInterval;
    let canvasPosition = canvas.getBoundingClientRect();

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const gameAreaStart = {x: 50, y: 50};
    const gameAreaEnd = {x: 250, y: 250};
    const gameAreaWidth = 200;
    const gameAreaHeight = 200;

    let score = 0;
    let maxMergeNumber = 8;
    const mergeNumbers = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];

    let message = "";


    class squareNumbers {
        constructor(x, y, value) {
            this.x = x;
            this.y = y;
            this.value = value;
            this.setPosition = {x: 0, y: 0};
            this.rightSite = null;
            this.leftSite = null;
            this.upSite = null;
            this.downSite = null;
            //this.color = "white";
            this.colorBlock = this.blockColor(this.value);
            this.colorText = "black";
            this.blockSize = 50;
            this.blockClick = false;
        }

        draw() {
            var cornerRadius = 5; // Promień zaokrąglenia krawędzi

            //ctx.fillStyle = this.colorBlock;
            ctx.fillStyle = this.blockColor(this.value); // Ustawiamy kolor wypełnienia
            ctx.strokeStyle = "Blue"; // Ustawiamy kolor obramowania
        
            // Rysujemy zaokrąglony prostokąt
            ctx.beginPath();
            ctx.moveTo(this.x + cornerRadius, this.y); // Lewy górny róg
            ctx.lineTo(this.x + this.blockSize - cornerRadius, this.y); // Górna krawędź
            ctx.arcTo(this.x + this.blockSize, this.y, this.x + this.blockSize, this.y + cornerRadius, cornerRadius); // Prawy górny róg
            ctx.lineTo(this.x + this.blockSize, this.y + this.blockSize - cornerRadius); // Prawa krawędź
            ctx.arcTo(this.x + this.blockSize, this.y + this.blockSize, this.x + this.blockSize - cornerRadius, this.y + this.blockSize, cornerRadius); // Prawy dolny róg
            ctx.lineTo(this.x + cornerRadius, this.y + this.blockSize); // Dolna krawędź
            ctx.arcTo(this.x, this.y + this.blockSize, this.x, this.y + this.blockSize - cornerRadius, cornerRadius); // Lewy dolny róg
            ctx.lineTo(this.x, this.y + cornerRadius); // Lewa krawędź
            ctx.arcTo(this.x, this.y, this.x + cornerRadius, this.y, cornerRadius); // Lewy górny róg
            ctx.closePath(); // Zamykamy ścieżkę
            ctx.fill(); // Wypełniamy kształt
            ctx.stroke(); // Rysujemy obramowanie
        
            ctx.fillStyle = "Black";
            ctx.font = this.blockSize / 3 + "px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.value, this.x + this.blockSize / 2, this.y + this.blockSize / 2);
        }

        blockColor(value) {
            switch (value) {
                case 2:
                    return "white";
                case 4:
                    return "yellow";
                case 8:
                    return "orange";
                case 16:
                    return "red";
                case 32:
                    return "purple";
                case 64:
                    return "blue";
                case 128:
                    return "green";
                case 256:
                    return "brown";
                case 512:
                    return "pink";
                case 1024:
                    return "gray";
                case 2048:
                    return "gold";
                default:
                    return "black";
            }
        }

        positioning() {
            this.x = Math.round(this.x / 50) * 50;
            this.y = Math.round(this.y / 50) * 50;
        }

        move(x, y) {
/*             if (x >= gameAreaStart.x && x <= gameAreaEnd.x && y >= gameAreaStart.y && y <= gameAreaEnd.y) {
                this.x = x;
                this.y = y;
            } */
            this.x = x;
            this.y = y;         
        }

        selected(spaceX, spaceY) {     
            if (spaceX >= this.x && spaceX <= (this.x + this.blockSize) && spaceY >= this.y && spaceY <= (this.y + this.blockSize)) {
                return true;
            } else {
                return false;
            }
        }

        savePosition() {
            this.setPosition.x = this.x;
            this.setPosition.y = this.y;
        }

        loadPosition() {
            this.x = this.setPosition.x;
            this.y = this.setPosition.y;
        }

        checkValue(sqare) {
            if (this.value === sqare.value) {
                return true;
            } else {
                return false;
            }
        }
    }

/*     let squareN = new squareNumbers(50, 50, 2);
    let squareN2 = new squareNumbers(100, 50, 4);
    let squareN3 = new squareNumbers(150, 50, 8);
    let squareN4 = new squareNumbers(50, 100, 16);
    let squareN5 = new squareNumbers(100, 100, 32);
    let squareN6 = new squareNumbers(150, 100, 64);
    let squareN7 = new squareNumbers(200, 100, 128);
    let squareN8 = new squareNumbers(50, 150, 256);
    let squareN9 = new squareNumbers(100, 150, 512);
    let squareN10 = new squareNumbers(150, 150, 1024);
    let squareN11 = new squareNumbers(200, 150, 2048); */

    let squares = [];

    //squares.push(squareN, squareN2, squareN3, squareN4, squareN5, squareN6, squareN7, squareN8, squareN9, squareN10, squareN11);

    function VievList() {
        squares.forEach(square => {
            console.log(square);
        });
    }

    function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvWidth, canvHeight);
        ctx.fillStyle = 'white';
        ctx.fillRect(50, 300, 50, 50);
        ctx.fillStyle = 'black';
        ctx.fillRect(51, 301, 48, 48);
        ctx.fillStyle = 'white';
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Score", 200, 315);
        ctx.fillText(score, 200, 350);
        ctx.fillText(message, 150, 25);

        ctx.fillStyle = 'white';
        ctx.fillRect(gameAreaStart.x, gameAreaStart.y, gameAreaWidth, gameAreaHeight);
        ctx.fillStyle = 'white';
        ctx.fillRect(gameAreaStart.x + 1, gameAreaStart.y + 1, gameAreaWidth - 2, gameAreaHeight - 2);
        ctx.fillStyle = 'black';
        for (var i = gameAreaStart.x; i < gameAreaEnd.x; i += 50) {
            for (var j = gameAreaStart.y; j < gameAreaEnd.y; j += 50) {
                ctx.fillRect(i + 1, j + 1, 48, 48);
            }
        }

    }

    function drawSquare() {
        squares.forEach(square => {
            square.draw();
        });
    }

    function draw() {
        drawBackground();
        drawSquare();
    }

    function generateSquare(x = null, y = null, value = null) {
/*         let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4); */
        let sealSquare = false;
        if (x === null && y === null && value === null) {
            sealSquare = true;
        }
        if (x === null) {
            x = 50;
        }
        if (y === null) {
            y = 300;
        }
/*         let x = 50;
        let y = 300; */
        /* let value = mergeNumbers[Math.floor(Math.random() * maxMergeNumber)]; */
        /* let value = generateRandomNumber(); */
        if (value === null) {
            value = generateRandomNumber();
        }
        let newSquare = new squareNumbers(x, y, value);
        if (sealSquare === true) {
            newSquare.blockClick = true;
        }
        squares.push(newSquare);
        endGame();
       /*  VievList(); */
    }

    function generateRandomNumber() {
        let value;
        do {
            value = mergeNumbers[Math.floor(Math.random() * mergeNumbers.length)];
        } while (value > maxMergeNumber);
        return value;
    }

    let mousePosition = {x: 0, y: 0};
    let cursorPositionOnBlock = {x: 0, y: 0};
    let mouseClick = {x: 0, y: 0};
    let selectedSquare = undefined;

    function selectedCheck(x, y, squers) {
        let selectedSquer = undefined;
        squers.forEach(block => {
            if (block.selected(x, y) === true) {
                /* block.blockClick = true; */
                selectedSquer = block;
            }
        });        
        return selectedSquer;
    }

    function checkSelectionEvent(params) {
        if (params != undefined) {
            /* console.log("Selected block: ", selectedSquare); */
            return true;
        } else {
            console.log("No block selected");
            return false;
        }
    }

    function checksCollisionSquare(squers, selectedSquare) {
        let moveBlock = false;
        squers.forEach(block => {
            if (block !== selectedSquare) {
                if (block.x === selectedSquare.x && block.y === selectedSquare.y) {
                    moveBlock = true;
                }
            }
        });
        return moveBlock;

    }

    function checksCollisionWall(selectedSquare) {
        let moveBlock = false;
        if (selectedSquare.x < gameAreaStart.x || 
            selectedSquare.x > gameAreaEnd.x - selectedSquare.blockSize || 
            selectedSquare.y < gameAreaStart.y || 
            selectedSquare.y > gameAreaEnd.y - selectedSquare.blockSize) {
            moveBlock = true;
        }
        return moveBlock;
    }

    function readMousePosition(event) {
        mousePosition.x = event.clientX - canvasPosition.left;
        mousePosition.y = event.clientY - canvasPosition.top;
    }

    function mouseDownEvent(event) {
        /* readMousePosition(event); */
        mouseClick.x = event.clientX - canvasPosition.left;
        mouseClick.y = event.clientY - canvasPosition.top;
        selectedSquare = selectedCheck(mousePosition.x, mousePosition.y, squares);
/*         console.log("selectedSquare: ", selectedSquare); */
        if (checkSelectionEvent(selectedSquare)){
            cursorPositionOnBlock.x = mouseClick.x - selectedSquare.x;
            cursorPositionOnBlock.y = mouseClick.y - selectedSquare.y;
            selectedSquare.savePosition();
        } 

    }

    function mouseMoveEvent(event) {
        readMousePosition(event);
        if (checkSelectionEvent(selectedSquare) && selectedSquare.blockClick === true) {
/*             console.log("selectedSquare: ", selectedSquare, "mousePosition: ", mousePosition, "cursorPositionOnBlock: ", cursorPositionOnBlock); */
            selectedSquare.move(mousePosition.x - cursorPositionOnBlock.x, mousePosition.y - cursorPositionOnBlock.y);
        }       
    }

    function mouseUpEvent(event) {   
        if (checkSelectionEvent(selectedSquare)) {            
            selectedSquare.positioning();
            if (checksCollisionSquare(squares, selectedSquare) || checksCollisionWall(selectedSquare)) {
                /* selectedSquare.loadPosition(); */
            } else {
                selectedSquare.blockClick = false;
                selectedSquare.savePosition();
/*                 mergeSquares(selectedSquare);
                //mergeSquires(selectedSquare);
                generateSquare(); */
                let merge = false;
                do {     
                    merge = mergeSquares(selectedSquare)
                } while (merge === true);
                generateSquare();
            }
            
        }
        
    }

/*     let mergeInProgress = false; // dodajemy flagę kontrolną

    function mergeSquares(selectedSquare) {
        if (!checkSelectionEvent(selectedSquare) || mergeInProgress) {
            return false;
        }

        mergeInProgress = true; // ustawiamy flagę na true
        
        let halfSize = selectedSquare.blockSize / 2;
        let neighbors = [
            { x: selectedSquare.x, y: selectedSquare.y - halfSize }, // kwadrat z góry
            { x: selectedSquare.x, y: selectedSquare.y + selectedSquare.blockSize + halfSize }, // kwadrat z dołu
            { x: selectedSquare.x - halfSize, y: selectedSquare.y }, // kwadrat z lewej strony
            { x: selectedSquare.x + selectedSquare.blockSize + halfSize, y: selectedSquare.y } // kwadrat z prawej strony
        ];

        for (let neighbor of neighbors) {
            let checkingSquare = selectedCheck(neighbor.x, neighbor.y, squares);
            if (checkingSquare && selectedSquare.checkValue(checkingSquare)) {
                selectedSquare.value += checkingSquare.value;
                score += selectedSquare.value;
                if (selectedSquare.value > maxMergeNumber) {
                    maxMergeNumber = selectedSquare.value;
                }
                squares = squares.filter(block => block !== checkingSquare);
                mergeInProgress = false; // resetujemy flagę na false po zakończeniu
                return true;
            }
        }
        
        mergeInProgress = false; // resetujemy flagę na false, jeśli nie znaleziono kwadratu do scalenia
        return false;
    } */

    function mergeSquares(selectedSquare) {
        if (!checkSelectionEvent(selectedSquare)) {
            return false;
        }
        
        let halfSize = selectedSquare.blockSize / 2;
        let neighbors = [
            { x: selectedSquare.x + selectedSquare.blockSize + halfSize, y: selectedSquare.y },
            { x: selectedSquare.x - halfSize, y: selectedSquare.y },
            { x: selectedSquare.x, y: selectedSquare.y - halfSize },
            { x: selectedSquare.x, y: selectedSquare.y + selectedSquare.blockSize + halfSize }
        ];
    
        for (let neighbor of neighbors) {
            let checkingSquare = selectedCheck(neighbor.x, neighbor.y, squares);
            if (checkingSquare && selectedSquare.checkValue(checkingSquare)) {
                selectedSquare.value += checkingSquare.value;
                score += selectedSquare.value;
                if (selectedSquare.value > maxMergeNumber) {
                    maxMergeNumber = selectedSquare.value;
                }
                squares = squares.filter(block => block !== checkingSquare);
                return true;
            }
        }
        
        return false;
    }

/*     function mergeSquires(selectedSquare) {
        if (checkSelectionEvent(selectedSquare)) {
            let halfSize = selectedSquare.blockSize / 2;
            let rightCheck = selectedSquare.x + selectedSquare.blockSize + halfSize;
            let leftCheck = selectedSquare.x - halfSize;
            let upCheck = selectedSquare.y - halfSize;
            let downCheck = selectedSquare.y + selectedSquare.blockSize + halfSize;
            let checkingSquare = undefined;
            if (checkingSquare = selectedCheck(rightCheck, selectedSquare.y, squares)) {
                if (selectedSquare.checkValue(checkingSquare)) {
                    selectedSquare.value += checkingSquare.value;
                    score += selectedSquare.value;
                    if (selectedSquare.value > maxMergeNumber) {
                        maxMergeNumber = selectedSquare.value;
                    }
                    squares = squares.filter(block => block !== checkingSquare);
                    return true;
                }
            }
            if (checkingSquare = selectedCheck(leftCheck, selectedSquare.y, squares)) {
                if (selectedSquare.checkValue(checkingSquare)) {
                    selectedSquare.value += checkingSquare.value;
                    score += selectedSquare.value;
                    if (selectedSquare.value > maxMergeNumber) {
                        maxMergeNumber = selectedSquare.value;
                    }
                    squares = squares.filter(block => block !== checkingSquare);
                    return true;
                }
            }
            if (checkingSquare = selectedCheck(selectedSquare.x, upCheck, squares)) {
                if (selectedSquare.checkValue(checkingSquare)) {
                    selectedSquare.value += checkingSquare.value;
                    score += selectedSquare.value;
                    if (selectedSquare.value > maxMergeNumber) {
                        maxMergeNumber = selectedSquare.value;
                    }
                    squares = squares.filter(block => block !== checkingSquare);
                    return true;
                }
            }
            if (checkingSquare = selectedCheck(selectedSquare.x, downCheck, squares)) {
                if (selectedSquare.checkValue(checkingSquare)) {
                    selectedSquare.value += checkingSquare.value;
                    score += selectedSquare.value;
                    if (selectedSquare.value > maxMergeNumber) {
                        maxMergeNumber = selectedSquare.value;
                    }
                    squares = squares.filter(block => block !== checkingSquare);
                    return true;
                }
            }
            return false;
        }
    }  
 */
    function startGame() {
        /* console.log("Game started"); */
        message = "Game started";
        generateSquare();
        canvas.addEventListener("mousedown", mouseDownEvent);
        canvas.addEventListener("mousemove", mouseMoveEvent);
        canvas.addEventListener("mouseup", mouseUpEvent);
        gameInterval = setInterval(gameRuning, 1000 / 60);

    }

    function gameWinStage() {

    }

    function gameRuning() {
        draw();  
    }

    function pauseGame() {
        console.log("Game paused");
    }

    function endGame() {        
        if (squares.length >= 17) {
            squares = [];
            /* console.log("Game over"); */
            message = "Game over";
        }
    }

    function closeGame() {
        stop();
        /* console.log("Game closed"); */
        message = "Game closed";
    }

    function stop() {
        clearInterval(gameInterval);    
    }

    startGame();

    return {stop};
    //TODO: Dodać alert z informacją o zakończeniu gry
    //TODO: Dodać możliwość restartu gry
}