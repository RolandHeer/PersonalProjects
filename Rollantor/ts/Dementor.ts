namespace Rollantor {
    export class Dementor {
        private crc2: CanvasRenderingContext2D

        private pos: Vector = new Vector(0, 0);
        private velocity: Vector = new Vector(0, 0);
        private speed: number = 0;
        private MaxSpeed: number = 6;
        private accel: number = 0.1;
        private rot: number = 0;
        private rotFacMax: number = 3;
        private rotFac: number = 0;
        private turnAccel: number = 0.1;

        private width: number = 50;
        private height: number = 50;

        private img: HTMLImageElement;

        constructor(_crc2: CanvasRenderingContext2D, _img: HTMLImageElement) {
            this.crc2 = _crc2;
            this.img = _img;
            this.pos.set(_crc2.canvas.width / 2, _crc2.canvas.height * 0.9);
        }
        public draw(): void {
            this.crc2.save();
            this.crc2.fillStyle = "#00ffff";
            this.crc2.translate(this.pos.x, this.pos.y);
            this.crc2.rotate(this.rot * (Math.PI / 180));
            this.crc2.fillRect(- this.width / 2, - this.height / 2, this.width, this.height);
            this.crc2.drawImage(this.img, - this.img.width / 4, - this.img.height / 4, this.img.width / 2, this.img.height / 2);
            this.crc2.fillRect(0, 5, 80 * this.rotFac, 10);
            this.crc2.restore();
        }
        public move(_left: boolean, _right: boolean, _up: boolean, _down: boolean): void {

            if (_left && !_right) {
                if (this.rotFac > - this.rotFacMax) {
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
                    } else {
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
            } else if (this.rot < -180) {
                this.rot += 360;
            }
            let tempDir: Vector = new Vector(Math.sin(this.rot * Math.PI / 180), -Math.cos(this.rot * Math.PI / 180));
            if (_up) {
                if (this.speed < this.MaxSpeed) {
                    this.speed += this.accel;
                }
                this.velocity.set(Vector.getuberVector(this.speed, tempDir).x, Vector.getuberVector(this.speed, tempDir).y);
            } else if (_down) {
                if (this.speed > -this.MaxSpeed) {
                    this.speed -= this.accel;
                }
                this.velocity.set(Vector.getuberVector(this.speed, tempDir).x, Vector.getuberVector(this.speed, tempDir).y);
                //this.velocity.set(Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).x, Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).y);
            } else {
                this.speed = 0;
                this.velocity.set(0, 0);
            }
            this.pos.add(this.velocity);
        }
        public getPos(): Vector {
            return this.pos;
        }
    }
}