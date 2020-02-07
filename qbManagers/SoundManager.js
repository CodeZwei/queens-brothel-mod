/**
 * Config file used for creating sound effects.
 * @typedef SoundManager.soundConfig
 * @property {string} Girl - ID of girl
 * @property {string} ID - Sound clip ID, used for playing the sound effect that should be stored in the loader
 * @property {number} MaxVolume - The highest the volume should go. Starts at 0, ends at 1
 * @property {Array<GirlManager.bodyPart>} BodyParts - What body parts should use this sound effect
 * @property {'Slow'|'Medium'|'Fast'} Speed - What speed should this sound effect be categorized as?
 */

/**
 * @class SoundManager
 */
class SoundManager {
    constructor() {
        this.currentSound = {girl: false, body: false, speed: false};
        this._sounds = {
            Queen: {
                Slow: [],
                Medium: [],
                Fast: []
            },
            Suki: {
                Slow: [],
                Medium: [],
                Fast: []
            },
            Esxea: {
                Slow: [],
                Medium: [],
                Fast: []
            },
            Scarlett: {
                Slow: [],
                Medium: [],
                Fast: []
            },
            Ardura: {
                Slow: [],
                Medium: [],
                Fast: []
            }
        }
    }

    _initSounds() {
        // Queen
        this.addSound({
            Girl: "Queen",
            ID: "Queen-BJ-Medium-1",
            MaxVolume: 0.4,
            BodyParts: ['Throat'],
            Speed: "Slow"
        });
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
            ID: "Queen-Moan-Slow-1",
            MaxVolume: 0.4,
            BodyParts: ['Tits', 'Pussy', 'Anal'],
            Speed: "Slow"
        });
        this.addSound({
            Girl: "Queen",
            ID: "Queen-Moan-Slow-1",
            MaxVolume: 0.4,
            BodyParts: ['Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Queen",
            ID: "Queen-Moan-Slow-1",
            MaxVolume: 0.4,
            BodyParts: ['Tits'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Queen",
            ID: "Queen-Moan-Medium-1",
            MaxVolume: 0.4,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Queen",
            ID: "Queen-Moan-Fast-1",
            MaxVolume: 0.4,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Fast"
        });

        // Suki
        this.addSound({
            Girl: "Suki",
            ID: "Suki-BJ-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Throat'],
            Speed: "Slow"
        });
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
            ID: "Suki-Moan-Slow-1",
            MaxVolume: 0.3,
            BodyParts: ['Tits', 'Pussy', 'Anal'],
            Speed: "Slow"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-Moan-Slow-1",
            MaxVolume: 0.3,
            BodyParts: ['Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-Moan-Slow-1",
            MaxVolume: 0.3,
            BodyParts: ['Tits'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-Moan-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Suki",
            ID: "Suki-Moan-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Fast"
        });

        // Esxea
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-BJ-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Throat'],
            Speed: "Slow"
        });
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
            ID: "Esxea-Moan-Slow-1",
            MaxVolume: 0.3,
            BodyParts: ['Tits', 'Pussy', 'Anal'],
            Speed: "Slow"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-Moan-Slow-1",
            MaxVolume: 0.3,
            BodyParts: ['Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-Moan-Slow-1",
            MaxVolume: 0.3,
            BodyParts: ['Tits'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-Moan-Medium-1",
            MaxVolume: 0.7,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Esxea",
            ID: "Esxea-Moan-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Fast"
        });

        // Scarlett
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-BJ-Medium-1",
            MaxVolume: 1,
            BodyParts: ['Throat'],
            Speed: "Slow"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-BJ-Medium-2",
            MaxVolume: 1,
            BodyParts: ['Throat'],
            Speed: "Slow"
        });
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
            ID: "Scarlett-Moan-Slow-1",
            MaxVolume: 1,
            BodyParts: ['Tits', 'Pussy', 'Anal'],
            Speed: "Slow"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-Moan-Slow-1",
            MaxVolume: 1,
            BodyParts: ['Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-Moan-Slow-1",
            MaxVolume: 1,
            BodyParts: ['Tits'],
            Speed: "Fast"
        })
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-Moan-Medium-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Scarlett",
            ID: "Scarlett-Moan-Fast-1",
            MaxVolume: 1,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Fast"
        });

        // Ardura

        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-BJ-Medium-1",
            MaxVolume: 0.4,
            BodyParts: ['Throat'],
            Speed: "Slow"
        });
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
            ID: "Ardura-Moan-Slow-1",
            MaxVolume: 0.4,
            BodyParts: ['Tits', 'Pussy', 'Anal'],
            Speed: "Slow"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-Moan-Slow-1",
            MaxVolume: 0.4,
            BodyParts: ['Tits'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-Moan-Slow-1",
            MaxVolume: 0.4,
            BodyParts: ['Tits'],
            Speed: "Fast"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-Moan-Medium-1",
            MaxVolume: 0.4,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Medium"
        });
        this.addSound({
            Girl: "Ardura",
            ID: "Ardura-Moan-Fast-1",
            MaxVolume: 0.4,
            BodyParts: ['Pussy', 'Anal'],
            Speed: "Fast"
        });
    }

    /**
     * @method playSound
     * @memberOf SoundManager
     * @instance
     * @param {string} girlID
     * @param {GirlManager.bodyPart} bodyPart
     * @param {'Slow'|'Medium'|'Fast'} speed
     */
    playSound(girlID, bodyPart, speed) {
        this.stopAll();
        try {
            let lube = GAME.sound.add('Lube-' + speed);

            lube.play({
                loop: true,
                volume: 1,
                seek: chance.integer({min: 0, max: Math.floor(lube.duration)})
            });

            if (bodyPart === 'Pussy' || bodyPart === 'Anal') {
                let ballSlap = GAME.sound.add('Ballslap-' + speed);

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
    }

    /**
     * @method addSound
     * @memberOf SoundManager
     * @instance
     * @param {SoundManager.soundConfig} soundConfig
     */
    addSound(soundConfig) {
        if (this._sounds.hasOwnProperty(soundConfig.Girl) === false) {
            this._sounds[soundConfig.Girl] = {
                Slow: [],
                Medium: [],
                Fast: []
            }
        }

        this._sounds[soundConfig.Girl][soundConfig.Speed].push({
            ID: soundConfig.ID,
            MaxVolume: soundConfig.MaxVolume,
            BodyParts: soundConfig.BodyParts
        });
    }
}

