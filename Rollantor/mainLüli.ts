namespace Wein {

    window.addEventListener("load", setup);

    /////           TAKTUNG          \\\\\ 
    let fps: number = 100;

    let gameRunning: boolean = true;

    let canvas: HTMLCanvasElement;
    let sidePanel: HTMLDivElement;
    let crc2: CanvasRenderingContext2D;

    let entities: Entity[] = [];
    let pot: Pot;

    let noSelection: number = 4711;
    let lastHover: number = noSelection;
    let mousePosition: Vector;

    /////          ALL IMAGES        \\\\\ 
    let bgTex = new Image();
    bgTex.src = "../img/bg.png";
    let haken_1 = new Image();
    haken_1.src = "../img/haken_1.png";
    let haken_2 = new Image();
    haken_2.src = "../img/haken_2.png";
    let anis_1 = new Image();
    anis_1.src = "../img/anis_1.png";
    let anis_2 = new Image();
    anis_2.src = "../img/anis_2.png";
    let anis_glas = new Image();
    anis_glas.src = "../img/anis_glas.png";
    let brett = new Image();
    brett.src = "../img/brett.png";
    let knopf_0 = new Image();
    knopf_0.src = "../img/knopf_0.png";
    let knopf_0_gedrückt = new Image();
    knopf_0_gedrückt.src = "../img/knopf_0_gedrückt.png";
    let knopf_1 = new Image();
    knopf_1.src = "../img/knopf_1.png";
    let knopf_1_gedrückt = new Image();
    knopf_1_gedrückt.src = "../img/knopf_1_gedrückt.png";
    let knopf_2 = new Image();
    knopf_2.src = "../img/knopf_2.png";
    let knopf_2_gedrückt = new Image();
    knopf_2_gedrückt.src = "../img/knopf_2_gedrückt.png";
    let löffel = new Image();
    löffel.src = "../img/löffel.png";
    let light_0 = new Image();
    light_0.src = "../img/leer.png";
    let light_1 = new Image();
    light_1.src = "../img/glow_orange.png";
    let light_2 = new Image();
    light_2.src = "../img/glow_rot.png";
    let messer = new Image();
    messer.src = "../img/messer.png";
    let nelke_1 = new Image();
    nelke_1.src = "../img/nelke_1.png";
    let nelke_2 = new Image();
    nelke_2.src = "../img/nelke_2.png";
    let nelken_glas_hinten = new Image();
    nelken_glas_hinten.src = "../img/nelken_glas_hinten.png";
    let nelken_glas_vorn = new Image();
    nelken_glas_vorn.src = "../img/nelken_glas_vorn.png";
    let orange_1 = new Image();
    orange_1.src = "../img/orange_1.png";
    let orange_2 = new Image();
    orange_2.src = "../img/orange_2.png";
    let orange_geviertelt = new Image();
    orange_geviertelt.src = "../img/orange_geviertelt.png";
    let orange_gestückelt = new Image();
    orange_gestückelt.src = "../img/orange_gestückelt.png";
    let orange_zermatscht = new Image();
    orange_zermatscht.src = "../img/orange_zermatscht.png";
    let orange_scheiben = new Image();
    orange_scheiben.src = "../img/orange_scheiben.png";
    let orange_halbiert = new Image();
    orange_halbiert.src = "../img/orange_halbiert.png";
    let orangenschale_hinten = new Image();
    orangenschale_hinten.src = "../img/orangenschale_hinten.png";
    let orangenschale_vorne = new Image();
    orangenschale_vorne.src = "../img/orangenschale_vorne.png";
    let piment_1 = new Image();
    piment_1.src = "../img/piment_1.png";
    let piment_2 = new Image();
    piment_2.src = "../img/piment_2.png";
    let piment_3 = new Image();
    piment_3.src = "../img/piment_3.png";
    let piment_4 = new Image();
    piment_4.src = "../img/piment_4.png";
    let piment_5 = new Image();
    piment_5.src = "../img/piment_5.png";
    let piment_deckel = new Image();
    piment_deckel.src = "../img/piment_deckel.png";
    let piment_glas = new Image();
    piment_glas.src = "../img/piment_glas.png";
    let schöpflöffel = new Image();
    schöpflöffel.src = "../img/schöpflöffel.png";
    let schöpflöffel_voll = new Image();
    schöpflöffel_voll.src = "../img/schöpflöffel_voll.png";
    let tassenregal = new Image();
    tassenregal.src = "../img/tassenregal.png";
    let topf_hinten = new Image();
    topf_hinten.src = "../img/topf_hinten.png";
    let topf_vorne = new Image();
    topf_vorne.src = "../img/topf_vorne.png";
    let wein_flasche = new Image();
    wein_flasche.src = "../img/wein_flasche.png";
    let wein_flasche_b = new Image();
    wein_flasche_b.src = "../img/wein_flasche_b.png";
    let wein_flasche_c = new Image();
    wein_flasche_c.src = "../img/wein_flasche_c.png";
    let wein_flasche_leer = new Image();
    wein_flasche_leer.src = "../img/wein_flasche_leer.png";
    let wein_korken = new Image();
    wein_korken.src = "../img/wein_korken.png";
    let wein_strahl_1 = new Image();
    wein_strahl_1.src = "../img/wein_strahl_1.png";
    let wein_strahl_2 = new Image();
    wein_strahl_2.src = "../img/wein_strahl_2.png";
    let wein_strahl_3 = new Image();
    wein_strahl_3.src = "../img/wein_strahl_3.png";
    let zimt_1 = new Image();
    zimt_1.src = "../img/zimt_1.png";
    let zimt_2 = new Image();
    zimt_2.src = "../img/zimt_2.png";
    let zimt_3 = new Image();
    zimt_3.src = "../img/zimt_3.png";
    let zimtstangen_deckel = new Image();
    zimtstangen_deckel.src = "../img/zimtstangen_deckel.png";
    let zimtstangen_dose = new Image();
    zimtstangen_dose.src = "../img/zimtstangen_dose.png";
    let zimtstangen_dose_einzeln = new Image();
    zimtstangen_dose_einzeln.src = "../img/zimtstangen_dose_einzeln.png";
    let zucker = new Image();
    zucker.src = "../img/zucker.png";
    let zuckerlöffel = new Image();
    zuckerlöffel.src = "../img/zuckerlöffel.png";
    let zuckerlöffel_voll = new Image();
    zuckerlöffel_voll.src = "../img/löffelchen_zucker_bittre_medizin_versüßt.png";

    let glasdeckel: HTMLAudioElement = new Audio('/weihnachten/content/mp3/glasdeckel.mp3');
    let korken: HTMLAudioElement = new Audio('/weihnachten/content/mp3/korken.mp3');

    //let referenz = new Image();
    //referenz.src = "../img/referenz.png";

    let ladle: Ladle;

    function setup(): void {
        defineValues();
        crc2.scale(crc2.canvas.width / 2560, crc2.canvas.height / 1152);
        createEntities();
        renderScene();
        window.setInterval(update, (1000 / fps));
        canvas.addEventListener("mousemove", setMousePosition)
        canvas.addEventListener("mousedown", clickHandler);
        canvas.addEventListener("mouseup", upHandler);
        window.addEventListener("resize", resize);
        resize();
    }

    function defineValues(): void {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        mousePosition = new Vector(0, 0);

    }
    function createEntities(): void {
        let tempPosi: Vector = new Vector(1437, 880);
        let tempArea: Vector = new Vector(40, 30);
        let fakeLid: Lid = new Lid(new Vector(0, 0), new Vector(0, 0), 0, piment_deckel, glasdeckel);
        fakeLid.setState(true);
        //Anis (12)
        entities.push(new Spice(fakeLid, new Vector(1090, 840), Math.random() * 360, mousePosition, anis_2, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(980, 820), Math.random() * 360, mousePosition, anis_1, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1080, 780), Math.random() * 360, mousePosition, anis_2, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1020, 795), Math.random() * 360, mousePosition, anis_1, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1040, 820), Math.random() * 360, mousePosition, anis_2, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1070, 810), Math.random() * 360, mousePosition, anis_1, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1110, 830), Math.random() * 360, mousePosition, anis_2, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1050, 870), Math.random() * 360, mousePosition, anis_1, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1000, 850), Math.random() * 360, mousePosition, anis_2, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1060, 850), Math.random() * 360, mousePosition, anis_1, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1020, 860), Math.random() * 360, mousePosition, anis_2, "Anis"));
        entities.push(new Spice(fakeLid, new Vector(1080, 860), Math.random() * 360, mousePosition, anis_1, "Anis"));

        let tempPimentLid: Lid = new Lid(new Vector(1567, 824), new Vector(1630, 920), 180, piment_deckel, glasdeckel);
        //Piment Deckel
        entities.push(tempPimentLid);

        //Nelken Generator (10)
        for (let i: number = 0; i < 10; i++) {
            if (Math.random() > 0.5) {
                entities.push(new Spice(fakeLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, nelke_1, "Nelke"));
            } else {
                entities.push(new Spice(fakeLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, nelke_2, "Nelke"));
            }
        }

        //Piment Generator (30)
        tempPosi.set(1555, 860);
        tempArea.set(25, 45);
        for (let i: number = 0; i < 30; i++) {
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    entities.push(new Spice(tempPimentLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, piment_1, "Piment"));
                    break;
                case 1:
                    entities.push(new Spice(tempPimentLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, piment_2, "Piment"));
                    break;
                case 2:
                    entities.push(new Spice(tempPimentLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, piment_3, "Piment"));
                    break;
                case 3:
                    entities.push(new Spice(tempPimentLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, piment_4, "Piment"));
                    break;
                default:
                    entities.push(new Spice(tempPimentLid, new Vector(tempPosi.x + (Math.random() * tempArea.x), tempPosi.y + (Math.random() * tempArea.y)), Math.random() * 360, mousePosition, piment_5, "Piment"));
            }
        }


        let tempWineLid: Lid = new Lid(new Vector(834, 613), new Vector(715, 908), -90, wein_korken, korken);
        entities.push(new Wine(new Vector(826, 766), tempWineLid, mousePosition, wein_flasche, wein_flasche_b, wein_flasche_c, wein_flasche_leer, wein_strahl_1, wein_strahl_2, wein_strahl_3));
        entities.push(tempWineLid);

        //Schöpflöffel
        ladle = new Ladle(new Vector(1665, 490), 0, schöpflöffel, schöpflöffel_voll);
        entities.push(ladle);

        // Orangen
        let tempOrange1: Orange = new Orange(new Vector(525, 740), 0, mousePosition, orange_1, orange_halbiert, orange_geviertelt, orange_gestückelt, orange_zermatscht, orange_scheiben);
        let tempOrange2: Orange = new Orange(new Vector(610, 758), 0, mousePosition, orange_2, orange_halbiert, orange_geviertelt, orange_gestückelt, orange_zermatscht, orange_scheiben);
        entities.push(tempOrange1);
        entities.push(tempOrange2);

        // Zimt
        entities.push(new Spice(fakeLid, new Vector(1135, 820), 0, mousePosition, zimt_1, "Zimt"));
        entities.push(new Spice(fakeLid, new Vector(1155, 830), 0, mousePosition, zimt_2, "Zimt"));
        entities.push(new Spice(fakeLid, new Vector(1134, 867), -10, mousePosition, zimt_1, "Zimt"));
        entities.push(new Spice(fakeLid, new Vector(1145, 860), -5, mousePosition, zimt_2, "Zimt"));
        entities.push(new Spice(fakeLid, new Vector(1163, 874), 5, mousePosition, zimt_1, "Zimt"));
        entities.push(new Spice(fakeLid, new Vector(1175, 860), 5, mousePosition, zimt_2, "Zimt"));

        // Zimtstange vorne
        entities.push(new Spice(fakeLid, new Vector(1175, 925), 0, mousePosition, zimt_3, "Zimt"));

        //Messer
        entities.push(new Knife(mousePosition, new Vector(1690, 912), tempOrange1, tempOrange2, messer))

        //Löffel
        entities.push(new Spoon(new Vector(1250, 928), mousePosition, zuckerlöffel, zuckerlöffel_voll));

        // Knöpfe
        let tempButton0: Button = new Button(new Vector(1800, 992), knopf_0, light_0, knopf_0_gedrückt, 0, pot);
        let tempButton1: Button = new Button(new Vector(1845, 1000), knopf_1, light_1, knopf_1_gedrückt, 1.5, pot);
        let tempButton2: Button = new Button(new Vector(1895, 1000), knopf_2, light_2, knopf_2_gedrückt, 2, pot);

        tempButton0.setButtons(tempButton0, tempButton1, tempButton2);
        tempButton1.setButtons(tempButton0, tempButton1, tempButton2);
        tempButton2.setButtons(tempButton0, tempButton1, tempButton2);

        entities.push(tempButton0);
        entities.push(tempButton1);
        entities.push(tempButton2);

        pot = new Pot();
        for (let i: number = 0; i < entities.length; i++) {
            entities[i].setPot(pot);
        }
    }

    function update(): void {
        if (!ladle.hasFinished()) {
            if (checkHovering()) {
                canvas.style.cursor = "hand";
            } else {
                lastHover = noSelection;
                canvas.style.cursor = "default";
            }
            pot.updatePot();
            renderScene();
        } else {
            renderScore();
        }
    }
    function renderScene(): void {
        drawImg(crc2, bgTex, 0, 0, 1);
        drawImg(crc2, haken_1, 1655, 470, 1),
        //drawImg(crc2, referenz, 0, 0, 0.5);
        drawImg(crc2, topf_hinten, 1700, 790, 1);
        drawImg(crc2, tassenregal, 567, 293, 1);
        renderEntities(0, 55);
        drawImg(crc2, anis_glas, 937, 697, 1);
        drawImg(crc2, zucker, 1300, 791, 1);
        drawImg(crc2, orangenschale_hinten, 385, 726, 1);
        drawImg(crc2, nelken_glas_hinten, 1430, 830, 1);
        drawImg(crc2, nelken_glas_vorn, 1404, 825, 1);
        drawImg(crc2, piment_glas, 1530, 820, 1);
        drawImg(crc2, brett, 726, 880, 1);
        renderEntities(55, entities.length - 12);
        renderDragEntities();
        drawImg(crc2, haken_2, 1650, 465, 1),
        drawImg(crc2, orangenschale_vorne, 395, 755, 1);
        renderEntities(entities.length - 12, entities.length - 6);
        drawImg(crc2, zimtstangen_dose_einzeln, 1120, 855, 1);
        drawImg(crc2, zimtstangen_deckel, 1243, 905, 1);
        renderEntities(entities.length - 6, entities.length - 3);
        drawImg(crc2, topf_vorne, 1735, 810, 1);
        drawImg(crc2, löffel, 320, 695, 1);
        renderEntities(entities.length - 3, entities.length);

        document.getElementById("output").innerHTML = pot.getString();
        pot.printTemperature();
        if (pot.getCoundown() == 60) {
            document.getElementById("timer").innerHTML = "";
        } else {
            document.getElementById("timer").innerHTML = pot.getCoundown() + "";
        }

    }
    function renderScore(): void {
        pot.giveRating();
    }

    function renderEntities(_from: number, _to: number): void {
        for (let i: number = _from; i < _to; i++) {
            entities[i].draw(crc2, false);
        }
    }

    function renderDragEntities(): void {
        for (let i: number = 0; i < entities.length; i++) {
            if (entities[i].isDragging()) {
                entities[i].draw(crc2, true);
            }
        }
    }

    function drawImg(_crc2: CanvasRenderingContext2D, _image: HTMLImageElement, x1: number, y1: number, _alpha: number): void {
        if (!_image.complete) {
            setTimeout(function () {
                drawImg(_crc2, _image, x1, y1, _alpha);
            }, 10);
            return;
        }
        if (_alpha < 1) {
            _crc2.globalAlpha = _alpha;
            _crc2.drawImage(_image, x1, y1, bgTex.width, bgTex.height);
            _crc2.globalAlpha = 1;
        } else {
            _crc2.drawImage(_image, x1, y1);
        }
    }

    function checkHovering(): boolean {
        for (let i: number = 0; i < entities.length; i++) {
            if (entities[i].isDragging()) {
                return false;
            }
        }
        let tempHover: boolean = false;
        for (let i: number = 0; i < entities.length; i++) {
            if (entities[i].checkHover(mousePosition, crc2)) {
                lastHover = i;
                tempHover = true;
            }
        }
        return tempHover;
    }
    function clickHandler(_event: any): void {
        if (lastHover != noSelection) {
            entities[lastHover].click(_event);
        }
    }

    function upHandler(_event: any): void {
        for (let i: number = 0; i < entities.length; i++) {
            if (entities[i].isDragging()) {
                entities[i].stopDragging();
            }
        }
        for (let i: number = entities.length - 3; i < entities.length - 2; i++) {
            entities[i].mouseUp();
        }
    }

    function setMousePosition(_event: any): void {
        mousePosition.set(_event.offsetX, _event.offsetY);
    }

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth * (1152 / 2560);
        crc2.scale(crc2.canvas.width / 2560, crc2.canvas.height / 1152)
        document.getElementById("infopanel").style.height = window.innerWidth * (1152 / 2560) + "px";
    }
}