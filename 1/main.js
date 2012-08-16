(function () {
    'use strict';

    var Directions,
        Spiral,
        directions,
        spiral;

    Directions = (function () {
        var Directions;

        Directions = function () {
            this.directions = [];
            this.current_index = null;
        };
        Directions.prototype = {
            add: function (horizontal_direction, vertical_direction) {
                this.directions.push({
                    horizontal: horizontal_direction,
                    vertical: vertical_direction
                });
            },

            current: function () {
                var current = null;

                if (this.current_index === null && this.directions.length > 0) {
                    this.current_index = 0;
                }

                if (typeof this.directions[this.current_index] !== 'undefined') {
                    current = this.directions[this.current_index];
                }

                return current;
            },

            next: function () {
                var next = null;

                if (this.directions.length > 0) {
                    if (typeof this.current_index === null) {
                        this.current_index = 0;
                    } else if (this.current_index < this.directions.length - 1) {
                        this.current_index += 1;
                    } else {
                        this.current_index = 0;
                    }
                }

                return this.directions[this.current_index];
            }
        };

        return Directions;
    }());

    Spiral = (function () {
        var Spiral;

        Spiral = function (row_count, column_count, directions) {
            this.row_count = row_count;
            this.column_count = column_count;
            this.directions = directions;

            this.grid = this.createGrid();
        };

        Spiral.prototype = {
            createGrid: function () {
                var grid = [],
                    index;

                for (index = 0; index < this.row_count; index += 1) {
                    grid.push(new Array(this.column_count));
                }

                return grid;
            },
            next: function (previous) {
                var next = {
                        row: null,
                        column: null
                    },
                    direction = this.directions.current();

                if (previous.row === null && previous.column === null) {
                    next.row = 0;
                    next.column = 0;
                } else {
                    next.row = previous.row + direction.vertical;
                    next.column = previous.column + direction.horizontal;

                    if (next.row < 0 || next.row >= this.row_count || next.column < 0 || next.column >= this.column_count || typeof this.grid[next.row][next.column] !== 'undefined') {
                        this.directions.next();

                        next = this.next(previous);
                    }
                }

                return next;
            },
            render: function () {
                var counter = 0,
                    next = {
                        row: null,
                        column: null
                    },
                    label,
                    container = document.getElementById('result'),
                    max_count = this.row_count * this.column_count;

                while (counter < max_count) {
                    next = this.next(next);

                    label = counter;
                    if (counter < 10) {
                        label = '0' + label;
                    }
                    this.grid[next.row][next.column] = label;

                    counter++;
                }

                this.grid.forEach(function (element, row) {
                    element.forEach(function (element, column) {
                        container.innerHTML += element + '&nbsp;';
                    });
                    container.innerHTML += '<br>';
                });
            }
        };

        return Spiral;
    }());

    directions = new Directions();
    directions.add(1, 0);
    directions.add(0, 1);
    directions.add(-1, 0);
    directions.add(0, -1);
    spiral = new Spiral(5, 5, directions);
    spiral.render();
}());