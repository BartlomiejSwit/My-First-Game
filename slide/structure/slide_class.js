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
        if (x < this.x + 45 && x > this.x - 45 ) {
            this.x = x;
        }
        if (y < this.y + 45 && y > this.y - 45) {
            this.y = y;
        }

        /*
        this.x = x;
        this.y = y;
        */
    }

    setPosition(x, y) {
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
export default Block;

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
    constructor(x, y) {
        this.mousePosition = {x, y};
        this.mouseClick = {x, y};
        this.cursorPositionOnBlock = {x, y};
        this.blockPosition = {x, y};

    }

    cursorPositionOnBlock(selectedBlock) {
        this.cursorPositionOnBlock.x = this.mouseClick.x - selectedBlock.x;
        this.cursorPositionOnBlock.y = this.mouseClick.y - selectedBlock.y;
    }
}

