/**
 * @typedef AnimationManager.animationConfig
 * @property {string} ID
 * @property {number} frameRate
 * @property {function|array} frames - Pass the createFrames function or a completed Phaser frames array into this parameter
 */

/**
 * @typedef AnimationManager.galleryObject
 * @property {string} thumbnail - The texture key of the thumbnail that is going to be used in the gallery, usually the first frame of the animation
 * @property {'Animation'|'Image'} type - The type of animation. Either a still "Image" or an "Animation"
 * @property {string} animationID - The animation ID for playing the animation
 */

/**
 * This class will let you handle all of the sex scenes
 * @class AnimationManager
 */
class AnimationManager {
    constructor() {
        this._animations = {};
        this._gallery = [];
    }

    /**
     * @method createAnimation
     * @memberOf AnimationManager
     * @instance
     * @param {AnimationManager.animationConfig} config
     * @example
     * // 27 frame animation. QueenThroatdefault00000 to QueenThroatdefault00026
     * GAME.animation.createAnimation({
     *     ID: "QueenThroatdefault",
     *     frameRate: 24,
     *     frames: () => {
     *          GAME.animation.createFrames('QueenThroatdefault', 0, 13, 5);
     *     }
     * });
     * @example
     * // Only one image in animation
     * GAME.animation.createAnimation({
     *     ID: "townFuckQuest3",
     *     frameRate: 1,
     *     frames: [{key: "townFuckQuest3"}]
     * }
     * @example
     * // Only two images in animation
     * GAME.animation.createAnimation({
     *     ID: "forestBeastQuest1",
     *     frameRate: 1,
     *     frames: [{key: 'forestBeastQuest1'}, {key: 'forestBeastQuest2'}]
     * }
     */
    createAnimation(config) {
        this._animations[config.ID] = {};
        this._animations[config.ID].ID = config.ID;
        this._animations[config.ID].frameRate = config.frameRate;

        if (typeof config.frames === "function") {
            this._animations[config.ID].frames = config.frames();
        } else {
            this._animations[config.ID].frames = config.frames;
        }
    }

    /**
     * Returns an animation object that Phaser can use
     * @method getAnimation
     * @memberOf AnimationManager
     * @instance
     * @param {string} animationID
     * @return {object}
     */
    getAnimation(animationID) {
        if (this._animations.hasOwnProperty(animationID)) {

            return {
                key: 'video',
                repeat: -1,
                frameRate: this._animations[animationID].frameRate,
                frames: this._animations[animationID].frames
            };
        } else {
            return false;
        }
    }

    /**
     * Launches the animation scene and plays the animation. Returns a promise so don't forget to resolve it
     * @method playAnimation
     * @memberOf AnimationManager
     * @instance
     * @param {string} animationID
     * @return {Promise<any>}
     */
    playAnimation(animationID) {
        return new Promise((resolve) => {
            game.scene.start('PlayVideo', {pauseAllScenes: true, video: animationID});
            game.scene.getScene('PlayVideo').events.once('shutdown', resolve);
        });
    }

    /**
     * Creates the frames array for the animation
     * @method createFrames
     * @memberOf AnimationManager
     * @instance
     * @param {string} animationID
     * @param {number} start - The starting frame of the animation, usually 0
     * @param {number} stop - The stopping frame of the animation. For example QueenThroatdefault ends on frame 26
     * @param {number} [pad=5] - Padding is how many 0s there are in the picture files. For example QueenThroatdefault00001 has 5 padding.
     * @return {Array}
     */
    createFrames(animationID, start, stop, pad) {
        pad = pad || 5;
        let frames = [];
        for (start; start <= stop; start++) {
            frames.push({key: animationID + start.toString().padStart(pad, "0")});
        }
        return frames;
    }


    /**
     * Returns an array of available gallery animations
     * @method getGallery
     * @memberOf AnimationManager
     * @instance
     * @return {Array}
     */
    getGallery() {
        let gallery = [];
        for (let i in this._gallery) {
            let array = this._gallery[i]();

            for (let obj in array) {
                gallery.push(array[obj]);
            }
        }
        return gallery;
    }

    /**
     * Add a function that returns an array of {@link AnimationManager.galleryObject}
     * @method addToGallery
     * @memberOf AnimationManager
     * @instance
     * @param {function} callback - Function must return an array
     */
    addToGallery(callback) {
        this._gallery.push(callback);
    }

    /**
     * The game's animations. Use this as a template for your own animations
     * @method _initAnimations
     * @memberOf AnimationManager
     * @instance
     * @private
     */
    _initAnimations() {
        // Will leave this method here as an example for mods
        this.createAnimation({
            ID: 'battleNullImage',
            frameRate: 1,
            frames: [{key: 'battleNullImage'}]
        });
        this.createAnimation({
            ID: 'QueenFreeBlowjobs',
            frameRate: 1,
            frames: [{key: 'QueenFreeBlowjobs'}]
        });
        this.createAnimation({
            ID: 'QueenThroatdefault',
            frameRate: 24,
            frames: this.createFrames('QueenThroatdefault', 0, 13, 5)
        });
        this.createAnimation({
            ID: 'QueenPussydefault',
            frameRate: 24,
            frames: this.createFrames('QueenPussydefault', 0, 12, 5)
        });
        this.createAnimation({
            ID: 'QueenAssGrab',
            frameRate: 1,
            frames: [{key: 'QueenAssGrab'}]
        });
        this.createAnimation({
            ID: 'QueenLeonAlphaBlack',
            frameRate: 1,
            frames: [{key: 'QueenLeonAlphaBlack'}]
        });
        // this.createAnimation({
        //     ID: 'QueenHandsdefault',
        //     frameRate: 24,
        //     frames: this.createFrames('QueenHandsdefault', 0, 15, 5)
        // });
        this.createAnimation({
            ID: 'QueenDanielMilk',
            frameRate: 1,
            frames: [{key: 'QueenDanielMilk'}]
        });
        this.createAnimation({
            ID: 'SukiDanielCum',
            frameRate: 1,
            frames: [{key: 'SukiDanielCum'}]
        });
        this.createAnimation({
            ID: 'SukiPrincipalThighs',
            frameRate: 1,
            frames: [{key: 'SukiPrincipalThighs'}]
        });
        this.createAnimation({
            ID: 'SukiSpitroastOrcs',
            frameRate: 1,
            frames: [{key: 'SukiSpitroastOrcs'}]
        });
        this.createAnimation({
            ID: 'SukiClassFuck',
            frameRate: 1,
            frames: [{key: 'SukiClassFuck'}]
        });
        this.createAnimation({
            ID: 'SukiPussydefault',
            frameRate: 24,
            frames: this.createFrames('SukiPussydefault', 0, 15, 5)
        });
        this.createAnimation({
            ID: 'SukiHandsdefault',
            frameRate: 24,
            frames: this.createFrames('SukiHandsdefault', 0, 13, 5)
        });
        this.createAnimation({
            ID: 'SukiThroatdefault',
            frameRate: 24,
            frames: this.createFrames('SukiThroatdefault', 0, 12, 5)
        });
        this.createAnimation({
            ID: 'SukiAnaldefault',
            frameRate: 24,
            frames: this.createFrames('SukiAnaldefault', 0, 14, 5)
        });
        this.createAnimation({
            ID: 'EsxeaPussydefault',
            frameRate: 24,
            frames: this.createFrames('EsxeaPussydefault', 0, 10, 5)
        });
        this.createAnimation({
            ID: 'QueenNirvokkDoggy',
            frameRate: 1,
            frames: [{key: 'QueenNirvokkDoggy'}]
        });
        this.createAnimation({
            ID: 'forestBeastPussy',
            frameRate: 24,
            frames: this.createFrames('forestBeastPussy', 0, 12, 5)
        });
        this.createAnimation({
            ID: 'forestBeastThroat',
            frameRate: 24,
            frames: this.createFrames('forestBeastThroat', 0, 13, 5)
        });
        // this.createAnimation({
        //     ID: 'goblinBossPussy',
        //     frameRate: 24,
        //     frames: this.createFrames('goblinBossPussy', 0, 13, 5)
        // });
        this.createAnimation({
            ID: 'ScarlettPeasantsMilk',
            frameRate: 1,
            frames: [{key: 'ScarlettPeasantsMilk'}]
        });
        this.createAnimation({
            ID: 'ScarlettTitsdefault',
            frameRate: 24,
            frames: this.createFrames('ScarlettTitsdefault', 0, 18, 5)
        });
        // this.createAnimation({
        //     ID: 'kingsQuestBossFuckMilk',
        //     frameRate: 24,
        //     frames: this.createFrames('kingsQuestBossFuckMilk', 0, 18, 5)
        // });
        // this.createAnimation({
        //     ID: 'kingsQuestBossSuck',
        //     frameRate: 24,
        //     frames: this.createFrames('kingsQuestBossSuck', 0, 16, 5)
        // });
        this.createAnimation({
            ID: 'ScarlettAnaldefault',
            frameRate: 24,
            frames: this.createFrames('ScarlettAnaldefault', 0, 18, 5)
        });
        // this.createAnimation({
        //     ID: 'ScarlettAnaldefaultCum',
        //     frameRate: 24,
        //     frames: this.createFrames('ScarlettAnaldefaultCum', 0, 75, 5)
        // });
        this.createAnimation({
            ID: 'ScarlettGuardAnalCum',
            frameRate: 1,
            frames: [{key: 'ScarlettGuardAnalCum'}]
        });
        this.createAnimation({
            ID: 'QueenOrcBattle',
            frameRate: 1,
            frames: [{key: 'QueenOrcBattle'}]
        });
    }

    /**
     * The game's gallery functions. Use this as a template for your own gallery conditions
     * @method _initGallery
     * @memberOf AnimationManager
     * @instance
     * @private
     */
    _initGallery() {
        this.addToGallery(function () {
            // Town Fuck Quest
            if (GAME.quest.isComplete('townFuckQuest', 'End') === true) {
                return [{
                    thumbnail: 'QueenFreeBlowjobs',
                    type: 'Image',
                    animationID: 'QueenFreeBlowjobs'
                }, {
                    thumbnail: 'QueenThroatdefault00000',
                    type: 'Animation',
                    animationID: 'QueenThroatdefault'
                }, {
                    thumbnail: 'QueenPussydefault00000',
                    type: 'Animation',
                    animationID: 'QueenPussydefault'
                }];
            }
        });
        this.addToGallery(function () {
            // AlphaBlack
            if (GAME.quest.isComplete('alphaBlack') === true) {
                return [{
                    thumbnail: 'QueenLeonAlphaBlack',
                    type: 'Image',
                    animationID: 'QueenLeonAlphaBlack'
                }];
            }
        })
        this.addToGallery(function () {
            // Town Morals
            if (GAME.quest.isComplete('townMorals') === true) {
                return [{
                    thumbnail: 'QueenAssGrab',
                    type: 'Image',
                    animationID: 'QueenAssGrab'
                }];
            }
        })
        this.addToGallery(function () {
            // Forest Beast Quest
            if (GAME.quest.isComplete('hornyBoris', 'End') === true) {
                return [{
                    thumbnail: 'QueenNirvokkDoggy',
                    type: 'Image',
                    animationID: 'QueenNirvokkDoggy'
                }, {
                    thumbnail: 'forestBeastPussy00000',
                    type: 'Animation',
                    animationID: 'forestBeastPussy'
                }, {
                    thumbnail: 'forestBeastThroat00000',
                    type: 'Animation',
                    animationID: 'forestBeastThroat'
                }];
            }
        });
        this.addToGallery(function () {
            // Suki Animations
            if (GAME.girl.Suki.isUnlocked()) {
                return [{
                    thumbnail: 'QueenDanielMilk',
                    type: 'Image',
                    animationID: 'QueenDanielMilk'
                }, {
                    thumbnail: 'SukiDanielCum',
                    type: 'Image',
                    animationID: 'SukiDanielCum'
                }, {
                    thumbnail: 'SukiPussydefault00000',
                    type: 'Animation',
                    animationID: 'SukiPussydefault'
                }, {
                    thumbnail: 'SukiThroatdefault00000',
                    type: 'Animation',
                    animationID: 'SukiThroatdefault'
                }, {
                    thumbnail: 'SukiAnaldefault00000',
                    type: 'Animation',
                    animationID: 'SukiAnaldefault'
                }]
            }
        });
        this.addToGallery(function () {
            // principalFeetQuest
            if (GAME.quest.isComplete('principalFeetQuest') === true) {
                return [{
                    thumbnail: 'SukiPrincipalThighs',
                    type: 'Image',
                    animationID: 'SukiPrincipalThighs'
                }]
            }
        });
        this.addToGallery(function () {
            // principalFeetQuest
            if (GAME.quest.isComplete('abigailCumQuest') === true) {
                return [{
                    thumbnail: 'SukiClassFuck',
                    type: 'Image',
                    animationID: 'SukiClassFuck'
                }]
            }
        });
        this.addToGallery(function () {
            // Esxea Animations
            if (GAME.girl.Esxea.isUnlocked()) {
                return [{
                    thumbnail: 'EsxeaPussydefault00000',
                    type: 'Animation',
                    animationID: 'EsxeaPussydefault'
                }]
            }
        });
        this.addToGallery(function () {
            // Mushroom Quest
            if (GAME.quest.isComplete('mushroomQuest') === true) {
                return [{
                    thumbnail: 'SukiHandsdefault00000',
                    type: 'Animation',
                    animationID: 'SukiHandsdefault'
                }];
            }
        });
        this.addToGallery(function () {
            // Kings Quest
            if (GAME.quest.isComplete('kingsQuest') === true) {
                return [{
                    thumbnail: 'ScarlettPeasantsMilk',
                    type: 'Image',
                    animationID: 'ScarlettPeasantsMilk'
                }];
            }
        });
        this.addToGallery(function () {
            // Scarlett Animations
            if (GAME.girl.Scarlett.isUnlocked()) {
                return [{
                    thumbnail: 'ScarlettTitsdefault00000',
                    type: 'Animation',
                    animationID: 'ScarlettTitsdefault'
                }, {
                    thumbnail: 'ScarlettAnaldefault00000',
                    type: 'Animation',
                    animationID: 'ScarlettAnaldefault'
                }]
            }
        });
        this.addToGallery(function () {
            // Battle Orcs
            if (GAME.quest.isComplete('battleOrcs') === true) {
                return [{
                    thumbnail: 'ScarlettGuardAnalCum',
                    type: 'Image',
                    animationID: 'ScarlettGuardAnalCum'
                }, {
                    thumbnail: 'QueenOrcBattle',
                    type: 'Image',
                    animationID: 'QueenOrcBattle'
                }];
            }
        });
        this.addToGallery(function () {
            // Mountain Training
            if (GAME.quest.isComplete('mountainTraining') === true) {
                return [{
                    thumbnail: 'SukiSpitroastOrcs',
                    type: 'Image',
                    animationID: 'SukiSpitroastOrcs'
                }];
            }
        });
    }
}