namespace Schlittenfahrt {
    export class Sleigh extends Anim {
        private broken: boolean = false;
        private finished: boolean = false;
        private posOffset: Vector = new Vector(0, 0);

        private sleighType: number;
        private sleighImg: HTMLImageElement;
        private brokenImg: HTMLImageElement;
        private topSpeed: number;
        private maxAccel: number;
        private turnFactor: number;
        private wokRot: number = 0;
        private wokRotVel: number = 0;
        private wokRotDir: boolean = true;

        private leftBreak: boolean = false;
        private rightBreak: boolean = false;
        private reverse: boolean = false;
        private reversePause: number = 0;

        private currentSpeed: number = 0;   //WARNING: NOT ACTUAL SPEED, RATHER A GENERAL PERCENTAGE FOR DISPLAY SPEED
        private nextRot: number = 0;
        private nextPos: number = 0;
        private delayRot: number = 0;
        private delayPos: number = 0;
        private delayRotTimer: number = 10;
        private delayPosTimer: number = 25;

        constructor(_sleighType: number) {
            super()
            this.sleighType = _sleighType;
            this.position = new Vector(15, -20);
            this.posOffset = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.rotation = 0;
            this.sleighImg = new Image;
            this.brokenImg = new Image;

            switch (_sleighType) {
                case E.Classic:
                    this.sleighImg.src = "../img/schlitten_01_classic.png";
                    this.brokenImg.src = "../img/schlitten_01_classic_zerbrochen.png";
                    this.topSpeed = E.ClassicSpeed / E.SpeedMultiplier;
                    this.maxAccel = E.ClassicAccel;
                    this.turnFactor = E.ClassicTurn;
                    break;
                case E.Sports:
                    this.sleighImg.src = "../img/schlitten_02_sport.png";
                    this.brokenImg.src = "../img/schlitten_02_sport_zerbrochen.png";
                    this.topSpeed = E.SportsSpeed / E.SpeedMultiplier;
                    this.maxAccel = E.SportsAccel;
                    this.turnFactor = E.SportsTurn;
                    break;
                case E.Wok:
                    this.sleighImg.src = "../img/schlitten_03_schüssel.png";
                    this.brokenImg.src = "../img/schlitten_03_schüssel_zerbrochen.png";
                    this.topSpeed = E.WokSpeed / E.SpeedMultiplier;
                    this.maxAccel = E.WokAccel;
                    this.turnFactor = E.WokTurn;
                    break;
                case E.Vintage:
                    this.sleighImg.src = "../img/schlitten_04_vintage.png";
                    this.brokenImg.src = "../img/schlitten_04_vintage_zerbrochen.png";
                    this.topSpeed = E.VintageSpeed / E.SpeedMultiplier;
                    this.maxAccel = E.VintageAccel;
                    this.turnFactor = E.VintageTurn;
                    break;
                default:
                    console.log("unknown Sleightype!");
            }
        }
        public update(_deltaTime: number): void {
            let fps: number = 1000 / this.cropDeltaTime(_deltaTime);        //Momentane FPS
            let dtFactor: number = this.cropDeltaTime(_deltaTime) / 16.6;   //Faktor der Zeit seit letztem Frame
            this.setCurrentSpeed(fps, dtFactor);

            let realAccel: number = this.calcRealAccel();                   //tatsächliche Beschleunigung (Hang-abhängig)
            let realTurnFactor: number = this.calcTurn(fps);                //tatsächliche Lenkkraft
            let addBreakForce: number = this.maxAccel - realAccel;          //additional Breakforce (genereller Abbremswert)
            let realStraight: number = this.calcStraight();

            let tempDir: Vector = new Vector(Math.sin(this.rotation * Math.PI / 180), -Math.cos(this.rotation * Math.PI / 180));    //Momentaner Richtungsvektor

            if (this.finished) {
                if (this.velocity.length > 0) {
                    this.velocity = Vector.getuberVector(this.velocity.length * 0.95, tempDir);
                }
            } else if (!this.reverse) {
                if (this.leftBreak && this.rightBreak) {
                    if (this.velocity.length > 0) {
                        this.velocity = Vector.getuberVector(this.velocity.length - (E.BreakeForce * (fps / 60)) - addBreakForce, tempDir);
                    }
                    if (this.velocity.length * fps < E.ReverseThreshold / E.SpeedMultiplier) {
                        if (this.reversePause > E.ReversePause * fps) {
                            this.reverse = true;
                            this.reversePause = 0;
                        } else {
                            this.reversePause++;
                        }
                    }
                } else if (this.leftBreak) {
                    this.wokRotDir = false;
                    this.reversePause = 0;
                    this.rotation -= realTurnFactor * dtFactor;
                    if (this.velocity.length > 0) {
                        this.velocity = Vector.getuberVector(this.velocity.length - E.BreakeForce / 10 - addBreakForce, tempDir);
                    }
                } else if (this.rightBreak) {
                    this.wokRotDir = true;
                    this.reversePause = 0;
                    this.rotation += realTurnFactor * dtFactor;
                    if (this.velocity.length > 0) {
                        this.velocity = Vector.getuberVector(this.velocity.length - E.BreakeForce / 10 - addBreakForce, tempDir);
                    }
                } else {
                    this.reversePause = 0;
                    if (this.rotation > 0) {
                        this.rotation -= realStraight * dtFactor;
                    } else if (this.rotation < 0) {
                        this.rotation += realStraight * dtFactor;
                    }
                    if (this.velocity.length < this.topSpeed / fps) {
                        this.velocity = Vector.getuberVector(this.velocity.length + realAccel, tempDir);
                    } else {
                        this.velocity = Vector.getuberVector(this.velocity.length - addBreakForce, tempDir);
                    }
                }

            } else {
                if (!this.leftBreak && !this.rightBreak) {
                    this.velocity = new Vector(0, 0);
                    this.reverse = false;
                } else {
                    if (this.leftBreak && !this.rightBreak) {
                        this.rotation -= realStraight * dtFactor;
                    } else if (!this.leftBreak && this.rightBreak) {
                        this.rotation += realStraight * dtFactor;
                    }
                    tempDir = Vector.getScaled(tempDir, -1);
                    let tempVel: Vector = new Vector(0, 0);
                    tempVel.add(Vector.getuberVector((E.BackingSpeed / E.SpeedMultiplier) / 60, tempDir));
                    this.velocity.set(tempVel.x, tempVel.y);
                }
            }

            if (this.rotation > 180) {
                this.rotation -= 360;
            } else if (this.rotation < -180) {
                this.rotation += 360;
            }
            if (this.velocity.length != 0) {
                this.position.add(Vector.getuberVector(this.velocity.length * dtFactor, this.velocity));
            }
            if (this.sleighType == E.Wok) {
                if (this.wokRotDir) {
                    if (this.wokRotVel < 5) {
                        this.wokRotVel += (E.WokRotVel / fps) + (this.velocity.length / 5);
                    }
                } else {
                    if (this.wokRotVel > -5) {
                        this.wokRotVel -= (E.WokRotVel / fps) + (this.velocity.length / 5);
                    }
                }
                this.wokRot += this.wokRotVel;
            }

            let tempSpeed: number = this.getSpeedPercent();
            if (tempSpeed > 0.78) {
                let strength: number = Math.max(0, tempSpeed - 0.78);
                if (this.delayRot == this.delayRotTimer) {
                    this.nextRot = (Math.random() - 0.5) * ((strength * 25) + 10);
                    this.delayRot = 0;
                } else {
                    this.nextRot = this.nextRot / 2;
                    this.rotation += this.nextRot;
                    this.delayRot++;
                }
                if (this.delayPos == this.delayPosTimer) {
                    this.nextPos = (Math.random() * strength * 2) - strength;
                    this.delayPos = 0;
                } else {
                    this.nextPos = this.nextPos / 2;
                    this.posOffset = Vector.getuberVector(this.nextPos, new Vector(-this.velocity.y, this.velocity.x));
                    this.delayPos++;
                }
            } else {
                this.posOffset.set(0, 0);
            }
        }

        public draw(_crc2: CanvasRenderingContext2D, _time: number): void {
            _crc2.save();
            _crc2.translate((this.position.x + this.posOffset.x) * E.PosMultiplier, (this.position.y + this.posOffset.y) * E.PosMultiplier);
            if (this.sleighType == E.Wok) {
                _crc2.rotate(this.wokRot * Math.PI / 180);
            } else {
                _crc2.rotate(this.rotation * Math.PI / 180);
            }
            if (!this.broken) {
                _crc2.drawImage(this.sleighImg, - this.sleighImg.width / 2, - this.sleighImg.height / 2)
            } else {
                _crc2.drawImage(this.brokenImg, - this.sleighImg.width / 2, - this.sleighImg.height / 2)
            }

            _crc2.restore();
        }
        public breakSleigh(): void {
            this.velocity.set(0, 0);
            this.broken = true;
        }
        public setFinished(): void {
            this.finished = true;
        }
        public setLeftBreak(_bool: boolean): void {
            this.leftBreak = _bool;
        }
        public setRightBreak(_bool: boolean): void {
            this.rightBreak = _bool;
        }
        public isLeftBreak(): boolean {
            return this.leftBreak;
        }
        public isRightBreak(): boolean {
            return this.rightBreak;
        }
        public isBroken(): boolean {
            return this.broken;
        }
        public hasFinished(): boolean {
            return this.finished;
        }
        public getPosForCollision(): Vector {
            return new Vector(this.position.x + this.posOffset.x, this.position.y + this.posOffset.y);
        }
        public getSpeed(): number {
            return this.velocity.length * E.SpeedMultiplier;
        }
        public getSpeedPercent(): number {
            return this.currentSpeed;
        }
        private setCurrentSpeed(_fps: number, _dtFactor: number): void {
            if (this.sleighType == E.Vintage || this.sleighType == E.Wok) {
                this.currentSpeed = (this.velocity.length * _dtFactor) / (this.topSpeed * 1.3 / _fps);
            } else if (this.sleighType == E.Classic) {
                this.currentSpeed = (this.velocity.length * _dtFactor) / (this.topSpeed * 1.05 / _fps);
            } else {
                this.currentSpeed = (this.velocity.length * _dtFactor) / (this.topSpeed / _fps);
            }
        }
        private cropDeltaTime(_deltaTime: number): number {
            if (_deltaTime > 128) {
                _deltaTime = 128;
            }
            return _deltaTime;
        }
        private calcRealAccel(): number {
            let tempAccel: number = ((1 - (Math.abs(this.rotation) / 90)) * this.maxAccel);
            if (tempAccel < 0) {
                tempAccel = tempAccel * 5;
            }
            return tempAccel;
        }
        private calcTurn(_fps: number): number {
            return (this.turnFactor * ((1 - (this.velocity.length / (this.topSpeed / _fps)) / 2) + 0.5));
        }
        private calcStraight(): number {
            if (this.sleighType == E.Wok) {
                return E.StraightFactor / 2;
            }
            return E.StraightFactor;
        }
    }
}