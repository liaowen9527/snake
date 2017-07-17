function Place() {
    this.renderCtx = null;
    this.size = {
        width: 400,
        height: 400
    };
    this.grid = {
        x: 20,
        y: 20
    };
}

Place.prototype.cellIndex = function (x, y) {
    return x + y * this.grid.x;
}

Place.prototype.cellSize = function () {
    var self = this;
    return {
        width: parseInt(self.size.width / self.grid.x),
        height: parseInt(self.size.height / self.grid.y)
    }
}

Place.prototype.cellRect = function (index) {
    var cell = this.cell(index);
    var left = cell.width * cell.x;
    var top = cell.height * cell.y;
    return {
        left: left,
        top: top,
        right: left + cell.width,
        bottom: top + cell.height,
        width: cell.width,
        height: cell.height
    }
}

Place.prototype.cell = function (index) {
    var cellSize = this.cellSize();
    var self = this;

    return {
        x: index % self.grid.x,
        y: parseInt(index / self.grid.x),
        width: cellSize.width,
        height: cellSize.height
    }
}

Place.prototype.isOutOf = function(x, y) {
    return x < 0 || x >= this.grid.x || y < 0 || y >= this.grid.y;
}

Place.prototype.cellIndexList = function (margin) {
    var retIndexList = [];
    var left = margin.left;
    var right = this.grid.x - margin.right;
    var top = margin.top;
    var bottom = this.grid.y - margin.bottom;

    var self = this;

    for (var i = left; i < right; ++i) {
        for (var j = top; j < bottom; ++bottom) {
            retIndexList.push(i + j * self.grid.x);
        }
    }

    return retIndexList;
}

Place.prototype.leftCellIndexList = function (usedPosList) {
    var retIndexList = [];
    var self = this;
    var countIndex = this.grid.x * this.grid.y;
    for (var i = 0; i < countIndex; ++i) {
        var bUsed = false;
        if (!!usedPosList) {
            for (var j = 0; j < usedPosList.length; j++) {
                var posTemp = usedPosList[j];
                if (i === self.cellIndex(posTemp.x, posTemp.y)) {
                    bUsed = true;
                    break;
                }
            }
        }

        if (!bUsed) {
            retIndexList.push(i);
        }
    }

    return retIndexList;
}

