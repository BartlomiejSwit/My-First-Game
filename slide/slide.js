function runSlideScript() {
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
}