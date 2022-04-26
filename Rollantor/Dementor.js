var Rollantor;
(function (Rollantor) {
    class Dementor {
        constructor(_crc2) {
            this.pos = new Rollantor.Vector(0, 0);
            this.velocity = new Rollantor.Vector(0, 0);
            this.speed = 7;
            this.rot = 0;
            this.rotFac = 3;
            this.width = 50;
            this.height = 50;
            this.crc2 = _crc2;
            this.pos.set(2560 / 2, 1000);
        }
        draw() {
            this.crc2.fillStyle = "#00ffff";
            this.crc2.save();
            this.crc2.translate(this.pos.x, this.pos.y);
            this.crc2.rotate(this.rot * (Math.PI / 180));
            this.crc2.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            this.crc2.restore();
        }
        move(_left, _right, _up, _down) {
            if (_left && !_right) {
                this.rot -= this.rotFac;
            }
            if (_right && !_left) {
                this.rot += this.rotFac;
            }
            if (this.rot > 180) {
                this.rot -= 360;
            }
            else if (this.rot < -180) {
                this.rot += 360;
            }
            let tempDir = new Rollantor.Vector(Math.sin(this.rot * Math.PI / 180), -Math.cos(this.rot * Math.PI / 180));
            //console.log(tempDir);
            if (_up) {
                this.velocity.set(Rollantor.Vector.getuberVector(this.speed, tempDir).x, Rollantor.Vector.getuberVector(this.speed, tempDir).y);
            }
            else if (_down) {
                this.velocity.set(Rollantor.Vector.getuberVector(this.speed, new Rollantor.Vector(-tempDir.x, -tempDir.y)).x, Rollantor.Vector.getuberVector(this.speed, new Rollantor.Vector(-tempDir.x, -tempDir.y)).y);
            }
            else {
                this.velocity.set(0, 0);
            }
            this.pos.add(this.velocity);
        }
    }
    Rollantor.Dementor = Dementor;
})(Rollantor || (Rollantor = {}));
//# sourceMappingURL=Dementor.js.map