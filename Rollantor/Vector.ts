namespace Rollantor {
    export class Vector {
        public x: number;
        public y: number;
        public length: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
            this.calcLength();
        }

        public static getRandom(_min: number, _max: number): Vector {
            let tempVector: Vector = new Vector(0, 0);
            tempVector.set(_min + Math.random() * (_max - _min), _min + Math.random() * (_max - _min));
            return tempVector;
        }
        public static getDifference(_v0: Vector, _v1: Vector): Vector {
            let tempVector: Vector = new Vector(0, 0);
            tempVector.set(_v0.x - _v1.x, _v0.y - _v1.y);
            return tempVector;
        }
        public static getSum(_v0: Vector, _v1: Vector): Vector {
            let tempVector: Vector = new Vector(0, 0);
            tempVector.set(_v0.x + _v1.x, _v0.y + _v1.y);
            return tempVector;
        }
        public static getScaled(_v: Vector, _scale: number): Vector {
            let tempVector: Vector = new Vector(0, 0);
            tempVector.set(_v.x * _scale, _v.y * _scale);
            return tempVector;
        }
        public static getLength(_vector: Vector): number {
            let templength: number;
            templength = Math.sqrt((_vector.x * _vector.x) + (_vector.y * _vector.y));
            return templength;
        }
        public static getuberVector(_length: number, _direction: Vector): Vector {
            let tempVector: Vector = new Vector(_direction.x / (_direction.length), _direction.y / (_direction.length));
            tempVector = this.getScaled(tempVector, _length);
            return tempVector;
        }

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
            this.calcLength();

        }
        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
            this.calcLength();
        }
        public clone(): Vector {
            return new Vector(this.x, this.y);
        }

        private calcLength(): void {
            this.length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        }
    }
}