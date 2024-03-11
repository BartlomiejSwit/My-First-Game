function runSlideScript() {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');

    var blockSlide = new Audio('slide/sound/slide_block.mp3');
    //blockSlide.play();

    var gameInterval;

    let canvasPosition = canvas.getBoundingClientRect();

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const moveRange = 50;    

    class Block {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.canMoveBlock = false;
        }
    
        draw() {
            ctx.fillStyle = (this.canMoveBlock) ? 'red' : 'black';
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

        win() {
            return (
                this.x === 50 &&
                this.y === 150
            );
        }
    }

    class FreeSpace extends Block {
        constructor(x, y, width, height, color) {
            super(x, y, width, height, color);
        }

        draw() {
            // Nadpisuje rysowanie kwadratu, aby było pustą przestrzenią
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
    let freeSpace1 = new FreeSpace(0, 0, 50, 50, 'grey');
    let freeSpace2 = new FreeSpace(0, 0, 50, 50, 'grey');  
    
    const blocksStageOne = [];
    blocksStageOne.push(bigSquare, square1, square2, square3, square4, 
        square5, square6, square7, square8, square9, square10, 
        square11, square12, rectangle1, freeSpace1, freeSpace2);

    const blocksStageTwo = [];
    blocksStageTwo.push(square1, square2, square3, square4, square8,
        square9, square11, square12, bigSquare, rectangle1, 
        rectangle2, rectangle3, freeSpace1, freeSpace2);

    const blocksStageTree = [];
    blocksStageTree.push(square8, square9, square11, square12, bigSquare,
        rectangle1, rectangle2, rectangle3, rectangle4, rectangle5, 
        freeSpace1, freeSpace2);
        
    let currentStage = blocksStageOne;

    function selectedCheck(x, y, blocks) {
        // Sprawdzanie, czy myszka jest nad którymś z bloków
        let selectedBlock = undefined;
        blocks.forEach(block => {
            if (block.selected(x, y) === true) {
                console.log(block);
                //console.log("X: " + x + " Y: " + y);
                //console.log("blok to: " + block);
                block.canMoveBlock = true;
                selectedBlock = block;
                //console.log("Selected Block: ", selectedBlock);
            }
        });



        /*
        // Sprawdzanie, czy myszka jest nad którymś z bloków
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].selected(x, y)) {
                //isDragging = true;
                //x = spaceX - blocks[i].x;
                //y = spaceY - blocks[i].y;
                console.log(blocks[i]);
                break;
            }
        }
        
        console.log("Test: " );

        // Sprawdzanie, czy myszka jest nad którymś z bloków - pętla for
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (blocks[i].selected(x, y)) {
                console.log("For Loop - Block: ", blocks[i]);
                break;
            }
        }

        // Sprawdzanie, czy myszka jest nad którymś z bloków - pętla forEach
        blocks.forEach(block => {
            if (block.selected(x, y)) {
                console.log("ForEach Loop - Block: ", block);
            }
        });

        
        console.log("X: " + x + " Y: " + y);
        blocks.forEach(block => {
            console.log(block);
        });*/
        return selectedBlock;
    }

    
    /*
    let isDragging = false;
    let offsetX, offsetY;

    canvas.addEventListener('mousedown', function (e) {
        const mx = e.clientX - canvasPosition.left;
        const my = e.clientY - canvasPosition.top;

        // Sprawdzanie, czy myszka jest nad którymś z bloków
        let selectedBlock = selectedCheck(mx, my, currentStage);
        if (selectedBlock != undefined) {
            isDragging = true;
            offsetX = mx - selectedBlock.x;
            offsetY = my - selectedBlock.y;            
        }
    });

    canvas.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const mx = e.clientX - canvasPosition.left;
            const my = e.clientY - canvasPosition.top;
            const draggedBlock = currentStage.find(block => block.contains(mx, my));

            if (draggedBlock) {
                draggedBlock.move(mx - offsetX, my - offsetY);
                drawBlocks();
            }
        }
    });

    canvas.addEventListener('mouseup', function () {
        isDragging = false;
    });*/
    
    

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

    function drawStage(stageArray) {
        drawBackground();
        stageArray.forEach(block => block.draw());
    }

    function addKeyEventListener() {

    }

    let mousePosition = {x: 0, y: 0};
    let mouseMove = {x: 0, y: 0};
    let moveDirection = '';
    /*
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

    }*/

    
    function mouseDownEvent(event) {
        console.log("Mouse left button clicked");
        mousePosition.x = event.clientX - canvasPosition.left;
        mousePosition.y = event.clientY - canvasPosition.top
        let selectedBlock = selectedCheck(mousePosition.x, mousePosition.y, currentStage);
        console.log("mousePositionX: " + mousePosition.x);
        console.log("mousePositionY: " + mousePosition.y);
        //bigSquare.move(mousePosition.x, mousePosition.y);
        selectedBlock.move(mousePosition.x, mousePosition.y);

    }

    function mouseMoveEvent(event) {
        console.log("Mouse move");
        mouseMove.x = mousePosition.x + event.clientX - canvasPosition.left;
        mouseMove.y = mousePosition.y + event.clientY - canvasPosition.top;
        //console.log("mouseMoveX: " + mouseMove.x);
        //console.log("mouseMoveY: " + mouseMove.y);
        //bigSquare.move(mouseMove.x, mouseMove.y);

        /*
        if (event.movementX > 0) {
            console.log("Mouse move right");
            moveDirection = 'right';
            moveBlock('right');
        } else if (event.movementX < 0) {
            console.log("Mouse move left");
            moveDirection = 'left';
            moveBlock('left');
        } else if (event.movementY > 0) { 
            console.log("Mouse move down");
            moveDirection = 'down';
            moveBlock('down');
        } else if (event.movementY < 0) {
            console.log("Mouse move up");
            moveDirection = 'up';
            moveBlock('up');
        }*/
    }

    

    function mouseUpEvent(event) {
        console.log("mousePositionX: " + mousePosition.x);
        console.log("mousePositionY: " + mousePosition.y);

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
        canvas.addEventListener("mousedown", mouseDownEvent);
        canvas.addEventListener("mousemove", mouseMoveEvent);
        canvas.addEventListener("mouseup", mouseUpEvent);
        //canvas.addEventListener("mousemove", mouseEvent);
        gameInterval = setInterval(gameRuning, 1000 / 60);
        //gameRuning();
        //console.log(bigSquare.selected(50, 0));
        //selectedCheck(0, 100, blocksStageOne);
        //selectedCheck(0, 100, blocksStageTwo);
        //selectedCheck(0, 100, blocksStageTree);
        let test = selectedCheck(50, 150, blocksStageOne);
        console.log("Test: ", test);

    }

    function gameRuning() {
        //resetPositions();
        drawStage(currentStage); 
  
    }
    /*
    function moveBlock(direction) {
        if (direction === 'left' && bigSquare.x - moveRange >= 0) {
            bigSquare.x -= mouseMove.x;
        } else if (direction === 'right' && bigSquare.x + bigSquare.width + moveRange <= canvas.width) {
            bigSquare.x += mouseMove.x;
        }else if (direction === 'up' && bigSquare.y - moveRange >= 0) {
            bigSquare.y -= moveRange;
        } else if (direction === 'down' && bigSquare.y + bigSquare.height + moveRange <= canvas.height) {
            bigSquare.y += moveRange;
        }
        //drawStage(blocksStageOne);
        console.log(bigSquare.win());
        
    }*/

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
        //canvas.removeEventListener("mousemove", mouseEvent);        
    }

    startGame();

    return {stop};


}
