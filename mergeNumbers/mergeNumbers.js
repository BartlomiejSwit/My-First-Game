window.runMergeScript = function () {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');

    class square {
        constructor(x, y, value) {
            this.x = x;
            this.y = y;
            this.value = value;
            this.rightSite = null;
            this.leftSite = null;
            this.upSite = null;
            this.downSite = null;
            this.color = "black";            
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, 50, 50);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.fillText(this.value, this.x + 20, this.y + 30);
        }
    }

    let square = new square(50, 50, 2);





    function startGame() {
        console.log("Game started");
        gameInterval = setInterval(gameRuning, 1000 / 60);

    }

    function gameWinStage() {

    }

    function gameRuning() {
  
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