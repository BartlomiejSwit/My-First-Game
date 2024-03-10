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

    var gameInterval;
    let canvasPosition = canvas.getBoundingClientRect();

    class Block {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
        }
    
        draw() {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
        }

        move(x, y) {
            this.x = x;
            this.y = y;        
        }

        selected(spaceX, spaceY) {
            return (
                spaceX >= this.x &&
                spaceX <= this.x + this.width &&
                spaceY >= this.y &&
                spaceY <= this.y + this.height
            );            
        }
    }
    
    class Square extends Block {
        constructor(x, y, width, height, color) {
            super(x, y, width, height, color);
        }
    
        draw() {
            super.draw(); // Wywołanie metody draw z klasy nadrzędnej    
            // Rysowanie dodatkowych elementów kwadratu
            ctx.fillStyle = 'grey';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.height / 2);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y + this.height / 2);
            ctx.lineTo(this.x + this.width / 2, this.y);
            ctx.closePath();
            ctx.fill();
    
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    let bigSquare = new Square(0, 0, 100, 100, 'red');
    let square1 = new Block(0, 0, 50, 50, 'yellow');
    let square2 = new Block(0, 0, 50, 50, 'yellow');
    let square3 = new Block(0, 0, 50, 50, 'yellow');
    let square4 = new Block(0, 0, 50, 50, 'yellow');
    let square5 = new Block(0, 0, 50, 50, 'yellow');
    let square6 = new Block(0, 0, 50, 50, 'yellow');
    let square7 = new Block(0, 0, 50, 50, 'yellow');
    let square8 = new Block(0, 0, 50, 50, 'yellow');
    let square9 = new Block(0, 0, 50, 50, 'yellow');
    let square10 = new Block(0, 0, 50, 50, 'yellow');
    let square11 = new Block(0, 0, 50, 50, 'yellow');
    let square12 = new Block(0, 0, 50, 50, 'yellow');
    let rectangle1 = new Block(0, 0, 100, 50, 'blue');
    let rectangle2 = new Block(0, 0, 50, 100, 'blue');
    let rectangle3 = new Block(0, 0, 50, 100, 'blue');
    let rectangle4 = new Block(0, 0, 50, 100, 'blue');
    let rectangle5 = new Block(0, 0, 50, 100, 'blue');  
    let freeSpace1 = new Block(0, 0, 50, 50, 'grey');
    let freeSpace2 = new Block(0, 0, 50, 50, 'grey');  
    
    const blocks = [];
    blocks.push(bigSquare, square1, square2, square3, square4, 
        square5, square6, square7, square8, square9, square10, 
        square11, square12, rectangle1, rectangle2, rectangle3, 
        rectangle4, rectangle5, freeSpace1, freeSpace2);
        
    function selectedCheck(x, y) {
        blocks.forEach(block => {
            if (block.selected(x, y)) {
                console.log(block);
            }
        });
        console.log("X: " + x + " Y: " + y);
        blocks.forEach(block => {
            console.log(block);
        });
    }

    /*
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
    */
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

    bigSquare.x = 50, bigSquare.y = 0;

    function resetPositions() {
        bigSquare.move(50, 0);
        square1.move(0, 0);
        square2.move(150, 0);
        square3.move(0, 50);
        square4.move(150, 50);
        square5.move(0, 100);
        square6.move(150, 100);
        square7.move(0, 150);
        square8.move(50, 150);
        square9.move(100, 150);
        square10.move(150, 150);
        square11.move(0, 200);
        square12.move(150, 200);
        rectangle1.move(50, 100);
        rectangle2.move(0, 100);
        rectangle3.move(150, 100);
        rectangle4.move(0, 0);
        rectangle5.move(150, 0);
        freeSpace1.move(50, 200);
        freeSpace2.move(100, 200);

    }

    function drawStageOne() {
        drawBackground();
        bigSquare.draw();
        square1.draw();
        square2.draw();
        square3.draw();
        square4.draw();
        square5.draw();
        square6.draw();
        square7.draw();
        square8.draw();
        square9.draw();
        square10.draw();
        square11.draw();
        square12.draw();
        rectangle1.draw();
    }

    function drawStageTwo() {
        drawBackground();
        square1.draw();
        square2.draw();
        square3.draw();
        square4.draw();
        square8.draw();
        square9.draw();
        square11.draw();
        square12.draw();
        bigSquare.draw();
        rectangle1.draw();
        rectangle2.draw();
        rectangle3.draw();

    }

    function drawStageTree() {
        drawBackground();
        square8.draw();
        square9.draw();
        square11.draw();
        square12.draw();
        bigSquare.draw();
        rectangle1.draw();
        rectangle2.draw();
        rectangle3.draw();
        rectangle4.draw();
        rectangle5.draw();
    }

    function addKeyEventListener() {

    }

    let mousePosition = {x: 0, y: 0};
    let mouseMove = {x: 0, y: 0};
    let moveDirection = '';

    function mouseEvent(event) {
        //console.log(event);
        if (event.buttons === 1) {
            console.log("Mouse left button clicked");
            mousePosition.x = event.clientX - canvasPosition.left;
            mousePosition.y = event.clientY - canvasPosition.top;
            console.log("mousePositionX: " + mousePosition.x);
            console.log("mousePositionY: " + mousePosition.y);
            mouseMove.x = event.movementX;
            mouseMove.y = event.movementY;
            console.log("mouseMoveX: " + mouseMove.x);
            console.log("mouseMoveY: " + mouseMove.y);
            
            if (mouseMove.x > 0) {
                console.log("Mouse move right");
                moveDirection = 'right';
                moveBlock('right');
            } else if (mouseMove.x < 0) {
                console.log("Mouse move left");
                moveDirection = 'left';
                moveBlock('left');
            } else if (mouseMove.y > 0) { 
                console.log("Mouse move down");
                moveDirection = 'down';
                moveBlock('down');
            } else if (mouseMove.y < 0) {
                console.log("Mouse move up");
                moveDirection = 'up';
                moveBlock('up');
            }

        }
        if (event.buttons === 2) {
            console.log("Mouse right button clicked");

        }

    }


    //square12X = freeSpace2X;
    //square12Y = freeSpace2Y;

    //bigsquareX = square8X;
    //bigsquareY = square8Y;
    //resetPositions();
    //drawStageOne();
    //drawStageTwo();
    //drawStageTree();

    function startGame() {
        console.log("Game started");
        resetPositions();
        addKeyEventListener();
        canvas.addEventListener("mousemove", mouseEvent);
        gameInterval = setInterval(gameRuning, 1000 / 60);
        //gameRuning();
        console.log(bigSquare.selected(0, 0));
        selectedCheck(50, 200);

    }

    function gameRuning() {
        //resetPositions();
        drawStageOne();
        //bigSquare.draw();
        //square1.draw();
        //square2.draw();
        //rectanglePerpendicularly.draw();
        //rectanglePerpendicularly2.draw();
        //rectangleHorizontally.draw();
        //rectangleHorizontally2.draw();
  
  
    }

    function moveBlock(direction) {
        if (direction === 'left' && bigSquare.x - moveRange >= 0) {
            bigSquare.x -= moveRange;
        } else if (direction === 'right' && bigSquare.x + bigSquare.width + moveRange <= canvas.width) {
            bigSquare.x += moveRange;
        }else if (direction === 'up' && bigSquare.y - moveRange >= 0) {
            bigSquare.y -= moveRange;
        } else if (direction === 'down' && bigSquare.y + bigSquare.height + moveRange <= canvas.height) {
            bigSquare.y += moveRange;
        }
        drawStageOne();
        
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


    }

    startGame();

    return {stop};


}
