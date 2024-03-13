function runSlideScript() {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');

    var blockSlide = new Audio('slide/sound/slide_block.mp3');

    var gameInterval;

    let canvasPosition = canvas.getBoundingClientRect();

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const moveRange = 50;

    let moveCounter = 0;

    class Block {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.canMoveBlock = false;
            this.selectedColorBorder = 'red';
            this.selectedColorBlock = '#4CAF50';
            this.defaultColor = 'black';
        }
    
        draw() {
            ctx.fillStyle = (this.canMoveBlock) ?  this.selectedColorBorder : this.defaultColor;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = (this.canMoveBlock) ? this.selectedColorBlock : this.color;
            ctx.fillRect(this.x + 1, this.y + 1, this.width - 2, this.height - 2);
        }

        move(x, y) {
            if (x < 0) {
                x = 0;
            } else if (x + this.width > canvWidth) {
                x = canvWidth - this.width;
            } else if (y < 0) {
                y = 0;
            } else if (y + this.height > canvHeight) {
                y = canvHeight - this.height;
            }
            this.x = x;
            this.y = y;
        }

        selected(spaceX, spaceY) {            
            return (
                spaceX >= this.x + 1 &&
                spaceX <= this.x + this.width -1 &&
                spaceY >= this.y + 1 &&
                spaceY <= this.y + this.height -1
            );  
        }

        positioning() {
            this.x = Math.round(this.x / 50) * 50;
            this.y = Math.round(this.y / 50) * 50;
        }
    }
    
    class Square extends Block {
        constructor(x, y, width, height, color) {
            super(x, y, width, height, color);
            this.fillColor = 'grey';
        }
    
        draw() {
            super.draw(); // Wywołanie metody draw z klasy nadrzędnej    
            // Rysowanie dodatkowych elementów kwadratu
            ctx.fillStyle = this.fillColor;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + this.height / 2);
            ctx.lineTo(this.x + this.width / 2, this.y + this.height);
            ctx.lineTo(this.x + this.width, this.y + this.height / 2);
            ctx.lineTo(this.x + this.width / 2, this.y);
            ctx.closePath();
            ctx.fill();
    
            ctx.fillStyle = (this.canMoveBlock) ? this.selectedColorBlock : this.color;
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
        /*

        draw() {
            // Nadpisuje rysowanie kwadratu, aby było pustą przestrzenią
        }*/

    }

    class Mouse {
        constructor(x, y) {
            this.x = x;
            this.y = y;
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
    let mouseClick = {x: 0, y: 0};
    let cursorPositionOnBlock = {x: 0, y: 0};
    let blockPosition = {x: 0, y: 0};

    let selectedBlock 

    function checkSelectionEvent(params) {
        if (params != undefined) {
            console.log("Selected block: ", selectedBlock);
            return true;
        } else {
            console.log("No block selected");
            return false;
        }
    }

    function mouseRangeCheck() {
        if (mousePosition.x < 0) {
            mousePosition.x = 0;
        } else if (mousePosition.x > canvWidth) {
            mousePosition.x = canvWidth;
        }
        if (mousePosition.y < 0) {
            mousePosition.y = 0;
        } else if (mousePosition.y > canvHeight) {
            mousePosition.y = canvHeight;
        }
    }
    
    function mouseDownEvent(event) {        
        console.log("Mouse left button clicked");
        //mousePosition.x = event.clientX - canvasPosition.left;
        //mousePosition.y = event.clientY - canvasPosition.top
        selectedBlock = selectedCheck(mousePosition.x, mousePosition.y, currentStage);
        //console.log("mousePositionX: " + mousePosition.x);
        //console.log("mousePositionY: " + mousePosition.y);
        //bigSquare.move(mousePosition.x, mousePosition.y);
        //selectedBlock.move(mousePosition.x, mousePosition.y);
        if (checkSelectionEvent(selectedBlock)){
            mouseClick.x = event.clientX - canvasPosition.left;
            mouseClick.y = event.clientY - canvasPosition.top;
            console.log("mouseClickX: " + mouseClick.x);
            console.log("mouseClickY: " + mouseClick.y);
            cursorPositionOnBlock.x = mouseClick.x - selectedBlock.x;
            cursorPositionOnBlock.y = mouseClick.y - selectedBlock.y;
            console.log("cursorPositionX: " + cursorPositionOnBlock.x);
            console.log("cursorPositionY: " + cursorPositionOnBlock.y);
            blockPosition.x = selectedBlock.x;
            blockPosition.y = selectedBlock.y;
        }
    }

    function mouseMoveEvent(event) {
        console.log("Mouse move");
        //mouseMove.x = mousePosition.x + event.clientX - canvasPosition.left;
        //mouseMove.y = mousePosition.y + event.clientY - canvasPosition.top;
        //console.log("mouseMoveX: " + mouseMove.x);
        //console.log("mouseMoveY: " + mouseMove.y);
        //bigSquare.move(mouseMove.x, mouseMove.y);
        mousePosition.x = event.clientX - canvasPosition.left;
        mousePosition.y = event.clientY - canvasPosition.top
        mouseRangeCheck();
        /*
        if (mousePosition.x < 0) {
            mousePosition.x = 0;
        } else if (mousePosition.x > canvWidth) {
            mousePosition.x = canvWidth;
        } else if (mousePosition.y < 0) {
            mousePosition.y = 0;
        } else if (mousePosition.y > canvHeight) {
            mousePosition.y = canvHeight;
        }*/

        if (checkSelectionEvent(selectedBlock) && selectedBlock.canMoveBlock === true) {
            let moveBlockRight = selectedBlock.x + selectedBlock.width + 15;
            let moveBlockLeft = selectedBlock.x - 15;
            let moveBlockDown = selectedBlock.y + selectedBlock.height + 15;
            let moveBlockUp = selectedBlock.y - 15;
            
            let switchCases;
            if (selectedBlock.width > 50 && selectedBlock.height > 50) {
                switchCases === 1;
            } else if (selectedBlock.width > 50 && selectedBlock.height <= 50) {
                switchCases === 2;
            } else if (selectedBlock.width <= 50 && selectedBlock.height > 50) {
                switchCases === 3;
            } else {
                switchCases === 4;
            }

            switch (switchCases) {
                case 1:


                case 2:


                case 3:


                case 4:


            }
            
            if (event.movementX > 0) {
                if (freeSpace1.selected(moveBlockRight, selectedBlock.y + 15) || freeSpace2.selected(moveBlockRight, selectedBlock.y + 15)) {
                    blockSlide.play();
                    console.log("Mouse move right");
                    selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                }

            } else if (event.movementX < 0) {
                if (freeSpace1.selected(moveBlockLeft, selectedBlock.y + 15) || freeSpace2.selected(moveBlockLeft, selectedBlock.y + 15)) {
                    blockSlide.play();
                    console.log("Mouse move left");
                    selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                }


            } else if (event.movementY > 0) {        
                if (freeSpace1.selected(selectedBlock.x + 15, moveBlockDown) || freeSpace2.selected(selectedBlock.x + 15, moveBlockDown)) {         
                    blockSlide.play(); 
                    console.log("Mouse move down");
                    selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                }

            } else if (event.movementY < 0) {
                if (freeSpace1.selected(selectedBlock.x + 15, moveBlockUp) || freeSpace2.selected(selectedBlock.x + 15, moveBlockUp)) {
                    blockSlide.play();
                    console.log("Mouse move up");
                    selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                }

            }
        }
    }

    

    function mouseUpEvent(event) {
        if (checkSelectionEvent(selectedBlock)){
            console.log("mousePositionX: " + mousePosition.x);
            console.log("mousePositionY: " + mousePosition.y);            
            selectedBlock.canMoveBlock = false;
            selectedBlock.positioning();
            if (blockPosition.x !== selectedBlock.x || blockPosition.y !== selectedBlock.y) {
                if (selectedBlock.width > 50) {
                    //freeSpace1.move(blockPosition.x, blockPosition.y);
                    freeSpace2.move(blockPosition.x + 50, blockPosition.y);
                } else if (selectedBlock.height > 50) {
                    //freeSpace1.move(blockPosition.x, blockPosition.y);
                    freeSpace2.move(blockPosition.x, blockPosition.y + 50);
                } else {
                    //freeSpace1.move(blockPosition.x, blockPosition.y);
                    freeSpace2.move(blockPosition.x, blockPosition.y);
                }
                
            }
            moveCounter++;
            //bigSquare.win();
            console.log("Win: ", bigSquare.win());
            console.log("Move Counter: ", moveCounter);
        }

    }
/*
    function freeSpaceMove(block, direction) {
        freeSpace1.move(50, 200);
        freeSpace2.move(100, 200);
    }
*/

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
        //let test = selectedCheck(50, 150, blocksStageOne);
        //console.log("Test: ", test);

    }

    function gameRuning() {
        //resetPositions();
        drawStage(currentStage); 
  
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
        canvas.removeEventListener("mousedown", mouseDownEvent);
        canvas.removeEventListener("mouseup", mouseUpEvent);
        canvas.removeEventListener("mousemove", mouseMoveEvent);       
    }

    startGame();

    return {stop};


}
