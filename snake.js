function Snake() {
    this.runDirection = 1;
    this.posList = [];
}

Snake.prototype.left = function () {
    if (1 !== this.runDirection) {
        this.runDirection = 0;   
    }
}

Snake.prototype.right = function () {
    if (0 !== this.runDirection) {
        this.runDirection = 1;
    }
}

Snake.prototype.up = function () {
    if (3 !== this.runDirection) {
        this.runDirection = 2;
    }
}

Snake.prototype.down = function () {
    if (2 !== this.runDirection) {
        this.runDirection = 3;
    }
}

Snake.prototype.eatFood = function () {
    var nextPos = this.nextPos();
    this.posList.push(nextPos);
}

Snake.prototype.isEatSelf = function () {
    var head = this.head();
    var count = 0;
    for (var i = 0; i < this.posList.length; ++i) {
        var tempPos = this.posList[i];
        if (head.x === tempPos.x && head.y === tempPos.y) {
            count++;
        }
    }

    return count > 1;
}

//return the index value of the snake head in the place
Snake.prototype.head = function() {
    var len = this.posList.length;

    return this.posList[len - 1];
}

Snake.prototype.nextPos = function() {
    var head = this.head();
    var newHead = {
        x: head.x,
        y: head.y
    }

    if (0 === this.runDirection) {  //left
        newHead.x -= 1;
    } else if (1 === this.runDirection) {  //right
        newHead.x += 1;
    } else if (2 === this.runDirection) { //up
        newHead.y -= 1;
    } else {
        newHead.y += 1;
    }

    return newHead;
}

Snake.prototype.stepOne = function () {
    var nextPos = this.nextPos();

    this.posList.shift();
    this.posList.push(nextPos);
}
