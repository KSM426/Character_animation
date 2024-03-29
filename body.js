import { Point } from "./point.js";

export class Body {
    constructor(bH, bW, bC, floor) {
        this.bodyHeight = bH;
        this.bodyWidth = bW;

        this.bodyColor = bC;
        
        this.floor = floor;
        this.location = this.floor.clone();
        this.fourLocation = [
            new Point(- this.bodyWidth/4, 0), 
            new Point(+ this.bodyWidth/4, 0), 
            new Point(- this.bodyWidth/2, this.bodyHeight), 
            new Point(+ this.bodyWidth/2, this.bodyHeight), 
        ];
        this.fourPoint = this.fourLocation.slice();
        this.fourPoint[2].x -= 10;
        this.fourPoint[3].x += 10;

        for(let i=0; i<4; i++) {
            this.fourPoint[i].x += this.location.x;
            this.fourPoint[i].y += this.location.y;
        }

        this.leftCurve = new Point().middlePoint(this.fourLocation[0], this.fourLocation[2]);
        this.rightCurve = new Point().middlePoint(this.fourLocation[1], this.fourLocation[3]);
    }
    
    resize(w, h) {

    }

    animate(ctx) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);

        ctx.fillStyle = this.bodyColor;
        ctx.beginPath();
        ctx.moveTo(this.fourPoint[0].x - this.location.x, this.fourPoint[0].y - this.location.y);
        ctx.lineTo(this.fourPoint[1].x - this.location.x, this.fourPoint[1].y - this.location.y);
        ctx.quadraticCurveTo(this.rightCurve.x, this.rightCurve.y, this.fourPoint[3].x - this.location.x, this.fourPoint[3].y - this.location.y)
        ctx.lineTo(this.fourPoint[2].x - this.location.x, this.fourPoint[2].y - this.location.y);
        ctx.quadraticCurveTo(this.leftCurve.x, this.leftCurve.y, this.fourPoint[0].x - this.location.x, this.fourPoint[0].y - this.location.y)
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    move(v) {
        this.v = v;

        this.location.x += this.v.x;
        this.location.y += this.v.y;

        for(let i=0; i<2; i++) {
            this.fourPoint[i].x = this.fourLocation[i].x + this.location.x;
            this.fourPoint[i].y = this.fourLocation[i].y + this.location.y;
        }
        for(let i=2; i<4; i++) {
            this.fourPoint[i].x += (this.fourLocation[i].x - (this.fourPoint[i].x - this.location.x)) * 0.23;
            // this.fourPoint[i].y += (this.fourLocation[i].y - (this.fourPoint[i].y - this.location.y)) * 0.4;
            this.fourPoint[i].y = this.fourLocation[i].y + this.location.y;
        }
    }

    reCoor() {
        this.fourLocation = [
            new Point(- this.bodyWidth/4, 0), 
            new Point(this.bodyWidth/4, 0), 
            new Point(- this.bodyWidth/2, this.bodyHeight), 
            new Point(this.bodyWidth/2, this.bodyHeight), 
        ];
        
        this.leftCurve = new Point().middlePoint(this.fourLocation[0], this.fourLocation[2])
        this.rightCurve = new Point().middlePoint(this.fourLocation[1], this.fourLocation[3]);
 
    }
}