window.runMergeScript = function () {
    const canvas = document.getElementById('slideCanvas');
    const ctx = canvas.getContext('2d');

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