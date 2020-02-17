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
            ID: 'QueenThroatdefault',
            frameRate: 24,
            frames: this.createFrames('QueenThroatdefault', 0, 13, 5)
        });
        this.createAnimation({
            ID: 'QueenPussydefault',
            frameRate: 24,
            frames: this.createFrames('QueenPussydefault', 0, 12, 5)
        });
        // this.createAnimation({
        //     ID: 'QueenHandsdefault',
        //     frameRate: 24,
        //     frames: this.createFrames('QueenHandsdefault', 0, 15, 5)
        // });
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
            ID: 'EsxeaPussydefault',
            frameRate: 24,
            frames: this.createFrames('EsxeaPussydefault', 0, 10, 5)
        });
        // this.createAnimation({
        //     ID: 'principalFeetQuest1',
        //     frameRate: 1,
        //     frames: [{key: 'principalFeetQuest1'}]
        // });
        // this.createAnimation({
        //     ID: 'principalFeetQuest2',
        //     frameRate: 1,
        //     frames: [{key: 'principalFeetQuest2'}, {key: 'principalFeetQuest3'}]
        // });
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
        this.createAnimation({
            ID: 'goblinBossPussy',
            frameRate: 24,
            frames: this.createFrames('goblinBossPussy', 0, 13, 5)
        });
        this.createAnimation({
            ID: 'kingsQuestBossFuck',
            frameRate: 24,
            frames: this.createFrames('kingsQuestBossFuck', 0, 18, 5)
        });
        this.createAnimation({
            ID: 'kingsQuestBossFuckMilk',
            frameRate: 24,
            frames: this.createFrames('kingsQuestBossFuckMilk', 0, 18, 5)
        });
        this.createAnimation({
            ID: 'kingsQuestBossSuck',
            frameRate: 24,
            frames: this.createFrames('kingsQuestBossSuck', 0, 16, 5)
        });
        // this.createAnimation({
        //     ID: 'aviaGuard2Fuck',
        //     frameRate: 24,
        //     frames: this.createFrames('aviaGuard2Fuck', 0, 18, 5)
        // });
        // this.createAnimation({
        //     ID: 'aviaGuard2Cum',
        //     frameRate: 24,
        //     frames: this.createFrames('aviaGuard2Cum', 0, 75, 5)
        // });
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
            // Forest Beast Quest
            if (GAME.quest.isComplete('hornyBoris', 'End') === true) {
                return [{
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
                    thumbnail: 'SukiPussydefault00000',
                    type: 'Animation',
                    animationID: 'SukiPussydefault'
                }, {
                    thumbnail: 'SukiThroatdefault00000',
                    type: 'Animation',
                    animationID: 'SukiThroatdefault'
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
                }, {
                    thumbnail: 'goblinBossPussy00000',
                    type: 'Animation',
                    animationID: 'goblinBossPussy'
                }];
            }
        });
        this.addToGallery(function () {
            // Kings Quest
            if (GAME.quest.isComplete('kingsQuest') === true) {
                return [{
                    thumbnail: 'kingsQuestBossFuck00000',
                    type: 'Animation',
                    animationID: 'kingsQuestBossFuck'
                }, {
                    thumbnail: 'kingsQuestBossFuckMilk00000',
                    type: 'Animation',
                    animationID: 'kingsQuestBossFuckMilk'
                }, {
                    thumbnail: 'kingsQuestBossSuck00000',
                    type: 'Animation',
                    animationID: 'kingsQuestBossSuck'
                }];
            }
        });
        // this.addToGallery(function () {
        //     // Battle Orcs
        //     if (GAME.quest.isComplete('battleOrcs', 'Complete') === true) {
        //         return [{
        //             thumbnail: 'aviaGuard2Fuck00000',
        //             type: 'Animation',
        //             animationID: 'aviaGuard2Fuck'
        //         }, {
        //             thumbnail: 'aviaGuard2Cum00000',
        //             type: 'Animation',
        //             animationID: 'aviaGuard2Cum'
        //         }];
        //     }
        // });
    }
}