export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Point(this.x, this.y);
    }

    add(a, b) {
        return new Point(a.x + b.x, a.y + b.y);
    }

    middlePoint(a, b) {
        return new Point((a.x + b.x)/2, (a.y + b.y)/2);
    }
}