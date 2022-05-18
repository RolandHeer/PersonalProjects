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
    ///   IMAGES   \\\
    let bgImg = new Image();
    bgImg.src = "../img/Grund.jpg";
    //bgImg.src = "Rollantor/img/Grund.jpg";
    let signImg = new Image();
    signImg.src = "../img/Schilder.jpg";
    //signImg.src = "Rollantor/img/Schilder.jpg";
    let shrubsImg = new Image();
    shrubsImg.src = "../img/Pflanzen.jpg";
    //shrubsImg.src = "Rollantor/img/Pflanzen.jpg";
    let dementorImg = new Image();
    dementorImg.src = "../img/Alter_Mann.png";
    //dementorImg.src = "Rollantor/img/Alter_Mann.png"
    function setup() {
        defineValues();
        crc2.scale(crc2.canvas.width / 3508, crc2.canvas.height / 2481);
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
        crc2.drawImage(bgImg, 0, 0);
        if (dementor.getPos().y > 900) {
            //crc2.drawImage(signImg,0,0);
            dementor.draw();
        }
        else {
            dementor.draw();
            //crc2.drawImage(signImg,0,0);
        }
        //crc2.drawImage(shrubsImg,0,0);        
    }
    function keyDownHandler(_key) {
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
        dementor = new Rollantor.Dementor(crc2, dementorImg);
    }
    function resize() {
        canvas.height = window.innerHeight;
        canvas.width = window.innerHeight * (3508 / 2481);
        crc2.scale(crc2.canvas.width / 3508, crc2.canvas.height / 2481);
    }
})(Rollantor || (Rollantor = {}));
//# sourceMappingURL=Main.js.map