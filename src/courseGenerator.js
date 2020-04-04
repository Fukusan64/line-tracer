export default (canvas, path) => new Promise(res => {
    const img = new Image();
    img.addEventListener("load", () => {
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        res(ctx);
    }, false);
    img.src = path;
});
