window.runOpossomScript = function () {    
    const canvas = document.getElementById('canvasOpossom');
    const ctx = canvas.getContext('2d');

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

        // Nos
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Uszy
        ctx.beginPath();
        ctx.arc(x - 30, y - 35, 10, 0, Math.PI * 2);
        ctx.arc(x + 30, y - 35, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'gray';
        ctx.fill();

        // Nogi
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
        ctx.fill();
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
    
        animateFrame();
    }

    animate();
}