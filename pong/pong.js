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

    function drawBall() {
        ctx.fillStyle = 'red';
        ctx.fillRect(ballX, ballY, ballSize, ballSize);

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY < 0 + ballSize) {
            ballSpeedY = -ballSpeedY;
        }

        if (ballY > canvHeight - ballSize) {
            ballSpeedY = -ballSpeedY;
        }
    }

    const paddleHeight = 100;
    const paddleWidth = 20;

    const leftPaddleX = 20;
    const rightPaddleX = canvWidth - 40;

    let leftPaddleY = canvHeight / 2 - paddleHeight / 2;
    let rightPaddleY = canvHeight / 2 - paddleHeight / 2;

    function drawPaddle(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x, y, paddleWidth, paddleHeight);
    }

    function gameRuning() {
        //drawEverything();
        //moveEverything();
        drawBackground();
        drawBall();
        drawPaddle(leftPaddleX, leftPaddleY);
        drawPaddle(rightPaddleX, rightPaddleY);
    }

    function moveEverything() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballX < 0) {
            if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else {
                ballReset();
            }
        }

        if (ballX > canvWidth) {
            if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else {
                ballReset();
            }
        }

        if (ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }

        if (ballY > canvHeight) {
            ballSpeedY = -ballSpeedY;
        }
    }


    setInterval(gameRuning, 1000 / 60);




}