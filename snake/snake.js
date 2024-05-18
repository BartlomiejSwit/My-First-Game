
function runSnakeScript() {
   // const ctx = document.getElementById('snakeCanvas').getContext('2d');
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    
    let points, snake, running, apple, move, nextmove, canMove, blink = false, itemSize = 18;
    var gameInterval;
    var appleInterval;


    function randomFrame() {
        if (canMove) {
            if (nextmove.x !== -move.x || nextmove.y !== -move.y) {
                move = nextmove;
            }
            snake.push({x: processBound(getHead().x + move.x), y: processBound(getHead().y + move.y)});
            if (snake.filter(square => square.x === getHead().x && square.y === getHead().y).length >= 2) {
                setDefaults();
            } else {

                if (apple.x === getHead().x && apple.y === getHead().y) {                    
                    points++;
                    apple = generateAppleLocation();
                }
                points <= 0 ? snake.shift() : points--;
            }
            canMove = true;
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.fillStyle = 'green';
        snake.forEach(square => ctx.fillRect(square.x * 20, square.y * 20, itemSize, itemSize));

        //ctx.fillStyle = 'pink';
        ctx.fillStyle = (blink) ? 'pink' : 'red';
        ctx.fillRect(apple.x * 20, apple.y * 20, itemSize, itemSize);
    }

    function blinkApple() {
        blink = !blink; // Odwraca wartość zmiennej blink
    }    

    function getHead() {
        return snake[snake.length - 1];
    }

    function processBound(number) {
        if (number > 19) {
            return 0;
        } else if (number < 0) {
            return 19;
        }
        return number;
    }

    function setDefaults() {
        running = true;
        canMove = true;
        points = 2;
        [move, nextmove] = Array(2).fill({ x: 0, y: 0 });
        snake = [{x: 10, y: 10}];
        apple = generateAppleLocation();
    }

    function generateAppleLocation() {
        let location;
        do {
            location = {
                x: generateRandomNumber(19),
                y: generateRandomNumber(19)
            }
        } while (snake.filter(square => square.x === location.x && square.y === location.y).length > 0);
        return location;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max);       
    }   

    function addKeyEventListener() {
        window.addEventListener('keydown', event => {
            if (event.code.startsWith('Arrow')) {
                event.preventDefault();
                running = true;
                canMove = true;
            }
            switch(event.code) {
                case 'ArrowUp':
                    nextmove = { x: 0, y: -1 };
                    break;
                case 'ArrowDown':
                    nextmove = { x: 0, y: 1 };
                    break;
                case 'ArrowLeft':
                    nextmove = { x: -1, y: 0 };
                    break;
                case 'ArrowRight':
                    nextmove = { x: 1, y: 0 };
                    break;
            }
        });
    }


    function startGame() {
        console.log("Game started");
        addKeyEventListener();
        gameRuning();

    }

    function gameRuning() {
        setDefaults();
        gameInterval = setInterval(randomFrame, 100);
        appleInterval = setInterval(blinkApple, 300);        
        //setInterval(randomFrame, 100);
        //setInterval(blinkApple, 300)     
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
        clearInterval(appleInterval);

    }

    startGame();

    return {stop};
}