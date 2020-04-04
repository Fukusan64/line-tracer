export default class Sensor{
    constructor(x = 0, y = 0) {
        this.courseCtx = null;
        this.x = x;
        this.y = y;
        this.status = null;
    }
    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#440000';
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        if (this.status) {
            ctx.beginPath();
            ctx.fillStyle = '#ff0000';
            ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    getState() {
        this.status =
            this.courseCtx.getImageData(this.x, this.y, 1, 1).data[0] === 0;
        return this.status;
    }
    setMap(ctx) {
        this.courseCtx = ctx;
    }

}
