import World from './World';
import Tracer from './Tracer';
import program from './program';
import TracerSetter from './TracerSetter';
(async () => {
    const tracer = new Tracer(program, 1, 100);
    const tracerSetter = new TracerSetter(tracer);
    const world = new World(window.innerWidth, window.innerHeight, tracer);
    await world.init('./img/course.png');
    for (const eventName of ['MouseDown', 'MouseMove', 'MouseUp']) {
        world.canvas.addEventListener(
            eventName.toLowerCase(),
            ({clientX, clientY}) => tracerSetter[`on${eventName}`](clientX, clientY)
        );
    }
    tracer.start();
    const update = () => {
        requestAnimationFrame(timeStamp => {
            world.update(timeStamp);
            update();
        })
    };
    update();
})()
