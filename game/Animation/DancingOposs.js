window.runOpossomScript = function () {    
    const canvas = document.getElementById('canvasOpossom');
    const ctx = canvas.getContext('2d');

    let xRightLegs = 35;
    let xLeftLegs = 15;
    let increaseRight = true;
    let increaseLeft = true;

    // Funkcja rysująca tańczącego oposa
    function drawDancingOpossum(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ciało
        ctx.beginPath();
        ctx.arc(x, y, 40, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill();

        // Oczy
        ctx.beginPath();
        ctx.arc(x - 20, y - 10, 5, 0, Math.PI * 2);
        ctx.arc(x + 20, y - 10, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Usta
        ctx.beginPath();
/*         ctx.moveTo(x - 10, y + 10);
        ctx.quadraticCurveTo(x, y + 15, x + 10, y + 10); */
        ctx.moveTo(x + 10, y + 10);
        ctx.quadraticCurveTo(x, y + 15, x + 0, y + 5);
        ctx.moveTo(x - 10, y + 10);
        ctx.quadraticCurveTo(x, y + 15, x + 0, y + 5);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Wąsy
        ctx.beginPath();
        ctx.moveTo(x - 15, y + 5);
        ctx.lineTo(x - 35, y - 5);
        ctx.moveTo(x + 15, y + 5);
        ctx.lineTo(x + 35, y - 5);
        ctx.moveTo(x - 15, y + 5);
        ctx.lineTo(x - 35, y + 5);
        ctx.moveTo(x + 15, y + 5);
        ctx.lineTo(x + 35, y + 5);
        ctx.moveTo(x - 15, y + 5);
        ctx.lineTo(x - 35, y + 15);
        ctx.moveTo(x + 15, y + 5);
        ctx.lineTo(x + 35, y + 15);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nos
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

/*         // Uszy
        ctx.beginPath();
        ctx.arc(x - 30, y - 35, 10, 0, Math.PI * 2);
        ctx.arc(x + 30, y - 35, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill(); */

        // Uszy
        ctx.beginPath();
        // ctx.arc(x - 30, y - 35, 10, 0, Math.PI * 2);
        // ctx.arc(x + 30, y - 35, 10, 0, Math.PI * 2);
        ctx.moveTo(x - 20, y - 60);
        ctx.lineTo(x - 30, y - 25);
        ctx.lineTo(x - 10, y - 40);
        ctx.lineTo(x - 20, y - 60);
        ctx.moveTo(x + 20, y - 60);
        ctx.lineTo(x + 30, y - 25);
        ctx.lineTo(x + 10, y - 40);
        ctx.lineTo(x + 20, y - 60);
        ctx.fillStyle = 'gray';
        ctx.fill();

/*         // Nogi
        ctx.beginPath();
        ctx.moveTo(x - 20, y + 40);
        ctx.lineTo(x - 30, y + 60);
        ctx.lineTo(x - 10, y + 60);
        ctx.lineTo(x - 20, y + 40);
        ctx.moveTo(x + 20, y + 40);
        ctx.lineTo(x + 30, y + 60);
        ctx.lineTo(x + 10, y + 60);
        ctx.lineTo(x + 20, y + 40);
        ctx.fillStyle = 'gray';
        ctx.fill(); */

/*         // Nogi
        ctx.beginPath();
        ctx.moveTo(x - 5, y + 45);
        ctx.lineTo(x - 30, y + 70);
        ctx.lineTo(x - 30, y + 30);
        ctx.lineTo(x - 5, y + 45);
        ctx.moveTo(x + 5, y + 45);
        ctx.lineTo(x + 35, y + 70);
        ctx.lineTo(x + 30, y + 30);
        ctx.lineTo(x + 5, y + 45);
        ctx.fillStyle = 'gray';
        ctx.fill();    */     

        // Nogi
        ctx.beginPath();
        ctx.moveTo(x - 5, y + 45);
        ctx.lineTo(x - xRightLegs, y + 70);
        ctx.lineTo(x - 30, y + 30);
        ctx.lineTo(x - 5, y + 45);
        ctx.moveTo(x + 5, y + 45);
        ctx.lineTo(x + xLeftLegs, y + 70);
        ctx.lineTo(x + 30, y + 30);
        ctx.lineTo(x + 5, y + 45);
        ctx.fillStyle = 'gray';
        ctx.fill(); 

    }

    function animationLegs() {
        if (increaseRight){
            xRightLegs += 1;
            if (xRightLegs >= 35){
                increaseRight = false;
            }
        } else {
            xRightLegs -= 1;
            if (xRightLegs <= 5){
                increaseRight = true;
            }
        }

        if (increaseLeft){
            xLeftLegs += 1;
            if (xLeftLegs >= 35){
                increaseLeft = false;
            }
        } else {
            xLeftLegs -= 1;
            if (xLeftLegs <= 5){
                increaseLeft = true;
            }
        }
    }

    // Funkcja animacji
    function animate() {
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let angle = 0;
    
        function animateFrame() {
            const newX = x + Math.sin(angle) * 100;
            const newY = y + Math.cos(angle) * 100;
            drawDancingOpossum(newX, newY);
            angle += 0.1;

            
            
            requestAnimationFrame(animateFrame);
        }
        setInterval(animationLegs, 10);
        animateFrame();
    }

    animate();
}