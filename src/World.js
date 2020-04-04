import courseGenerator from './courseGenerator';
export default class World{
    constructor(w, h, tracer) {
        this.canvas = document.getElementById('mainCanvas');
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
        this.course = null;
        this.courseCtx = null;
        this.tracer = tracer;
    }
    async init(coursePath) {
        this.course = document.createElement('canvas');
        this.course.width = this.canvas.width;
        this.course.height = this.canvas.height;
        this.courseCtx = await courseGenerator(this.course, coursePath);
        this.tracer.sensors.forEach(s => s.setMap(this.courseCtx));
    }
    update(timeStamp) {
        this.tracer.update(timeStamp);
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.course, 0, 0);
        this.tracer.draw(this.ctx);
    }
}
