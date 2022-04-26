namespace Rollantor {
    export class Dementor {
        private crc2: CanvasRenderingContext2D

        private pos: Vector = new Vector(0, 0);
        private velocity: Vector = new Vector(0, 0);
        private speed: number = 7;
        private rot: number = 0;
        private rotFac: number = 3;

        private width: number = 50;
        private height: number = 50;

        constructor(_crc2: CanvasRenderingContext2D) {
            this.crc2 = _crc2;
            this.pos.set(2560 / 2, 1000);
        }
        public draw(): void {
            this.crc2.fillStyle = "#00ffff";
            this.crc2.save();
            this.crc2.translate(this.pos.x, this.pos.y);
            this.crc2.rotate(this.rot * (Math.PI / 180));
            this.crc2.fillRect(- this.width / 2, - this.height / 2, this.width, this.height);
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
            //console.log(tempDir);
            if (_up) {
                this.velocity.set(Vector.getuberVector(this.speed, tempDir).x, Vector.getuberVector(this.speed, tempDir).y);
            } else if (_down) {
                this.velocity.set(Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).x, Vector.getuberVector(this.speed, new Vector(-tempDir.x, -tempDir.y)).y);
            } else {
                this.velocity.set(0, 0);
            }
            this.pos.add(this.velocity);
        }
    }
}