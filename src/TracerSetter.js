const [inactive, pin, rotate] = [0, 1, 2];

export default class TracerSetter{
    constructor(tracer) {
        this.state = inactive;
        this.tracer = tracer;
    }
    onMouseDown(...pos) {
        this.state = pin;
        this.tracer.stop();
        this.tracer.setPos(...pos);
    }
    onMouseMove(x, y) {
        if (this.state !== inactive) this.state = rotate;
        else return;
        const dx = x - this.tracer.x;
        const dy = -(y - this.tracer.y);
        this.tracer.setRad(Math.atan2(dy, dx));
    }
    onMouseUp() {
        this.state = inactive;
        this.tracer.start();
    }

}
