var Rollantor;
(function (Rollantor) {
    class Dementor {
        constructor(_crc2, _img) {
            this.pos = new Rollantor.Vector(0, 0);
            this.velocity = new Rollantor.Vector(0, 0);
            this.speed = 0;
            this.MaxSpeed = 6;
            this.accel = 0.1;
            this.rot = 0;
            this.rotFacMax = 3;
            this.rotFac = 0;
            this.turnAccel = 0.1;
            this.width = 50;
            this.height = 50;
            this.crc2 = _crc2;
            this.img = _img;
            this.pos.set(_crc2.canvas.width / 2, _crc2.canvas.height * 0.9);
        }
        draw() {
            this.crc2.save();
            this.crc2.fillStyle = "#00ffff";
            this.crc2.translate(this.pos.x, this.pos.y);
            this.crc2.rotate(this.rot * (Math.PI / 180));
            this.crc2.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
            this.crc2.drawImage(this.img, -this.img.width / 4, -this.img.height / 4, this.img.width / 2, this.img.height / 2);
            this.crc2.fillRect(0, 5, 80 * this.rotFac, 10);
            this.crc2.restore();
        }
        move(_left, _right, _up, _down) {
            if (_left && !_right) {
                if (this.rotFac > -this.rotFacMax) {
                    if (this.rotFac > 0) {
                        this.rotFac -= this.turnAccel * 3;
                    }
                    this.rotFac -= this.turnAccel;
                }
            }
            if (_right && !_left) {
                if (this.rotFac < this.rotFacMax) {
                    if (this.rotFac < 0) {
                        this.rotFac += this.turnAccel * 3;
                    }
                    this.rotFac += this.turnAccel;
                }
            }
            if (!_right && !_left || _right && _left) {
                if (this.rotFac != 0) {
                    if (this.rotFac > 0) {
                        this.rotFac -= this.turnAccel * 3;
                    }
                    else {
                        this.rotFac += this.turnAccel * 3;
                    }
                    if (Math.abs(this.rotFac) < this.turnAccel * 3) {
                        this.rotFac = 0;
                    }
                }
            }
            this.rot += this.rotFac;
            if (this.rot > 180) {
                this.rot -= 360;
            }
            else if (this.rot < -180) {
                this.rot += 360;
            }
            let tempDir = new Rollantor.Vector(Math.sin(this.rot * Math.PI / 180), -Math.cos(this.rot * Math.PI / 180));
            if (_up) {
                if (this.speed < this.MaxSpeed) {
                    this.speed += this.accel;
                }
                this.velocity.set(Rollantor.Vector.getuberVector(this.speed, tempDir).x, Rollantor.Vector.getuberVector(this.speed, tempDir).y);
            }
            else if (_down) {
                if (this.speed > -this.MaxSpeed) {
                    this.speed -= this.accel;
                }
                this.velocity.set(Rollantor.Vector.getuberVector(this.speed, tempDir).x, Rollantor.Vector.getuberVector(this.speed, tempDir).y);
                //this.velocity.set(Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).x, Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).y);
            }
            else {
                this.speed = 0;
                this.velocity.set(0, 0);
            }
            this.pos.add(this.velocity);
        }
        getPos() {
            return this.pos;
        }
    }
    Rollantor.Dementor = Dementor;
})(Rollantor || (Rollantor = {}));
//# sourceMappingURL=Dementor.js.map