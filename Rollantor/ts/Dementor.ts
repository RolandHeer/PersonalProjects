namespace Rollantor {
    export class Dementor {
        private crc2: CanvasRenderingContext2D

        private pos: Vector = new Vector(0, 0);
        private velocity: Vector = new Vector(0, 0);
        private speed: number = 7;
        private rot: number = 0;
        private rotFac: number = 5;

        private width: number = 50;
        private height: number = 50;

        private img: HTMLImageElement;

        constructor(_crc2: CanvasRenderingContext2D, _img: HTMLImageElement) {
            this.crc2 = _crc2;
            this.img = _img;
            this.pos.set(_crc2.canvas.width / 2, _crc2.canvas.height * 0.9);
        }
        public draw(): void {
            this.crc2.fillStyle = "#00ffff";
            this.crc2.save();
            this.crc2.translate(this.pos.x, this.pos.y);
            this.crc2.rotate(this.rot * (Math.PI / 180));
            this.crc2.fillRect(- this.width / 2, - this.height / 2, this.width, this.height);
            this.crc2.drawImage(this.img, - this.img.width / 4, - this.img.height / 4, this.img.width / 2, this.img.height / 2);
            this.crc2.restore();
        }
        public move(_left: boolean, _right: boolean, _up: boolean, _down: boolean): void {

            if (_left && !_right) {
                this.rot -= this.rotFac;
            }
            if (_right && !_left) {
                this.rot += this.rotFac;
            }

            if (this.rot > 180) {
                this.rot -= 360;
            } else if (this.rot < -180) {
                this.rot += 360;
            }
            let tempDir: Vector = new Vector(Math.sin(this.rot * Math.PI / 180), -Math.cos(this.rot * Math.PI / 180));
            if (_up) {
                this.velocity.set(Vector.getuberVector(this.speed, tempDir).x, Vector.getuberVector(this.speed, tempDir).y);
            } else if (_down) {
                this.velocity.set(Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).x, Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).y);
            } else {
                this.velocity.set(0, 0);
            }
            this.pos.add(this.velocity);
        }
        public getPos(): Vector {
            return this.pos;
        }
    }
}