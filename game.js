function Game() {
    this.renderCtx = null;
    this.place = new Place();
    this.snake = null;
    this.food = null;
}

Game.prototype.onKeyDown = function (e) {
    if (!this.isRunning) {
        return;
    }
    if ("ArrowLeft" === e.key) {
        this.snake.left();
    } else if ("ArrowRight" === e.key) {
        this.snake.right();
    } else if ("ArrowUp" === e.key) {
        this.snake.up();
    } else if ("ArrowDown" === e.key) {
        this.snake.down();
    }
}

Game.prototype.start = function () {
    this.snake = this.initSnake();
    this.food = this.addFood();

    this.run();
}

Game.prototype.run = function () {
    this.isRunning = true;

    if (this.canEatFood()) {
        this.snake.eatFood();
        this.food = this.addFood();
    } else {
        this.snake.stepOne();
    }

    if (this.isGameOver()) {
        alert("GAME OVER");
        this.isRunning = false;
        return false;
    }

    this.render();

    var self = this;
    setTimeout(function() {
        self.run();
    }, 130);

    return true;
}

Game.prototype.isGameOver = function() {
    //eat self
    if (this.snake.isEatSelf()) {
        return true;
    }

    //hit the wall
    var head = this.snake.head();
    if (this.place.isOutOf(head.x, head.y)) {
        return true;
    }

    return false;
}

Game.prototype.canEatFood = function () {
    var nextPos = this.snake.nextPos();
    return this.place.cellIndex(nextPos.x, nextPos.y) === this.food;
}

Game.prototype.initSnake = function () {
    var newSnake = new Snake;
    newSnake.place = this.place;

    newSnake.posList = [];
    newSnake.posList.push({ x: 2, y: 2 });
    newSnake.posList.push({ x: 3, y: 2 });
    newSnake.posList.push({ x: 4, y: 2 });

    return newSnake;
}

Game.prototype.addFood = function () {
    var tmpRandom = parseInt(Math.random() * 1000);
    var cellIndexList = this.place.leftCellIndexList(this.snake.posList);
    var index = tmpRandom % cellIndexList.length;

    return cellIndexList[index];
}

Game.prototype.renderFood = function() {
    this.renderCell(this.food, "Yellow");
}

Game.prototype.renderSnake = function () {
    var self = this;
    this.renderCtx.fillStyle = "Lime";
    var posList = this.snake.posList;
    for (var i = 0; i < posList.length; ++i) {
        var pos = posList[i];
        this.renderCell(self.place.cellIndex(pos.x, pos.y));
    }
}

Game.prototype.renderCell = function (index, color) {
    var cellRect = this.place.cellRect(index);
    if (color) {
        this.renderCtx.fillStyle = color;
    }
    
    this.renderCtx.fillRect(cellRect.left + 1, cellRect.top + 1, cellRect.width - 2, cellRect.height - 2);
}

Game.prototype.renderPlace = function () {
    this.renderCtx.fillStyle = "Black";
    this.renderCtx.fillRect(0, 0, this.place.size.width, this.place.size.height);
}

Game.prototype.render = function() {
    this.renderPlace();
    this.renderSnake();
    this.renderFood();
}
