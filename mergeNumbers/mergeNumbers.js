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
            this.color = "white";            
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 50, 50);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText(this.value, this.x + 20, this.y + 30);
        }
    }

    let squareN = new squareNumbers(50, 50, 2);

    let squares = [];

    squares.push(squareN);

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