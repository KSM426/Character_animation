import { Point } from "./point.js";

export class Head {
    constructor(headRadius, bH, hC, floor) {
        this.headRadius = headRadius;
        this.floor = floor;
        this.headColor = hC;
        this.boxHeight = bH;
        
        this.location = this.floor.clone();
        this.point = new Point(this.location.x - 50, this.location.y);
    }
    
    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;
    }
    
    animate(ctx) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        
        ctx.fillStyle = this.headColor;
        ctx.beginPath();
        ctx.arc(this.point.x - this.location.x, this.point.y - this.location.y, this.headRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    move(v) {
        this.v = v;

        this.location.x += this.v.x;
        this.location.y += this.v.y;

        // this.point.x += (this.location.x - this.point.x) * 0.6;
        this.point.y += (this.location.y - this.point.y) * 0.5;
        this.point.x = this.location.x;
        // this.point.y = this.location.y;
    }

    reCoor() {
        
    }
}