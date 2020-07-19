/**
 * Config file used for creating sound effects.
 * @typedef SoundManager.soundConfig
 * @property {string} Girl - ID of girl
 * @property {string} ID - Sound clip ID, used for playing the sound effect that should be stored in the loader
 * @property {number} MaxVolume - The highest the volume should go. Starts at 0, ends at 1
 * @property {Array<GirlManager.bodyPart>} BodyParts - What body parts should use this sound effect
 * @property {'Slow'|'Medium'|'Fast'} Speed - What speed should this sound effect be categorized as?
 * @property {boolean} isUnique - If the sound is a unique voice line only played when the girl makes a client cum. Will ignore the Speed property
 */

/**
 * @class SoundManager
 */
class SoundManager {
    constructor() {
        this.currentSound = {
            girl: false,
            body: false,
            speed: false,
            girlKey: false,
            ballKey: false,
            lubeKey: false,
            unique: false
        };
        this._sounds = {}
    }

    _initSounds() {
        // Queen
        (() => {
            this.addSound({
                Girl: "Queen",
                ID: "Queen-BJ-Medium-1",
                MaxVolume: 0.4,
                BodyParts: ['Throat'],
                Speed: "Medium"
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-BJ-Fast-1",
                MaxVolume: 0.4,
                BodyParts: ['Throat'],
                Speed: "Fast"
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Moan-Medium-1",
                MaxVolume: 0.4,
                BodyParts: ['Pussy', 'Anal', 'Tits'],
                Speed: "Medium"
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Moan-Fast-1",
                MaxVolume: 0.4,
                BodyParts: ['Pussy', 'Anal', 'Tits'],
                Speed: "Fast"
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Throat-1",
                MaxVolume: 1,
                BodyParts: ['Throat'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Throat-2",
                MaxVolume: 1,
                BodyParts: ['Throat'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Throat-3",
                MaxVolume: 1,
                BodyParts: ['Throat'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Throat-4",
                MaxVolume: 1,
                BodyParts: ['Throat'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Throat-5",
                MaxVolume: 1,
                BodyParts: ['Throat'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Tits-1",
                MaxVolume: 1,
                BodyParts: ['Tits'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Tits-2",
                MaxVolume: 1,
                BodyParts: ['Tits'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Tits-3",
                MaxVolume: 1,
                BodyParts: ['Tits'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Tits-4",
                MaxVolume: 1,
                BodyParts: ['Tits'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Tits-5",
                MaxVolume: 1,
                BodyParts: ['Tits'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Pussy-1",
                MaxVolume: 1,
                BodyParts: ['Pussy'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Pussy-2",
                MaxVolume: 1,
                BodyParts: ['Pussy'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Pussy-3",
                MaxVolume: 1,
                BodyParts: ['Pussy'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Pussy-4",
                MaxVolume: 1,
                BodyParts: ['Pussy'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Pussy-5",
                MaxVolume: 1,
                BodyParts: ['Pussy'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Anal-1",
                MaxVolume: 1,
                BodyParts: ['Anal'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Anal-2",
                MaxVolume: 1,
                BodyParts: ['Anal'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Anal-3",
                MaxVolume: 1,
                BodyParts: ['Anal'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Anal-4",
                MaxVolume: 1,
                BodyParts: ['Anal'],
                isUnique: true
            });
            this.addSound({
                Girl: "Queen",
                ID: "Queen-Anal-5",
                MaxVolume: 1,
                BodyParts: ['Anal'],
                isUnique: true
            });
        })();


        // Suki
        this.addSound({
            Girl: "Suki",
            ID: "Suki-BJ-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Throat'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-BJ-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Throat'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-Moan-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-Moan-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Fast"
        });

        // Esxea
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-BJ-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Throat'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-BJ-Fast-1",
            MaxVolume: 0.7,
            BodyParts: ['Throat'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-Moan-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-Moan-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Fast"
        });

        // Scarlett
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-BJ-Medium-1",
            MaxVolume: 1,
            BodyParts: ['Throat'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-BJ-Medium-2",
            MaxVolume: 1,
            BodyParts: ['Throat'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-BJ-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Throat'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-Moan-Medium-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-Moan-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Fast"
        });

        // Ardura
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-BJ-Medium-1",
            MaxVolume: 0.4,
            BodyParts: ['Throat'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-BJ-Fast-1",
            MaxVolume: 0.4,
            BodyParts: ['Throat'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-Moan-Medium-1",
            MaxVolume: 0.4,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-Moan-Fast-1",
            MaxVolume: 0.4,
            BodyParts: ['Pussy', 'Anal', 'Tits'],
            Speed: "Fast"
        });
    }

    /**
     * @method playSound
     * @memberOf SoundManager
     * @instance
     * @param {string|boolean} girlID - girlID or false to turn off looping sounds
     * @param {GirlManager.bodyPart} bodyPart
     * @param {'Medium'|'Fast'} speed
     */
    playSound(girlID, bodyPart, speed) {
        if (girlID === false) {
            this.removeLoops();
        } else if (this.currentSound.girl !== girlID || this.currentSound.body !== bodyPart || this.currentSound.speed !== speed) {
            this.removeLoops();

            try {
                let lube = GAME.sound.add('Lube-' + speed);
                this.currentSound.lubeKey = 'Lube-' + speed;

                lube.play({
                    loop: true,
                    volume: 1,
                    seek: chance.integer({min: 0, max: Math.floor(lube.duration)})
                });

                if (bodyPart === 'Pussy' || bodyPart === 'Anal') {
                    let ballSlap = GAME.sound.add('Ballslap-' + speed);
                    this.currentSound.ballKey = 'Ballslap-' + speed;

                    ballSlap.play({
                        loop: true,
                        volume: 1,
                        seek: chance.integer({min: 0, max: Math.floor(ballSlap.duration)})
                    });
                }

                let availableSounds = this._sounds[girlID][speed].filter(sound => sound.BodyParts.includes(bodyPart));

                if (availableSounds.length > 0) {
                    let randomSound = chance.pickone(availableSounds);

                    let girlSound = GAME.sound.add(randomSound.ID);
                    this.currentSound.girlKey = randomSound.ID;

                    girlSound.play({
                        loop: true,
                        volume: randomSound.MaxVolume,
                        seek: chance.integer({min: 0, max: Math.floor(girlSound.duration)})
                    })
                }
            } catch (e) {
                console.warn("Sound does not exist", girlID, bodyPart, speed)
            }

            this.currentSound.girl = girlID;
            this.currentSound.body = bodyPart;
            this.currentSound.speed = speed;
        }
    }

    removeLoops() {
        if (this.currentSound.girlKey !== false) {
            GAME.sound.stopByKey(this.currentSound.girlKey);
            GAME.sound.removeByKey(this.currentSound.girlKey);
        }
        if (this.currentSound.ballKey !== false) {
            GAME.sound.stopByKey(this.currentSound.ballKey);
            GAME.sound.removeByKey(this.currentSound.ballKey);
        }
        if (this.currentSound.lubeKey !== false) {
            GAME.sound.stopByKey(this.currentSound.lubeKey);
            GAME.sound.removeByKey(this.currentSound.lubeKey);
        }

        this.currentSound.girl = false;
        this.currentSound.body = false;
        this.currentSound.speed = false;
        this.currentSound.girlKey = false;
        this.currentSound.ballKey = false;
        this.currentSound.lubeKey = false;
    }

    playUnique(girlID, bodyPart) {
        if (this.currentSound.unique === false) {
            if (this._sounds[girlID].Uniques[bodyPart].length > 0) {
                let randomSound = chance.pickone(this._sounds[girlID].Uniques[bodyPart]);


                let girlSound = GAME.sound.add(randomSound.ID);
                this.currentSound.unique = true;

                girlSound.on(Phaser.Sound.Events.STOP, () => {
                    this.currentSound.unique = false;
                });
                girlSound.on(Phaser.Sound.Events.STOP_ALL, () => {
                    this.currentSound.unique = false;
                });
                girlSound.on(Phaser.Sound.Events.COMPLETE, () => {
                    this.currentSound.unique = false;
                });

                girlSound.play({
                    loop: false,
                    volume: randomSound.MaxVolume
                });
            }
        }
    }

    /**
     * @method getCurrentSounds
     * @memberOf SoundManager
     * @instance
     * @returns {{girl: string|boolean, body: string|boolean, speed: string|boolean}}
     */
    getCurrentSound() {
        return this.currentSound;
    }

    /**
     * Volume from 0 to 1.
     * @method volume
     * @memberOf SoundManager
     * @instance
     * @param {number} amount - 0-1
     */
    volume(amount) {
        GAME.sound.volume = amount;
    }

    /**
     * Stops all sound effects
     * @method stopAll
     * @memberOf SoundManager
     * @instance
     */
    stopAll() {
        GAME.sound.stopAll();
        this.currentSound.girl = false;
        this.currentSound.body = false;
        this.currentSound.speed = false;
        this.currentSound.girlKey = false;
        this.currentSound.ballKey = false;
        this.currentSound.lubeKey = false;
        this.currentSound.unique = false;
    }

    /**
     * @method addSound
     * @memberOf SoundManager
     * @instance
     * @param {SoundManager.soundConfig} soundConfig
     */
    addSound(soundConfig) {
        if (soundConfig.hasOwnProperty('isUnique') === false) {
            soundConfig.isUnique = false;
        }

        if (this._sounds.hasOwnProperty(soundConfig.Girl) === false) {
            this._sounds[soundConfig.Girl] = {
                Medium: [],
                Fast: [],
                Uniques: {
                    Throat: [],
                    Tits: [],
                    Pussy: [],
                    Anal: []
                }
            }
        }

        if (soundConfig.isUnique === true) {
            for (let bodyPart of soundConfig.BodyParts) {
                this._sounds[soundConfig.Girl].Uniques[bodyPart].push({
                    ID: soundConfig.ID,
                    MaxVolume: soundConfig.MaxVolume
                })
            }
        } else {
            this._sounds[soundConfig.Girl][soundConfig.Speed].push({
                ID: soundConfig.ID,
                MaxVolume: soundConfig.MaxVolume,
                BodyParts: soundConfig.BodyParts
            });
        }
    }
}

