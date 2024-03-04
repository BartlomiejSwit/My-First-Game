/*function runSlideScript() {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');

    const block = {
        x: 200,
        y: 350,
        width: 50,
        height: 50,
        speed: 5,
        isDragging: false
    };

    function drawBlock() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(block.x, block.y, block.width, block.height);
    }

    function moveBlock(direction) {
        if (direction === 'left' && block.x - block.speed >= 0) {
            block.x -= block.speed;
        } else if (direction === 'right' && block.x + block.width + block.speed <= canvas.width) {
            block.x += block.speed;
        }else if (direction === 'up' && block.x + block.width + block.speed <= canvas.width) {
            block.x += block.speed;
        } else if (direction === 'down' && block.x - block.width + block.speed <= canvas.width) {
            block.x -= block.speed;
        }
        drawBlock();
    }

    function handleMouseDown(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        if (
            mouseX >= block.x &&
            mouseX <= block.x + block.width &&
            mouseY >= block.y &&
            mouseY <= block.y + block.height
        ) {
            block.isDragging = true;
        }
    }

    function handleMouseMove(event) {
        if (block.isDragging) {
            const mouseX = event.clientX - canvas.getBoundingClientRect().left;
            block.x = mouseX - block.width / 2;
            drawBlock();
        }
    }

    function handleMouseUp() {
        block.isDragging = false;
    }

    window.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowLeft') {
            moveBlock('left');
        } else if (event.code === 'ArrowRight') {
            moveBlock('right');
        }
    });

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    drawBlock();
}*/
function runSlideScript() {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');
    
    const square = {
        width: 50,
        height: 50
    };

    const squarebIG = {
        width: 100,
        height: 100,
    };

    const rectangle = {
        width: 50,
        height: 100
    };

    function drawSquare(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x, y, square.width, square.height);
    }

    function drawBigSquare(x, y) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x, y, squarebIG.width, squarebIG.height);
    }

    function drawRectangle(x, y) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, rectangle.width, rectangle.height);
    }

    function drawBackground() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'gray';
        ctx.fillRect(50, 150, 100, 100);

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(50, 200);
        ctx.lineTo(100, 150);
        ctx.lineTo(150, 200);
        ctx.lineTo(100, 250);
        ctx.closePath();
        ctx.fill();
    

    }

    drawBackground();
    drawSquare(0,0);
    drawBigSquare(50,0);
    drawRectangle(0,50);


}
