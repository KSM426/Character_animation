import { Point } from "./point.js";


export class Hat {
    constructor(hH, hW, bR, hC, bC, boxC, floor) {

        this.hatHeight = hH;
        this.hatWidth = hW;

        this.boxHeight = hH/5;
        this.boxWidth = hW;

        this.hatColor = hC;
        this.ballColor = bC;
        this.boxColor = boxC;
        this.ballRadius = bR;

        this.floor = floor;

        this.blurRadius = bR * 8;

        this.location = this.floor.clone();
        this.point = new Point(
            -20 + this.location.x,
            -this.hatHeight + this.location.y + 20
        );4

        this.reCoor();
    }
    
    resize(w, h) {
        this.stageWidth = w;
        this.stageHeight = h;
    }
    
    animate(ctx) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);

        const gradient = ctx.createRadialGradient(
            this.point.x - this.location.x, 
            this.point.y - this.location.y,
            0, 
            this.point.x - this.location.x,
            this.point.y - this.location.y,
            this.blurRadius
        );
        gradient.addColorStop(0, this.ballColor);
        gradient.addColorStop(1, 'black');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.point.x - this.location.x, this.point.y - this.location.y, this.blurRadius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
        
        ctx.fillStyle = this.hatColor;
        
        ctx.beginPath();
        ctx.moveTo(this.point.x - this.location.x, this.point.y - this.location.y);
        ctx.quadraticCurveTo(this.rightCurve.x, this.rightCurve.y, this.right.x, this.right.y);
        
        ctx.lineTo(this.left.x, this.left.y);    

        ctx.quadraticCurveTo(this.leftCurve.x, this.leftCurve.y, this.point.x - this.location.x, this.point.y - this.location.y);
        ctx.closePath();        

        ctx.fill();
        
        ctx.fillStyle = this.boxColor;
        ctx.fillRect(this.left.x, this.left.y - this.boxHeight/2, this.boxWidth, this.boxHeight);
        
        ctx.fillStyle = this.ballColor;
        ctx.beginPath();
        ctx.arc(this.point.x - this.location.x, this.point.y - this.location.y, this.ballRadius, 0, Math.PI*2);
        ctx.closePath();
        ctx.fill();
        
        // ctx.fillStyle = 'black';
        // ctx.fillRect(-2, -2, 4, 4);
        
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.point.x-this.location.x-2, this.point.y-this.location.y-2, 4, 4);
        // ctx.fillRect(this.pointFix.x-2, this.pointFix.y-2, 4, 4);
        // ctx.fillRect(this.leftCurve.x-2, this.leftCurve.y-2, 4, 4);
        // ctx.fillRect(this.rightCurve.x-2, this.rightCurve.y-2, 4, 4);
        // ctx.fillRect(this.left.x-2, this.left.y-2, 4, 4);
        // ctx.fillRect(this.right.x-2, this.right.y-2, 4, 4);

        ctx.restore();
    }

    move(v) {
        this.v = v;

        this.location.x += this.v.x;
        this.location.y += this.v.y;

        this.point.x += (this.pointFix.x - (this.point.x - this.location.x)) * 0.1;
        this.point.y += (this.pointFix.y - (this.point.y - this.location.y)) * 0.1;
    }

    reCoor() {
        this.pointFix = new Point(0, - this.hatHeight);
        this.left = new Point(-this.hatWidth/2, 0);
        this.right = new Point(this.hatWidth/2, 0);

        this.leftCurve = new Point().middlePoint(this.pointFix, this.left);
        this.rightCurve = new Point().middlePoint(this.pointFix, this.right);
    }
}