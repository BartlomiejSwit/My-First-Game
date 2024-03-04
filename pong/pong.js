function runPongScript() {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvWidth, canvHeight);
    }

    const bollSize = 20;
    let bollX = canvWidth / 2 - bollSize / 2;
    let bollY = canvHeight / 2 - bollSize / 2;

    function drawBoll() {
        ctx.fillStyle = 'red';
        ctx.fillRect(bollX, bollY, bollSize, bollSize);
    }

    const paddleHeight = 100;
    const paddleWidth = 20;

    const leftPaddleX = 20;
    const rightPaddleX = canvWidth - 40;

    let leftPaddleY = canvHeight / 2 - paddleHeight / 2;
    let rightPaddleY = canvHeight / 2 - paddleHeight / 2;



    drawBackground();
    drawBoll();



}