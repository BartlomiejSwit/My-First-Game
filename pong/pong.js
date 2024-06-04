function runPongScript() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    var gameInterval;

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const lineWidth = 5;
    const lineHeight = 10;

    var audioHit = new Audio('pong/sound/Ball.mp3');
    var audioMiss = new Audio('pong/sound/Miss.mp3');
    //audio.play();

    /*
    var audio = new Audio();
    audio.crossOrigin = 'anonymous';
    audio.src = 'pong/Ball.wav';
    audio.play();
    */
    /*
    var audio = new Audio('pong/sound/Ball.mp3');
    audio.onerror = function(event) {
        console.error('Błąd ładowania pliku dźwiękowego', event);
    };  
    */
    function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvWidth, canvHeight);

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(canvWidth / 2, canvHeight / 2, 80 / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(canvWidth / 2, canvHeight / 2, 75 / 2, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = 'white';
        //ctx.fillRect(canvWidth / 2, 0, 2, canvHeight);
        for (let i = 5; i < canvHeight; i += 20) {
            ctx.fillRect(canvWidth / 2 - lineWidth / 2, i, lineWidth, lineHeight);
        }

        ctx.fillStyle = 'white';
        ctx.fillRect(rightPaddleX, 0, lineWidth, canvHeight);

        ctx.fillStyle = 'red';
        ctx.fillRect(leftPaddleX + paddleWidth - lineWidth, 0, lineWidth, canvHeight);


    }

    const ballSize = 20;
    let ballX = canvWidth / 2 - ballSize / 2;
    let ballY = canvHeight / 2 - ballSize / 2;

    let ballSpeedX = 1;
    let ballSpeedY = 1;

    let blink = false;

    function drawBall(x, y) {
        //ctx.fillStyle = 'yellow';
        //ctx.fillRect(x, y, ballSize, ballSize);
        ctx.fillStyle = (blink) ? 'red' : 'white';
        ctx.beginPath(x, y);
        ctx.arc(x + 10, y + 10, ballSize / 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawPaddle(x, y, side) {
        if (side === "left") {
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, paddleWidth, paddleHeight);
        } else if (side === "right") { 
            ctx.fillStyle = 'red';
            ctx.fillRect(x, y, paddleWidth, paddleHeight);
        }
    }

    function blinkBall() {
        blink = !blink;
    }

    const paddleHeight = 100;
    const paddleWidth = 20;

    const leftPaddleX = 20;
    const rightPaddleX = canvWidth - 40;

    let leftPaddleY = canvHeight / 2 - paddleHeight / 2;
    let rightPaddleY = canvHeight / 2 - paddleHeight / 2;

    let leftPoints = 0;
    let rightPoints = 0;
   
    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY <= 0  || ballY >= canvHeight - ballSize) {
            ballSpeedY = -ballSpeedY;
            audioHit.play();
            ballSpeedUp();
        }

        /*if (ballX <= 0 || ballX >= canvWidth - ballSize) {
            ballSpeedX = -ballSpeedX;
            ballSpeedUp();
        }*/

        if (ballX <= leftPaddleX + paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            audioHit.play();
            ballSpeedUp();
            blinkBall();
        } else if (ballX <= 0) {
            audioMiss.play();
            rightPoints++;
            ballReset();
            ballSpeedX = -1;
            ballSpeedY = -1;
        }

        if (ballX >= rightPaddleX - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            audioHit.play();
            ballSpeedUp();
            blinkBall();
        } else if (ballX >= canvWidth - ballSize) {
            audioMiss.play();
            leftPoints++;
            ballReset();
            ballSpeedX = 1;
            ballSpeedY = 1;
        }

    }

    //console.log("leftPoints: " + leftPoints);
    //console.log("rightPoints: " + rightPoints);

    /*window.addEventListener("click", 
    function () {
        console.log("click");
    });*/

    /*window.addEventListener("keydown",
        function (e) {
            //console.log("key is: " + e.code);
            if (e.code === "Space") {
                console.log("Space is pressed");
                //ballSpeedUp();
                pauseGame();

            }
            if (e.code === "P") {
                console.log("Escape is pressed");
                pauseGame();
            }
        }); */
        

    function ballSpeedUp() {
        if (ballSpeedX > 0 && ballSpeedX < 16) {
            ballSpeedX += 0.5;
        } else if (ballSpeedX < 0 && ballSpeedX > -16) {
            ballSpeedX -= 0.5;
        }

        if (ballSpeedY > 0 && ballSpeedY < 16) {
            ballSpeedY += 0.5;
        } else if (ballSpeedY < 0 && ballSpeedY > -16) {
            ballSpeedY -= 0.5;
        }
    }

    function ballReset() {
        ballX = canvWidth / 2 - ballSize / 2;
        ballY = canvHeight / 2 - ballSize / 2;
        console.log("leftPoints: " + leftPoints);
        console.log("rightPoints: " + rightPoints);
    }

    let canvasPosition = canvas.getBoundingClientRect();
    //console.log(canvasPosition);

    function leftPaddlePosition(e) {
        //console.log("mousemove is: " + (e.clientY - canvasPosition.top))
        leftPaddleY = e.clientY - canvasPosition.top - paddleHeight / 2;

        if (leftPaddleY >= canvHeight - paddleHeight) {
            leftPaddleY = canvHeight - paddleHeight;
        }

        if (leftPaddleY <= 0) {
            leftPaddleY = 0;
        }
        //rightPaddleY = leftPaddleY;
    }

    aiCalculate = function () {
        const rightPaddleYCenter = rightPaddleY + paddleHeight / 2;
        const ballYCenter = ballY + ballSize / 2;

        /*if (rightPaddleYCenter < ballY - 35) {
            rightPaddleY += 9;
        } else if (rightPaddleYCenter > ballY + 35) {
            rightPaddleY -= 9;
        }*/

        /* To do smart AI for right paddle Testing
        const leftPaaadleYCenter = leftPaddleY + paddleHeight / 2;
        if (leftPaaadleYCenter < ballY - 35) {
            leftPaddleY += 11;
        } else if (leftPaaadleYCenter < ballY - 100) {
            leftPaddleY += 9;
        } else if (leftPaaadleYCenter > ballY + 35) {
            leftPaddleY -= 11;
        } else if (leftPaaadleYCenter > ballY + 100) {
            leftPaddleY -= 9;
        }*/
        
        
        if (ballX > canvWidth / 2) {
            if (rightPaddleYCenter - ballYCenter > 200) {
                rightPaddleY -= 30;
            } else if (rightPaddleYCenter - ballYCenter > 50) {
                rightPaddleY -= 30;
            } else if (rightPaddleYCenter - ballYCenter < -200) {
                rightPaddleY += 30;
            } else if (rightPaddleYCenter - ballYCenter < -50) {
                rightPaddleY += 30;
            }       

        }if (ballX <= canvWidth / 2 && ballX > 150) {
            if (rightPaddleYCenter - ballYCenter > 100) {
                rightPaddleY -= 10;
            } else if (rightPaddleYCenter - ballYCenter < -100) {
                rightPaddleY += 10;
            }
        }
               
    }

    /*function startGame() {
        console.log("Game started");
        canvas.addEventListener("mousemove", leftPaddlePosition);
        setInterval(gameRuning, 1000 / 60);

    }*/

    //TODO wyznaczyć plansze
    //TODO dodać punktację
    //TODO Dodać koniec gry
    //TODO opracować lepsze odbijanie piłeczki
    //TODO dodać prędkość piłeczki
    //TODO dodać sterowanie strzałkami
    //TODO dodać resztę funkcjonalności pause, restert

    function startGame() {
        console.log("Game started");
        canvas.addEventListener("mousemove", leftPaddlePosition);
        gameInterval = setInterval(gameRuning, 1000 / 60);
    }

    function gameRuning() {
        moveBall();
        aiCalculate();
        drawBackground();
        drawBall(ballX, ballY);
        drawPaddle(leftPaddleX, leftPaddleY, "left");
        drawPaddle(rightPaddleX, rightPaddleY, "right");        
    }

    function pauseGame() {
        console.log("Game paused");
    }



    function endGame() {
        if (leftPoints >= 10 || rightPoints >= 10) {
            console.log("Game over");
        }
    }

    function closeGame() {
        stop();
        console.log("Game closed");
    }

    function stop() {
        clearInterval(gameInterval);
        canvas.removeEventListener("mousemove", leftPaddlePosition);
    }

    startGame();

    return {stop};

}