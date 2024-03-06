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

    const rectanglePerpendicularly = {
        width: 50,
        height: 100
    };

    const rectangleHorizontally = {
        width: 100,
        height: 50
    };
    

    function drawSquare(x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, square.width, square.height);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x + 1, y + 1, square.width - 2, square.height - 2);

    }

    function drawBigSquare(x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, squarebIG.width, squarebIG.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(x + 1, y + 1, squarebIG.width - 2, squarebIG.height - 2);
        ctx.fillStyle = 'grey';
        ctx.beginPath(x, y);
        ctx.moveTo(x, y + 50);
        ctx.lineTo(x + 50, y + 100);
        ctx.lineTo(x + 100, y + 50);
        ctx.lineTo(x + 50, y);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'red';
        ctx.beginPath(x, y);
        ctx.arc(x + 50, y + 50, 25, 0, 2 * Math.PI);
        ctx.fill();

    }

    function drawRectanglePerpendicularly(x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, rectanglePerpendicularly.width, rectanglePerpendicularly.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(x + 1, y + 1, rectanglePerpendicularly.width - 2, rectanglePerpendicularly.height - 2);
    }

    function drawRectangleHorizontally(x, y) {
        ctx.fillStyle = 'black';        
        ctx.fillRect(x, y, rectangleHorizontally.width, rectangleHorizontally.height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(x + 1, y + 1, rectangleHorizontally.width - 2, rectangleHorizontally.height - 2);        
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

        ctx.fillStyle = 'grey';
        ctx.beginPath();
        ctx.arc(100, 200, 25, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const moveRange = 50;

    let bigsquareX, bigsquareY;
    let square1X, square1Y;
    let square2X, square2Y;
    let square3X, square3Y;
    let square4X, square4Y;
    let square5X, square5Y;
    let square6X, square6Y;
    let square7X, square7Y;
    let square8X, square8Y;
    let square9X, square9Y;
    let square10X, square10Y;
    let square11X, square11Y;
    let square12X, square12Y;
    let rectangle1X, rectangle1Y;
    let rectangle2X, rectangle2Y;
    let rectangle3X, rectangle3Y;
    let rectangle4X, rectangle4Y;
    let rectangle5X, rectangle5Y;
    let freeSpace1X, freeSpace1Y;
    let freeSpace2X, freeSpace2Y;
    
    function resetPositions() {
        bigsquareX = 50, bigsquareY = 0;
        square1X = 0, square1Y = 0;
        square2X = 150, square2Y = 0;
        square3X = 0, square3Y = 50;
        square4X = 150, square4Y = 50;
        square5X = 0, square5Y = 100;
        square6X = 150, square6Y = 100;
        square7X = 0, square7Y = 150;
        square8X = 50, square8Y = 150;
        square9X = 100, square9Y = 150;
        square10X = 150, square10Y = 150;
        square11X = 0, square11Y = 200;
        square12X = 150, square12Y = 200;
        rectangle1X = 50, rectangle1Y = 100;
        rectangle2X = 0, rectangle2Y = 100;
        rectangle3X = 150, rectangle3Y = 100;
        rectangle4X = 0, rectangle4Y = 0;
        rectangle5X = 150, rectangle5Y = 0;
        freeSpace1X = 50, freeSpace1Y = 200;
        freeSpace2X = 100, freeSpace2Y = 200;
    }

    function drawStageOne() {
        drawBackground();
        drawSquare(square1X,square1Y);
        drawSquare(square2X,square2Y);
        drawSquare(square3X,square3Y);
        drawSquare(square4X,square4Y);
        drawSquare(square5X,square5Y);
        drawSquare(square6X,square6Y);
        drawSquare(square7X,square7Y);
        drawSquare(square8X,square8Y);
        drawSquare(square9X,square9Y);
        drawSquare(square10X,square10Y);
        drawSquare(square11X,square11Y);
        drawSquare(square12X,square12Y);
        drawBigSquare(bigsquareX,bigsquareY);
        drawRectangleHorizontally(rectangle1X,rectangle1Y);
    }

    function drawStageTwo() {
        drawBackground();
        drawSquare(square1X,square1Y);
        drawSquare(square2X,square2Y);
        drawSquare(square3X,square3Y);
        drawSquare(square4X,square4Y);
        drawSquare(square8X,square8Y);
        drawSquare(square9X,square9Y);
        drawSquare(square11X,square11Y);
        drawSquare(square12X,square12Y);
        drawBigSquare(bigsquareX,bigsquareY);
        drawRectangleHorizontally(rectangle1X,rectangle1Y);
        drawRectanglePerpendicularly(rectangle2X,rectangle2Y);
        drawRectanglePerpendicularly(rectangle3X,rectangle3Y);

    }

    function drawStageTree() {
        drawBackground();
        drawSquare(square8X,square8Y);
        drawSquare(square9X,square9Y);
        drawSquare(square11X,square11Y);
        drawSquare(square12X,square12Y);
        drawBigSquare(bigsquareX,bigsquareY);
        drawRectangleHorizontally(rectangle1X,rectangle1Y);
        drawRectanglePerpendicularly(rectangle2X,rectangle2Y);
        drawRectanglePerpendicularly(rectangle3X,rectangle3Y);
        drawRectanglePerpendicularly(rectangle4X,rectangle4Y);
        drawRectanglePerpendicularly(rectangle5X,rectangle5Y);
    }

    square12X = freeSpace2X;
    square12Y = freeSpace2Y;

    //bigsquareX = square8X;
    //bigsquareY = square8Y;
    resetPositions();
    drawStageOne();
    //drawStageTwo();
    //drawStageTree();


}
