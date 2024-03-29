import { Hat } from "./hat.js";
import { Head } from "./head.js";
import { Body } from "./body.js";
import { Point } from "./point.js";

const VEL = 5;
const JUMP = 20;
const ACC = 0.2;
const GRV = 1.7;
export class Character{
    constructor() {
        this.canJump = 1;
        this.Flag = {
            a: 0,
            d: 0,
            w: 0,
        };

        this.ini = new Point(175, 400);
        this.location = this.ini.clone();

        this.v = new Point(0, 0);

        let hatHeight = 80;
        let headRadius = 20;

        this.info = {
            hat: {
                hatHeight,
                hatWidth: 40,
                ballRadius: 6,
                hatColor: "rgba(220, 220, 220, 1)",
                ballColor: "rgba(255, 255, 255, 1)",
                boxColor: "rgba(150, 150, 150, 1)",
                floor: this.ini,
            },
            head: {
                headRadius,
                boxHeight: hatHeight/5,
                headColor: "rgba(255, 255, 255, 1)",
                floor: new Point(this.ini.x, this.ini.y + headRadius + hatHeight * 2 / 15),
            },
            body: {
                bodyHeight: headRadius * 2,
                bodyWidth: headRadius * 2,
                bodyColor: "rgba(220, 220, 220, 1)",
                floor: new Point(this.ini.x, this.ini.y + headRadius * 2 + hatHeight * 3 / 15),
            },
        };

        this.hat = new Hat(
            this.info.hat.hatHeight,
            this.info.hat.hatWidth,
            this.info.hat.ballRadius,
            this.info.hat.hatColor,
            this.info.hat.ballColor,
            this.info.hat.boxColor,
            this.info.hat.floor 
        );
        this.head = new Head(
            this.info.head.headRadius,
            this.info.head.boxHeight,
            this.info.head.headColor,
            this.info.head.floor
        );
        this.body = new Body(
            this.info.body.bodyHeight,
            this.info.body.bodyWidth,
            this.info.body.bodyColor,
            this.info.body.floor
        );
        window.addEventListener('keydown', this.keydown.bind(this));
        window.addEventListener('keyup', this.keyup.bind(this));
    }
    
    resize(w, h){
        this.stageWidth = w;
        this.stageHeight = h;

        this.hat.resize(this.stageWidth, this.stageHeight);
    }

    animate(ctx) {
        this.hat.animate(ctx);
        this.head.animate(ctx);
        this.body.animate(ctx);

        // ctx.save();
        // ctx.fillStyle = "green";
        // ctx.fillRect(this.location.x - 3, this.location.y - 3, 6, 6);
        // ctx.fillStyle = 'blue'
        // ctx.fillRect(this.ini.x - 2, this.ini.y - 2, 4, 4);
        // ctx.restore();

        this.velocity();
        this.reCoor();
        this.move();
    }

    keydown(e) {
        //w 87, a 65, s 83, d 68
        if(e.keyCode == 65) {
            this.Flag.a = 1;
        } else if(e.keyCode == 68) {
            this.Flag.d = 1;
        } else if(e.keyCode == 87) {
            this.Flag.w = 1;
        }
    }

    keyup(e) {
        if(e.keyCode == 65) {
            this.Flag.a = 0;
        } else if(e.keyCode == 68) {
            this.Flag.d = 0;
        } else if(e.keyCode == 87) {
            this.Flag.w = 0;
        }
    }

    velocity() {
        if(this.Flag.a == 1) {
            this.v.x -= VEL;
        }
        if(this.Flag.d == 1) {
            this.v.x += VEL;
        }
        if(this.Flag.w == 1 && this.canJump == 1) {
            this.v.y -= JUMP;
            this.canJump = 0;
        } else {
            this.v.y += GRV;
        }
    }

    reCoor() {
        this.hat.reCoor();
        this.head.reCoor();
        this.body.reCoor();
    }

    move() {
        this.location.x += this.v.x;
        this.location.y += this.v.y;

        
        this.hat.move(this.v);
        this.head.move(this.v);
        this.body.move(this.v);
        
        if(this.location.y > this.ini.y) {
            this.v.y = 0;
            this.canJump = 1;
            this.location.y = this.ini.y;
            this.hat.location.y = this.hat.floor.y;
            this.head.location.y = this.head.floor.y;
            this.body.location.y = this.body.floor.y
        }
        this.v.x *= ACC;
    }
}