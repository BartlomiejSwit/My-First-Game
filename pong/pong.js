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

    let ballSpeedX = 3;
    let ballSpeedY = 3;

    function drawBall(x, y) {
        //ctx.fillStyle = 'yellow';
        //ctx.fillRect(x, y, ballSize, ballSize);
        ctx.fillStyle = 'red';
        ctx.beginPath(x, y);
        ctx.arc(x + 10, y + 10, 10, 0, 2 * Math.PI);
        ctx.fill();

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY <= 0  || ballY >= canvHeight - ballSize) {
            ballSpeedY = -ballSpeedY;
        }

        if (ballX <= 0 || ballX >= canvWidth - ballSize) {
            ballSpeedX = -ballSpeedX;
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
        drawBall(ballX, ballY);
        drawPaddle(leftPaddleX, leftPaddleY);
        drawPaddle(rightPaddleX, rightPaddleY);
    }

    window.addEventListener("click", 
    function () {
        console.log("click");
    });

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
    }



    canvas.addEventListener("mousemove", leftPaddlePosition);
       
 

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