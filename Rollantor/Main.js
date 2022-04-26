var Rollantor;
(function (Rollantor) {
    window.addEventListener("load", setup);
    let canvas;
    let crc2;
    let fps = 60;
    let dementor;
    let leftIsPressed = false;
    let rightIsPressed = false;
    let upIsPressed = false;
    let downIsPressed = false;
    function setup() {
        defineValues();
        crc2.scale(crc2.canvas.width / 2560, crc2.canvas.height / 1152);
        resize();
        window.setInterval(update, (1000 / fps));
        window.addEventListener("keydown", keyDownHandler);
        window.addEventListener("keyup", keyUpHandler);
        window.addEventListener("resize", resize);
    }
    function update() {
        dementor.move(leftIsPressed, rightIsPressed, upIsPressed, downIsPressed);
        renderWorld();
    }
    function renderWorld() {
        crc2.fillStyle = "#696969";
        crc2.fillRect(0, 0, 2560, 1152);
        dementor.draw();
    }
    function keyDownHandler(_key) {
        console.log("hallo ich mach was");
        switch (_key.code) {
            case "ArrowLeft":
            case "KeyA":
                leftIsPressed = true;
                break;
            case "ArrowRight":
            case "KeyD":
                rightIsPressed = true;
                break;
            case "ArrowUp":
            case "KeyW":
                upIsPressed = true;
                break;
            case "ArrowDown":
            case "KeyS":
                downIsPressed = true;
                break;
            default:
                console.log("hier wurde etwas gedrückt, das es nicht gibt.");
        }
    }
    function keyUpHandler(_key) {
        switch (_key.code) {
            case "ArrowLeft":
            case "KeyA":
                leftIsPressed = false;
                break;
            case "ArrowRight":
            case "KeyD":
                rightIsPressed = false;
                break;
            case "ArrowUp":
            case "KeyW":
                upIsPressed = false;
                break;
            case "ArrowDown":
            case "KeyS":
                downIsPressed = false;
                break;
            default:
                console.log("hier wurde etwas losgelassen, das es nicht gibt.");
        }
    }
    function defineValues() {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        dementor = new Rollantor.Dementor(crc2);
    }
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth * (1152 / 2560);
        crc2.scale(crc2.canvas.width / 2560, crc2.canvas.height / 1152);
    }
})(Rollantor || (Rollantor = {}));
//# sourceMappingURL=Main.js.map