window.runSlideScript = function () {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');

    var blockSlide = new Audio('slide/sound/slide_block.mp3');

    var gameInterval;

    let canvasPosition = canvas.getBoundingClientRect();

    const canvWidth = canvas.width;
    const canvHeight = canvas.height;

    const moveRange = 50;

    let moveCounter = 0;
    let currentStage;
    let stageCounter = 0;

    class Block {
        constructor(x, y, width, height, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.blockPosition = {x: 0, y: 0};
            this.moveRight = false;
            this.moveLeft = false;
            this.moveDown = false;
            this.moveUp = false;
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

        savePosition() {
            this.blockPosition.x = this.x;
            this.blockPosition.y = this.y;
        }

        loadPosition() {
            this.x = this.blockPosition.x;
            this.y = this.blockPosition.y;
        }

        move(x, y) {
            if (x < 0) {
                x = 0;                
            } else if (x + this.width > canvWidth) {
                x = canvWidth - this.width;
            } 
            if (y < 0) {
                y = 0;
            } else if (y + this.height > canvHeight) {
                y = canvHeight - this.height;
            }
            
            if (x < this.blockPosition.x + 50 && x > this.blockPosition.x - 50 ) {
                this.x = x;
            } else {
                this.x = this.x;
            }
            if (y < this.blockPosition.y + 50 && y > this.blockPosition.y - 50) {
                this.y = y;
            } else {
                this.y = this.y;
            }
            //this.x = x;
            //this.y = y;            
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
        }

        selected(spaceX, spaceY) {     
            if (spaceX >= this.x && spaceX <= (this.x + this.width) && spaceY >= this.y && spaceY <= (this.y + this.height)) {
                return true;
            } else {
                return false;
            }
            /*
            return (
                spaceX >= this.x + 1 &&
                spaceX <= (this.x + this.width -1) &&
                spaceY >= this.y + 1 &&
                spaceY <= (this.y + this.height -1)
            );*/
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

        draw() {
            super.draw(); 
            ctx.font = '20px Arial';
            ctx.fillStyle = this.defaultColor;

            // Wyświetl numer na obiekcie
            var number = 12;
            var x = this.x + 15; // Pozycja x obiektu
            var y = this.y + 15; // Pozycja y obiektu
            ctx.fillText(number, x, y);
        }


    }
    
    class Mouse {
        constructor() {
            this.mousePosition = {x: 0, y: 0};
            this.mouseClick = {x: 0, y: 0};
            this.cursorPositionOnBlock = {x: 0, y: 0};
            this.blockPosition = {x: 0, y: 0};

        }

        cursorPositionOnBlock(selectedBlock) {
            this.cursorPositionOnBlock.x = this.mouseClick.x - selectedBlock.x;
            this.cursorPositionOnBlock.y = this.mouseClick.y - selectedBlock.y;
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
    let mouse = new Mouse();
    
    const blocksStageOne = [];
    blocksStageOne.push(square1, square2, square3, square4, square5, square6, 
        square7, square8, square9, square10, square11, square12, bigSquare, rectangle1);

    const blocksStageTwo = [];
    blocksStageTwo.push(square1, square2, square3, square4, square8,
        square9, square11, square12, bigSquare, rectangle1, 
        rectangle2, rectangle3);

    const blocksStageTree = [];
    blocksStageTree.push(square8, square9, square11, square12, bigSquare,
        rectangle1, rectangle2, rectangle3, rectangle4, rectangle5);        



    function nextStage() {
        stageCounter++;
        switch (stageCounter) {
            case 1:
                currentStage = blocksStageOne;
                break;
            case 2:
                currentStage = blocksStageTwo;
                break;
            case 3:
                currentStage = blocksStageTree;
                break;
            default:
                console.log("Nieobsługiwany przypadek.");
        }
    }

    function selectedCheck(x, y, blocks) {
        // Sprawdzanie, czy myszka jest nad którymś z bloków
        let selectedBlock = undefined;
        blocks.forEach(block => {
            if (block.selected(x, y) === true) {
                //console.log(block);
                //console.log("X: " + x + " Y: " + y);
                //console.log("blok to: " + block);
                //moveCheck(blocks, block);
                block.canMoveBlock = true;
                selectedBlock = block;
                //console.log("Selected Block: ", selectedBlock);
            }
        });
        //moveCheck(blocks, selectedBlock);
        
        return selectedBlock;
    }
    
    function moveCheck(blocks, selectMoveBlock) {
        // Resetowanie flag ruchu na true
        selectMoveBlock.moveRight = true;
        selectMoveBlock.moveLeft = true;
        selectMoveBlock.moveDown = true;
        selectMoveBlock.moveUp = true;
        blockSlide.play();
    
        // Iteracja po wszystkich blokach w celu sprawdzenia kolizji z wybranym blokiem
        blocks.forEach(block => {
            // Pomijamy sprawdzanie kolizji z samym sobą
            if (block !== selectMoveBlock) {
                // Sprawdzamy kolizję wzdłuż osi X
                if (selectMoveBlock.x + selectMoveBlock.width >= block.x &&
                    selectMoveBlock.x <= block.x + block.width) {
                    // Kolizja z prawej strony
                    if (selectMoveBlock.x + selectMoveBlock.width <= block.x + block.width &&
                        selectMoveBlock.y + selectMoveBlock.height > block.y &&
                        selectMoveBlock.y < block.y + block.height) {
                        selectMoveBlock.moveRight = false;
                    }
                    // Kolizja z lewej strony
                    if (selectMoveBlock.x >= block.x &&
                        selectMoveBlock.y + selectMoveBlock.height > block.y &&
                        selectMoveBlock.y < block.y + block.height) {
                        selectMoveBlock.moveLeft = false;
                    }
                }
                // Sprawdzamy kolizję wzdłuż osi Y
                if (selectMoveBlock.y + selectMoveBlock.height >= block.y &&
                    selectMoveBlock.y <= block.y + block.height) {
                    // Kolizja z dołu
                    if (selectMoveBlock.y + selectMoveBlock.height <= block.y + block.height &&
                        selectMoveBlock.x + selectMoveBlock.width > block.x &&
                        selectMoveBlock.x < block.x + block.width) {
                        selectMoveBlock.moveDown = false;
                    }
                    // Kolizja z góry
                    if (selectMoveBlock.y >= block.y &&
                        selectMoveBlock.x + selectMoveBlock.width > block.x &&
                        selectMoveBlock.x < block.x + block.width) {
                        selectMoveBlock.moveUp = false;
                    }
                }
            }
        });
        
        // Sprawdzanie kolizji z granicami canvas
        // Lewa granica
        if (selectMoveBlock.x <= 0) {
            selectMoveBlock.moveLeft = false;
        }
        // Górna granica
        if (selectMoveBlock.y <= 0) {
            selectMoveBlock.moveUp = false;
        }
        // Prawa granica
        if (selectMoveBlock.x + selectMoveBlock.width >= canvWidth) {
            selectMoveBlock.moveRight = false;
        }
        // Dolna granica
        if (selectMoveBlock.y + selectMoveBlock.height >= canvHeight) {
            selectMoveBlock.moveDown = false;
        }
    }

/*     function moveCheck(blocks1, selectMoveBlock1) {
        // Sprawdzanie, czy blok może się poruszać
        let moveDirection = "";
        blocks1.forEach(block => {
            if (block.selected(selectMoveBlock1.x + selectMoveBlock1.width + moveRange, selectMoveBlock1.y) == false) {
                selectMoveBlock1.moveRight = true;
                console.log("Move right: ", selectMoveBlock1.moveRight);
                //moveDirection = "right";
            } else {
                selectMoveBlock1.moveRight = false;
            }
            if (block.selected(selectMoveBlock1.x - moveRange, selectMoveBlock1.y) == false) {
                selectMoveBlock1.moveLeft = true;
                console.log("Move left: ", selectMoveBlock1.moveLeft);
                //moveDirection = "left";
            } else {
                selectMoveBlock1.moveLeft = false;
            }
            if (block.selected(selectMoveBlock1.x, selectMoveBlock1.y + selectMoveBlock1.height + moveRange) == false) {
                selectMoveBlock1.moveDown = true;
                console.log("Move down: ", selectMoveBlock1.moveDown);
                //moveDirection = "down";
            } else {
                selectMoveBlock1.moveDown = false;
            }
            if (block.selected(selectMoveBlock1.x, selectMoveBlock1.y - moveRange) == false) {
                selectMoveBlock1.moveUp = true;
                console.log("Move up: ", selectMoveBlock1.moveUp);
                //moveDirection = "up";
            } else {
                selectMoveBlock1.moveUp = false;
            }
        });
        //return moveDirection;

    } */

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
        bigSquare.setPosition(50, 0);
        square1.setPosition(0, 0);
        square2.setPosition(150, 0);
        square3.setPosition(0, 50);
        square4.setPosition(150, 50);
        square5.setPosition(0, 100);
        square6.setPosition(150, 100);
        square7.setPosition(0, 150);
        square8.setPosition(50, 150);
        square9.setPosition(100, 150);
        square10.setPosition(150, 150);
        square11.setPosition(0, 200);
        square12.setPosition(150, 200);
        rectangle1.setPosition(50, 100);
        rectangle2.setPosition(0, 100);
        rectangle3.setPosition(150, 100);
        rectangle4.setPosition(0, 0);
        rectangle5.setPosition(150, 0);
        freeSpace1.setPosition(50, 200);
        freeSpace2.setPosition(100, 200);
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

    let switchCasesBlock;
    let switchCasesMovement;
    let selectedBlock;
    let selectedFreeSpace1;
    let selectedFreeSpace2;

    function checkSelectionEvent(params) {
        if (params != undefined) {
            console.log("Selected block: ", selectedBlock);
            return true;
        } else {
            console.log("No block selected");
            return false;
        }
    }

    function mouseRangeCheck(blockSlelected) {
        if (mousePosition.x < 0 && blockSlelected.canMoveBlock === true) {
            mousePosition.x = 0;
            blockSlelected.loadPosition();
            //blockSlelected.move(blockPosition.x, blockPosition.y);
            blockSlelected.canMoveBlock = false;
        } else if (mousePosition.x > canvWidth && blockSlelected.canMoveBlock === true) {
            mousePosition.x = canvWidth;
            blockSlelected.loadPosition();
            //blockSlelected.move(blockPosition.x, blockPosition.y);
            blockSlelected.canMoveBlock = false;
        } else if (mousePosition.y < 0 && blockSlelected.canMoveBlock === true) {
            mousePosition.y = 0;
            blockSlelected.loadPosition();
            //blockSlelected.move(blockPosition.x, blockPosition.y);
            blockSlelected.canMoveBlock = false;
        } else if (mousePosition.y > canvHeight && blockSlelected.canMoveBlock === true) {
            mousePosition.y = canvHeight;
            blockSlelected.loadPosition();
            //blockSlelected.move(blockPosition.x, blockPosition.y);
            blockSlelected.canMoveBlock = false;
        }
    }

    function mouseDownEvent(event) {
        //console.log("Mouse left button clicked");
        selectedBlock = selectedCheck(mousePosition.x, mousePosition.y, currentStage);
        moveCheck(currentStage, selectedBlock);
        //console.log("Selected block move: ", selectedBlock);    
        //let testy = moveCheck(selectedBlock, currentStage);
        //console.log("Selected block move: ", testy);
        if (checkSelectionEvent(selectedBlock)){
            mouseClick.x = event.clientX - canvasPosition.left;
            mouseClick.y = event.clientY - canvasPosition.top;
            //console.log("mouseClickX: " + mouseClick.x);
            //console.log("mouseClickY: " + mouseClick.y);
            cursorPositionOnBlock.x = mouseClick.x - selectedBlock.x;
            cursorPositionOnBlock.y = mouseClick.y - selectedBlock.y;
            //console.log("cursorPositionX: " + cursorPositionOnBlock.x);
            //console.log("cursorPositionY: " + cursorPositionOnBlock.y);
            selectedBlock.savePosition();
            //blockPosition.x = selectedBlock.x;
            //blockPosition.y = selectedBlock.y;
        }

    }

    function mouseMoveEvent(event) {
        console.log("Mouse move");
        if (event.movementX > 0) {
            switchCasesMovement = "right";
        } else if (event.movementX < 0) {
            switchCasesMovement = "left";
        } else if (event.movementY > 0) {
            switchCasesMovement = "down";
        } else if (event.movementY < 0) {
            switchCasesMovement = "up";
        }
        mousePosition.x = event.clientX - canvasPosition.left;
        mousePosition.y = event.clientY - canvasPosition.top 
        if (checkSelectionEvent(selectedBlock) && selectedBlock.canMoveBlock === true) {
            mouseRangeCheck(selectedBlock);
            let moveBlockRight = selectedBlock.x + selectedBlock.width + 3;
            let moveBlockLeft = selectedBlock.x - 3;
            let moveBlockDown = selectedBlock.y + selectedBlock.height + 3;
            let moveBlockUp = selectedBlock.y - 3;

            switch (switchCasesMovement) {
                case "right": {
                    if (selectedBlock.moveRight === true) {
                    selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                    }
                    break;
                }
                case "left": {
                    if (selectedBlock.moveLeft === true) {
                    selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                    }
                    break;
                }
                case "down": {
                    if (selectedBlock.moveDown === true) {
                    selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                    }
                    break;
                }
                case "up": {
                    if (selectedBlock.moveUp === true) {
                    selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                    }
                    break;
                }
                default:
                    console.log("Nieobsługiwany przypadek.");
            }
        }
        
    }

    function mouseUpEvent(event) {
        console.log("Mouse left button released");
        selectedBlock.canMoveBlock = false;
        selectedBlock.positioning();
        selectedBlock.savePosition();
        moveCounter++;
        gameWinStage();

    }


    /*
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
            //console.log("mouseClickX: " + mouseClick.x);
            //console.log("mouseClickY: " + mouseClick.y);
            cursorPositionOnBlock.x = mouseClick.x - selectedBlock.x;
            cursorPositionOnBlock.y = mouseClick.y - selectedBlock.y;
            //console.log("cursorPositionX: " + cursorPositionOnBlock.x);
            //console.log("cursorPositionY: " + cursorPositionOnBlock.y);
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

        if (checkSelectionEvent(selectedBlock) && selectedBlock.canMoveBlock === true) {
            mouseRangeCheck(selectedBlock);
            let moveBlockRight = selectedBlock.x + selectedBlock.width + 3;
            let moveBlockLeft = selectedBlock.x - 3;
            let moveBlockDown = selectedBlock.y + selectedBlock.height + 3;
            let moveBlockUp = selectedBlock.y - 3;
            
            
            if (selectedBlock.width > moveRange && selectedBlock.height > moveRange) {
                switchCasesBlock = 1;
            } else if (selectedBlock.width > moveRange && selectedBlock.height <= moveRange) {
                switchCasesBlock = 2;
            } else if (selectedBlock.width <= moveRange && selectedBlock.height > moveRange) {
                switchCasesBlock = 3;
            } else {
                switchCasesBlock = 4;
            }
            
            if (event.movementX > 0) {
                switchCasesMovement = "right";
            } else if (event.movementX < 0) {
                switchCasesMovement = "left";
            } else if (event.movementY > 0) {
                switchCasesMovement = "down";
            } else if (event.movementY < 0) {
                switchCasesMovement = "up";
            }

            let blueBlock1 = {x: 0, y: 0}, blueBlock2 = {x: 0, y: 0};
            blueBlock1.x = selectedBlock.x;
            blueBlock1.y = selectedBlock.y;
            blueBlock2.x = selectedBlock.x + (selectedBlock.width - moveRange);
            blueBlock2.y = selectedBlock.y + (selectedBlock.height - moveRange);

            switch (switchCasesBlock) {
                case 1: {

                    break;
                }

                case 2: {

                    break;
                }

                case 3: {

                    switch (switchCasesMovement) {
                        case "right": {
                            console.log("Mouse move right");
                            if (freeSpace1.selected(moveBlockRight, blueBlock1.y + 2) && freeSpace2.selected(moveBlockRight, selectedBlock.y + 52)) {    
                                selectedFreeSpace1 = freeSpace1;
                                selectedFreeSpace2 = freeSpace2;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                            } else if (freeSpace2.selected(moveBlockRight, blueBlock1.y + 2) && freeSpace1.selected(moveBlockRight, selectedBlock.y + 52)) {
                                selectedFreeSpace1 = freeSpace2;
                                selectedFreeSpace2 = freeSpace1;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                            }
                            break;        
                        }
                        case "left": {
                            console.log("Mouse move left");
                            if (freeSpace1.selected(moveBlockLeft, blueBlock1.y + 2) && freeSpace2.selected(moveBlockLeft, selectedBlock.y + 52)) {    
                                selectedFreeSpace1 = freeSpace1;
                                selectedFreeSpace2 = freeSpace2;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                            } else if (freeSpace2.selected(moveBlockLeft, blueBlock1.y + 2) && freeSpace1.selected(moveBlockLeft, selectedBlock.y + 52)) {
                                selectedFreeSpace1 = freeSpace2;
                                selectedFreeSpace2 = freeSpace1;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                            }
                            break;
                        }
                        case "down": {
                            console.log("Mouse move down");             
                            if (freeSpace1.selected(selectedBlock.x + 2, moveBlockDown)) {     
                                selectedFreeSpace1 = freeSpace1;
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            } else if (freeSpace2.selected(selectedBlock.x + 2, moveBlockDown)) {
                                selectedFreeSpace1 = freeSpace2;
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            } 
                            break;
                        }
                        case "up": {
                            console.log("Mouse move up");                        
                            if (freeSpace1.selected(selectedBlock.x + 2, moveBlockUp)) {
                                selectedFreeSpace1 = freeSpace1;
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            } else if (freeSpace2.selected(selectedBlock.x + 2, moveBlockUp)) {
                                selectedFreeSpace1 = freeSpace2;                            
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            }
                            break;
                        }
                        default:
                            console.log("Nieobsługiwany przypadek.");
                    }
                    break;
                }

                case 4: {
                    switch (switchCasesMovement) {
                        case "right": {
                            console.log("Mouse move right");                        
                            if (freeSpace1.selected(moveBlockRight, selectedBlock.y + 2)) {
                                selectedFreeSpace1 = freeSpace1;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);   
                                console.log("Selected Free Space: ", selectedFreeSpace1);                         
                            } else if (freeSpace2.selected(moveBlockRight, selectedBlock.y + 2)) {
                                selectedFreeSpace1 = freeSpace2;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                                console.log("Selected Free Space: ", selectedFreeSpace1);
                            }
                            break;
                        }
                        case "left": {
                            console.log("Mouse move left");                        
                            if (freeSpace1.selected(moveBlockLeft, selectedBlock.y + 2)) {
                                selectedFreeSpace1 = freeSpace1;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                                console.log("Selected Free Space: ", selectedFreeSpace1);
                            } else if (freeSpace2.selected(moveBlockLeft, selectedBlock.y + 2)) {
                                selectedFreeSpace1 = freeSpace2;
                                selectedBlock.move(mousePosition.x - cursorPositionOnBlock.x, selectedBlock.y);
                                console.log("Selected Free Space: ", selectedFreeSpace1);
                            }
                            break;
                        }
                        case "down": {
                            console.log("Mouse move down");                        
                            if (freeSpace1.selected(selectedBlock.x + 2, moveBlockDown)) {     
                                selectedFreeSpace1 = freeSpace1;
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            } else if (freeSpace2.selected(selectedBlock.x + 2, moveBlockDown)) {
                                selectedFreeSpace1 = freeSpace2;
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            }   
                            break;
                        }
                        case "up": {
                            console.log("Mouse move up");                        
                            if (freeSpace1.selected(selectedBlock.x + 2, moveBlockUp)) {
                                selectedFreeSpace1 = freeSpace1;
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            } else if (freeSpace2.selected(selectedBlock.x + 2, moveBlockUp)) {
                                selectedFreeSpace1 = freeSpace2;                            
                                selectedBlock.move(selectedBlock.x, mousePosition.y - cursorPositionOnBlock.y);
                            }
                            break;
                        }
                        default:
                            console.log("Nieobsługiwany przypadek.");
                    }
                    break;
                }
                default:
                    console.log("Nieobsługiwany przypadek.");
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
                switch (switchCasesBlock) {
                    case 1: {
    
                        break;
                    }
    
                    case 2: {
    
                        break;
                    }
    
                    case 3: {

                        switch (switchCasesMovement) {
                            case "right": {

                                break;
                            }
                            case "left": {

                                break;
                            }
                            case "down": {
                                if (selectedBlock.x === selectedFreeSpace1.x && selectedBlock.y + 50 === selectedFreeSpace1.y || 
                                    selectedBlock.x === selectedFreeSpace1.x && selectedBlock.y === selectedFreeSpace1.y) { 
                                        selectedFreeSpace1.setPosition(blockPosition.x, blockPosition.y);
                                } else {
                                    selectedBlock.setPosition(blockPosition.x, blockPosition.y);
                                }
  
                                break;
                            }
                            case "up": {
                                if (selectedBlock.x === selectedFreeSpace1.x && selectedBlock.y + 50 === selectedFreeSpace1.y || 
                                    selectedBlock.x === selectedFreeSpace1.x && selectedBlock.y === selectedFreeSpace1.y) { 
                                        selectedFreeSpace1.setPosition(blockPosition.x, blockPosition.y + 50);
                                } else {
                                    selectedBlock.setPosition(blockPosition.x, blockPosition.y);
                                }

                                break;
                            }
                            default:
                                console.log("Nieobsługiwany przypadek.");
                        }    
                        break;
                    }
    
                    case 4: {    
                        //selectedFreeSpace.setPosition(blockPosition.x, blockPosition.y);
                        
                        if (selectedBlock.x === selectedFreeSpace1.x && selectedBlock.y === selectedFreeSpace1.y) { 
                            selectedFreeSpace1.setPosition(blockPosition.x, blockPosition.y);
                        } else {
                            selectedBlock.setPosition(blockPosition.x, blockPosition.y);
                        }    
                        break;
                    }
                    default:
                        console.log("Nieobsługiwany przypadek.");
                }
            }



            moveCounter++;
            //bigSquare.win();
            console.log("Win: ", bigSquare.win());
            console.log("Move Counter: ", moveCounter);


        }

    }
    */  

    function startGame() {
        console.log("Game started");
        resetPositions();
        addKeyEventListener();
        nextStage();
        canvas.addEventListener("mousedown", mouseDownEvent);
        canvas.addEventListener("mousemove", mouseMoveEvent);
        canvas.addEventListener("mouseup", mouseUpEvent);
        //canvas.addEventListener("mousemove", mouseEvent);
        gameInterval = setInterval(gameRuning, 1000 / 60);
        //gameRuning();
        //console.log(bigSquare.selected(50, 0));
        //let test = selectedCheck(50, 150, blocksStageOne);
        //console.log("Test: ", test);
    }

    function gameWinStage() {
        if (bigSquare.win() === true) {
            resetPositions();
            nextStage();
        }
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
    //TODO poprawić błędy związane z ruchem bloków
    //TODO rozdzielić gre i canvas - ustawić obszar gry na środku canvas
    //TODO dodać timer i licznik ruchów
    //TODO wywalić info z konsoli!!!

    startGame();

    return {stop};
}


