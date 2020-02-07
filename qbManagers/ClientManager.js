class BattleClient {
    /**
     * @constructor
     * @param {string} id
     * @param {number} [level=1]
     * @param {string} [startGirl="Any"]
     * @param {GirlManager.bodyPart} [startBodyPart]
     * @param {function|string} [defaultBattleCondition]
     * @returns {BattleClient}
     */
    constructor(id, level, startGirl, startBodyPart, defaultBattleCondition) {
        startGirl = startGirl || 'Any';
        startBodyPart = startBodyPart || chance.pickone(skills);
        defaultBattleCondition = defaultBattleCondition || 'default';

        this.GUID = chance.guid();
        this.id = id;
        this.level = level || 1;
        this.gold = 0;

        this.tickMS = 1000;
        this.ticksToFuck = 3;
        this.cum = 0;
        this.finished = false;
        this.timer = false;
        this.timerCount = 0;
        this.queue = [];
        this.wants = {
            Girl: startGirl,
            GirlLength: 5,
            BodyPart: startBodyPart,
            BodyPartLength: 5
        };
        this.currently = {
            Girl: false,
            BodyPart: false
        };
        this.animation = 'nullImage';
        this.onTick = [];
        this.onCum = false;

        this.addBattleCondition(defaultBattleCondition);

        return this;
    }

    /**
     * @method
     * @memberOf Client
     * @instance
     * @param {string} id
     * @returns {BattleClient}
     */
    setID(id) {
        this.id = id;

        return this;
    }

    /**
     * @method getID
     * @memberOf Client
     * @instance
     * @returns {string}
     */
    getID() {
        return this.id;
    }

    /**
     * @method setLevel
     * @memberOf Client
     * @instance
     * @param {number} number
     * @returns {BattleClient}
     */
    setLevel(number) {
        this.level = number;

        return this;
    }

    /**
     * @method getLevel
     * @memberOf Client
     * @instance
     * @returns {number}
     */
    getLevel() {
        return this.level;
    }

    /**
     * @method setGold
     * @memberOf Client
     * @instance
     * @param {number} number
     * @returns {BattleClient}
     */
    setGold(number) {
        this.gold = number;

        return this;
    }

    /**
     * @method getGold
     * @memberOf Client
     * @instance
     * @param {string} girl
     * @returns {number}
     */
    getGold(girl) {
        girl = girl || false;
        let gold = this.gold;

        if (girl !== false) {
            let morals = GAME.girl.getGirl(girl).getMorals();

            if (morals > 0) {
                gold = gold + (gold * (Math.abs(morals) / 5))
            }
        }

        return Math.ceil(gold);
    }

    /**
     * @method getExp
     * @memberOf Client
     * @instance
     * @param {string} girl
     * @returns {number}
     */
    getExp(girl) {
        let girlLevel = GAME.girl.getGirl(girl).getLevel();
        let morals = GAME.girl.getGirl(girl).getMorals();

        let baseEXP = Math.ceil(10 - (10 * GAME.Sigmoid(girlLevel, this.getLevel())));

        if (morals < 0) {
            baseEXP = baseEXP + (baseEXP * (Math.abs(morals) / 5));
        }

        return Math.ceil(baseEXP);
    }

    /**
     * @method setTickMS
     * @memberOf Client
     * @instance
     * @param {number} number
     * @returns {BattleClient}
     */
    setTickMS(number) {
        this.tickMS = number;
        return this;
    }

    /**
     * @method getTickMS
     * @memberOf Client
     * @instance
     * @returns {number}
     */
    getTickMS() {
        return this.tickMS;
    }

    /**
     * @method setTicksToFuck
     * @memberOf Client
     * @instance
     * @param {number} number
     * @returns {BattleClient}
     */
    setTicksToFuck(number) {
        this.ticksToFuck = number;

        return this;
    }

    getTicksToFuck() {
        return this.ticksToFuck;
    }

    /**
     * @method setCum
     * @memberOf Client
     * @instance
     * @param {number} number
     * @returns {number}
     */
    setCum(number) {
        this.cum = number;

        return this.cum;
    }

    /**
     * @method getCum
     * @memberOf Client
     * @instance
     * @returns {number}
     */
    getCum() {
        return this.cum;
    }

    /**
     * @method setFinished
     * @memberOf Client
     * @instance
     * @param {boolean} boolean
     * @returns {BattleClient}
     */
    setFinished(boolean) {
        this.finished = boolean;

        return this;
    }

    /**
     * @method getFinished
     * @memberOf Client
     * @instance
     * @returns {boolean}
     */
    getFinished() {
        return this.finished;
    }

    /**
     * @method getWants
     * @memberOf Client
     * @instance
     * @returns {{BodyPart: GirlManager.bodyPart, BodyPartLength: number, GirlLength: number, Girl: string}}
     */
    getWants() {
        return this.wants;
    }

    /**
     * @method getCurrently
     * @memberOf Client
     * @instance
     * @returns {{BodyPart: boolean, Girl: boolean}}
     */
    getCurrently() {
        return this.currently;
    }

    /**
     * @method setAnimation
     * @memberOf Client
     * @instance
     * @param {string} animationID
     * @returns {BattleClient}
     */
    setAnimation(animationID) {
        animationID = animationID || "nullImage";

        this.animation = animationID;

        return this;
    }

    /**
     * @method getAnimation
     * @memberOf Client
     * @instance
     * @returns {string}
     */
    getAnimation() {
        return this.animation;
    }

    /**
     * Automatically calculates the animation's fps using the client's tickMS
     * @method getAnimationFPS
     * @memberOf Client
     * @instance
     * @returns {number}
     */
    getAnimationFPS() {
        let fps = Math.ceil(48 - ((this.getTickMS() / 1000) * 24));
        if (fps <= 12) {
            fps = 12;
        }
        if (fps >= 48) {
            fps = 48;
        }
        return fps;
    }

    /**
     * Adds a dialogue function to the client's queue which will be popped when the client is selected
     * @method addToQueue
     * @memberOf Client
     * @instance
     * @param {DialogueTree} dialogueTree
     */
    addToQueue(dialogueTree) {
        this.queue.push(dialogueTree);
        globalEvents.emit('clientAddToQueue', this.GUID);

        return this;
    }

    /**
     * @method addDialogueCondition
     * @memberOf client
     * @instance
     * @param {function} condition - A function that returns a promise
     * @param {string} dialogueTreeID
     * @param {boolean} [repeat=false] - If this condition can occur more than once
     */
    addDialogueCondition(condition, dialogueTreeID, repeat) {
        this.addOnTick(new DialogueCondition(condition, dialogueTreeID, repeat));

        return this;
    }

    /**
     * @method addBattleCondition
     * @memberOf Client
     * @instance
     * @param {function|string} callback
     * @param {boolean} [overrideDefault=false]
     */
    addBattleCondition(callback, overrideDefault) {
        overrideDefault = overrideDefault || false;

        if (typeof callback === "string") {
            callback = GAME.battle.getBattleCondition(callback);
        }
        if (overrideDefault) {
            this.onTick[0] = new BattleCondition(callback, this);
        } else {
            this.addOnTick(new BattleCondition(callback, this));
        }

        return this;
    }

    /**
     * Adds a new onTick object to the client's onTick array
     * @method addOnTick
     * @memberOf Client
     * @instance
     * @param {object} condition
     */
    addOnTick(condition) {
        if (condition.Type !== "Dialogue" && condition.Type !== "Battle") {
            condition.Type = "User"
        }
        this.onTick.push(condition);

        return this;
    }

    /**
     * Method is called when a client cums. Must return a promise
     * @method setOnCum
     * @memberOf Client
     * @instance
     * @param {string} dialogueTreeID
     */
    setOnCum(dialogueTreeID) {
        this.onCum = dialogueTreeID;

        return this;
    }

    /**
     * Calls the onCum function if there is one
     * @method doCum
     * @memberOf Client
     * @instance
     * @returns {Promise<any>}
     */
    doCum() {
        return new Promise((resolve) => {
            if (this.onCum !== false) {
                GAME.dialogue.playDialogue(this.onCum, null, {
                    client: this,
                    battle: GAME.battle.currentBattle
                }).then(() => {
                    resolve();
                })
            } else {
                resolve();
            }
        });
    }

    /**
     * @method setGirl
     * @memberOf Client
     * @instance
     * @param girl
     * @param [length]
     * @returns {BattleClient}
     */
    setGirl(girl, length) {
        girl = girl || 'Any';

        this.wants.Girl = girl;
        if (length) {
            this.setGirlLength(length);
        }

        return this;
    }

    /**
     * @method setGirlLength
     * @memberOf Client
     * @instance
     * @param {number} length
     * @returns {BattleClient}
     */
    setGirlLength(length) {
        this.wants.GirlLength = length;
        return this;
    }

    /**
     * @method setBodyPart
     * @memberOf Client
     * @instance
     * @param {GirlManager.bodyPart} bodyPart
     * @param {number} [length]
     * @returns {BattleClient}
     */
    setBodyPart(bodyPart, length) {
        bodyPart = bodyPart || 'Any';

        this.wants.BodyPart = bodyPart;
        if (length) {
            this.setBodyPartLength(length);
        }

        return this;
    }

    /**
     * @method setBodyPartLength
     * @memberOf Client
     * @instance
     * @param {number} length
     * @returns {BattleClient}
     */
    setBodyPartLength(length) {
        this.wants.BodyPartLength = length;
        return this;
    }
}

class ClientCondition {
    /**
     * @constructor
     * @param {string} type
     * @returns ClientCondition
     */
    constructor(type) {
        this._TYPE = type;

        return this;
    }

    /**
     * @method getType
     * @memberOf ClientCondition
     * @instance
     * @returns {string}
     */
    getType() {
        return this._TYPE
    }
}

class BattleCondition extends ClientCondition {
    /**
     * @constructor
     * @param {function} callback
     * @param {BattleClient} client
     */
    constructor(callback, client) {
        super("Battle");

        this.callback = callback;
        this.client = client;
    }

    /**
     * @method do
     * @memberOf BattleCondition
     * @instance
     * @param cum
     * @param totalDamage
     * @param totalExp
     * @returns {Promise<{Cum: number, totalDamage: number}>}
     */
    do(cum, totalDamage, totalExp) {
        return new Promise((resolve) => {
            this.callback.call(this.client, GAME.battle.currentBattle, cum, totalDamage, totalExp).then((results) => {
                resolve(results);
            });
        });
    }
}

class DialogueCondition extends ClientCondition {
    /**
     * @constructor
     * @param {function} condition
     * @param {string} dialogueTree
     * @param {boolean} repeat
     */
    constructor(condition, dialogueTree, repeat) {
        super("Dialogue");

        this.Repeat = repeat || false;
        this.RepeatCounter = 0;
        this.Happened = false;
        this.Condition = condition;
        this.DialogueTree = dialogueTree;
    }
}