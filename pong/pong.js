function runPongScript() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const linaWidth = 5;
    const lineHeight = 10;

    function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvWidth, canvHeight);

        ctx.fillStyle = 'white';
        //ctx.fillRect(canvWidth / 2, 0, 2, canvHeight);
        for (let i = 5; i < canvHeight; i += 20) {
            ctx.fillRect(canvWidth / 2 - linaWidth / 2, i, linaWidth, lineHeight);
        }

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

    function drawPaddle(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
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


    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY <= 0  || ballY >= canvHeight - ballSize) {
            ballSpeedY = -ballSpeedY;
            ballSpeedUp();
        }

        /*if (ballX <= 0 || ballX >= canvWidth - ballSize) {
            ballSpeedX = -ballSpeedX;
            ballSpeedUp();
        }*/

        if (ballX <= leftPaddleX + paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            ballSpeedUp();
            blinkBall();
        } else if (ballX <= 0) {
            ballReset();
            ballSpeedX = -1;
            ballSpeedY = -1;
        }

        if (ballX >= rightPaddleX - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            ballSpeedUp();
            blinkBall();
        } else if (ballX >= canvWidth - ballSize) {
            ballReset();
            ballSpeedX = 1;
            ballSpeedY = 1;
        }

    }

    /*window.addEventListener("click", 
    function () {
        console.log("click");
    });*/

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
    }

    canvasPosition = canvas.getBoundingClientRect();
    console.log(canvasPosition);

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

        if (rightPaddleYCenter < ballY - 35) {
            rightPaddleY += 9;
        } else if (rightPaddleYCenter > ballY + 35) {
            rightPaddleY -= 9;
        }
        
        /*
        if (ballX > canvWidth / 2) {
            if (rightPaddleYCenter - ballYCenter > 200) {
                rightPaddleY -= 2;
            } else if (rightPaddleYCenter - ballYCenter > 50) {
                rightPaddleY -= 5;
            } else if (rightPaddleYCenter - ballYCenter < -200) {
                rightPaddleY += 20;
            } else if (rightPaddleYCenter - ballYCenter < -50) {
                rightPaddleY += 5;
            }       

        }if (ballX <= canvWidth / 2 && ballX > 200) {
            if (rightPaddleYCenter - ballYCenter > 100) {
                rightPaddleY -= 10;
            } else if (rightPaddleYCenter - ballYCenter < -100) {
                rightPaddleY += 10;
            }
        }
        */        
    }

    //To do smart AI for right paddle
    //To do add arrow keys for right and left paddle
    //To do add score
    //To do add two players mode
    //To do add sound
    //To do add game over
    //To do add start game
    //To do add pause game
    //To do add restart game
    //To do change speed ball change !!!!!!!!!

    function gameRuning() {
        moveBall();
        aiCalculate();
        drawBackground();
        drawBall(ballX, ballY);
        drawPaddle(leftPaddleX, leftPaddleY);
        drawPaddle(rightPaddleX, rightPaddleY);        
    }

    canvas.addEventListener("mousemove", leftPaddlePosition);
    setInterval(gameRuning, 1000 / 60);

}