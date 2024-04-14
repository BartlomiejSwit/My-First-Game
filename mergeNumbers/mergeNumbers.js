window.runMergeScript = function () {
    const canvas = document.getElementById('mergeCanvas');
    const ctx = canvas.getContext('2d');

    var gameInterval;
    let canvasPosition = canvas.getBoundingClientRect();

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

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
/*             ctx.fillStyle = this.colorBlock;
            ctx.fillRect(this.x, this.y, this.blockSize, this.blockSize);
            ctx.fillStyle = "Black";
            ctx.font = this.blockSize/2 + "px Arial";
            //ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(this.value, this.x + this.blockSize/2, this.y + this.blockSize/2);
            //ctx.fillText(this.value, this.x/2 + this.blockSize/2, this.y/2 + this.blockSize/2);    */         
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
            ctx.font = this.blockSize / 2 + "px Arial";
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

    function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvWidth, canvHeight);
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



    function startGame() {
        console.log("Game started");
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
        console.log("Game over");
    }

    function closeGame() {
        stop();
        console.log("Game closed");
    }

    function stop() {
        clearInterval(gameInterval);    
    }

    startGame();

    return {stop};
}