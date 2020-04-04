import Sensor from './Sensor';

const clip = (val, min, max) => {
    if (val < min) return min;
    if (val > max) return max;
    return val;
}

export default class Tracer {
    constructor(
        program = sensorState => ({vr: 50, vl: -50}),
        sensorNum = 1,
        interval = 100,
        x = 200,
        y = 150,
        rad = 0,
        w = 50,
        h = 120
    ) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.vr = 0;
        this.vl = 0;
        this.rad = rad;
        this.beforeUpdate = -1;
        this.beforeRunProgram = -1;
        this.interval = interval;
        this.program = program;
        this.sensors = [];
        for (let i = 0; i < sensorNum; i++) {
            this.sensors[i] = new Sensor(
                ...this._getGlobalPos(
                    this.h / 10 * 9,
                    this.w / (sensorNum + 1) * i
                )
            );
        }
        this.running = false;
    }
    start() {
        this.beforeUpdate = -1;
        this.running = true;
    }
    stop() {
        this.running = false;
    }
    setPos(x, y) {
        [this.x, this.y] = [x, y];
    }
    setRad(rad) {
        this.rad = rad;
    }
    update(timeStamp) {
        if (this.running) {
            //TIPS: 初期化
            if (this.beforeUpdate === -1) {
                this._runProgram();
                this.beforeRunProgram = this.beforeUpdate = timeStamp;
            }
            //TIPS: プログラムをインターバル実行
            if (timeStamp - this.beforeRunProgram > this.interval) {
                this._runProgram();
                this.beforeRunProgram = timeStamp;
            }

            const d = this.w / 2;
            const ds = (timeStamp - this.beforeUpdate) / 1000;
            const w = (this.vr - this.vl) / (2 * d);
            const v = (this.vr + this.vl) / 2;
            this.rad += w * ds;
            const vx = v * Math.cos(this.rad);
            const vy = -v * Math.sin(this.rad);
            this.x += vx * ds;
            this.y += vy * ds;
            this.beforeUpdate = timeStamp;
        }
        this.sensors.forEach(
            (s, i) => s.setPos(
                ...this._getGlobalPos(
                    this.h / 10 * 9,
                    this.w / (this.sensors.length + 1) * i,
                )
            )
        );
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = '#222222';
        ctx.moveTo(...this._getGlobalPos(-this.h / 6, this.w));
        ctx.lineTo(...this._getGlobalPos(-this.h / 6, -this.w));
        ctx.lineTo(...this._getGlobalPos(this.h / 6, -this.w));
        ctx.lineTo(...this._getGlobalPos(this.h / 6, this.w));
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = '#888888';
        ctx.moveTo(...this._getGlobalPos(-this.h / 4, this.w / 2));
        ctx.lineTo(...this._getGlobalPos(-this.h / 4, -this.w / 2));
        ctx.lineTo(...this._getGlobalPos(this.h, -this.w / 2));
        ctx.lineTo(...this._getGlobalPos(this.h, this.w / 2));
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.strokeStyle = '#222222';
        ctx.moveTo(...this._getGlobalPos(0, this.w));
        ctx.lineTo(...this._getGlobalPos(0, -this.w));
        ctx.stroke();
        this.sensors.forEach(s => s.draw(ctx));
    }
    _getGlobalPos(lx, ly) {
        //TIPS: x軸方向が右、y軸方向が下
        const rx = lx * Math.cos(this.rad) + ly * Math.sin(this.rad);
        const ry = -lx * Math.sin(this.rad) + ly * Math.cos(this.rad);
        return [
            this.x + rx,
            this.y + ry
        ];
    }
    _runProgram() {
        let {vr, vl} = this.program(this.sensors.map(s => s.getState()));
        this.vr = clip(vr, -50, 50);
        this.vl = clip(vl, -50, 50);
    }
}
