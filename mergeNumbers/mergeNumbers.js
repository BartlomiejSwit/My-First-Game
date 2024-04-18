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

            ctx.fillStyle = this.colorBlock;
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
            if (x < 0) {
                x = 0;                
            } else if (x + this.width > gameAreaWidth) {
                x = gameAreaWidth - this.width;
            } 
            if (y < 0) {
                y = 0;
            } else if (y + this.height > gameAreaHeight) {
                y = gameAreaHeight - this.height;
            }
            
            if (x < this.blockPosition.x + 50 && x > this.blockPosition.x - 50 ) {
                this.x = x;
            } else {
                this.x = this.x;
            }
            if (y < this.blockPosition.y + 50 && y > this.blockPosition.y - 50) {
                this.y = y;
            } else {
                this.y = this.y;
            }
            //this.x = x;
            //this.y = y;            
        }
    }

    let squareN = new squareNumbers(50, 50, 2);
    let squareN2 = new squareNumbers(100, 50, 4);
    let squareN3 = new squareNumbers(150, 50, 8);
    let squareN4 = new squareNumbers(50, 100, 16);
    let squareN5 = new squareNumbers(100, 100, 32);
    let squareN6 = new squareNumbers(150, 100, 64);
    let squareN7 = new squareNumbers(200, 100, 128);
    let squareN8 = new squareNumbers(50, 150, 256);
    let squareN9 = new squareNumbers(100, 150, 512);
    let squareN10 = new squareNumbers(150, 150, 1024);
    let squareN11 = new squareNumbers(200, 150, 2048);

    let squares = [];

    squares.push(squareN, squareN2, squareN3, squareN4, squareN5, squareN6, squareN7, squareN8, squareN9, squareN10, squareN11);

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

    function generateSquare() {
/*         let x = Math.floor(Math.random() * 4);
        let y = Math.floor(Math.random() * 4); */
        let x = 50;
        let y = 300;
        /* let value = mergeNumbers[Math.floor(Math.random() * maxMergeNumber)]; */
        let value = generateRandomNumber();
        let newSquare = new squareNumbers(x, y, value);
        squares.push(newSquare);
        endGame();
        VievList();
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
    let selectedSquare = undefined;

    function selectedCheck(x, y, squers) {
        let selectedSquer = undefined;
        squers.forEach(block => {
            if (block.selected(x, y) === true) {

                block.blockClick = true;
                selectedSquer = block;
            }
        });        
        return selectedSquer;
    }

    function checkSelectionEvent(params) {
        if (params != undefined) {
            console.log("Selected block: ", selectedSquare);
            return true;
        } else {
            console.log("No block selected");
            return false;
        }
    }

    function readMousePosition(event) {
        mousePosition.x = event.clientX - canvasPosition.left;
        mousePosition.y = event.clientY - canvasPosition.top;
    }

    function mouseDownEvent(event) {
        readMousePosition(event);
        selectedSquare = selectedCheck(mousePosition.x, mousePosition.y, squares);
        cursorPositionOnBlock.x = mouseClick.x - selectedBlock.x;
        cursorPositionOnBlock.y = mouseClick.y - selectedBlock.y;

    }

    function mouseMoveEvent(event) {
        readMousePosition(event);
        if (selectedSquare != undefined) {
            selectedSquare.move(mousePosition.x - cursorPositionOnBlock.x, mousePosition.y - cursorPositionOnBlock.y);
        }
        
    }

    function mouseUpEvent(event) {       

        generateSquare();
    }


    function startGame() {
        /* console.log("Game started"); */
        message = "Game started";
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
}