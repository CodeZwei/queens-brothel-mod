/**
 * Body parts throughout the whole game use these keys
 * @typedef GirlManager.bodyPart
 * @type 'Throat' | 'Tits' | 'Pussy' | 'Anal'
 */

/**
 * @typedef GirlManager.facialExpression
 * @type 'Default' | 'Happy' | 'Sad' | 'Angry' | 'Surprise' | 'Blush'
 */

/**
 * @typedef GirlManager.girlLayer
 * @property {string} girl - ID of girl this layer is for
 * @property {boolean} beforeClothes - If this layer should be added before the girl's clothes
 * @property {string} layerID - ID of layer to be added. Ex: 'Queen-Layer-Bukkake' layer ID is 'Bukkake'
 */

class Girl {
    /**
     * @constructor
     * @param {string} id
     * @param {number} baseLevel
     * @param {number} baseStamina
     * @param {number} age
     * @param {string} height
     * @returns {Girl}
     * @property {string} id
     * @property {object} baseStats
     * @property {number} baseStats.Throat
     * @property {number} baseStats.Pussy
     * @property {number} baseStats.Tits
     * @property {number} baseStats.Anal
     * @property {number} baseStamina
     * @property {object} staminaGain
     * @property {number} baseLevel
     * @property {boolean} naked
     * @property {boolean} futa
     * @property {number} age
     * @property {string} height
     * @property {string} ultimateDescription
     */
    constructor(id, baseLevel, baseStamina, age, height) {
        this.id = id;
        this._layers = [];
        this._cumLayers = {
            Throat: [],
            Tits: [],
            Pussy: [],
            Anal: [],
            Futa: []
        };
        this.baseStats = {
            Throat: 1,
            Pussy: 1,
            Tits: 1,
            Anal: 1
        };
        this.baseStamina = baseStamina;
        this.staminaGain = {};
        this.baseLevel = baseLevel;
        this.naked = false;
        this.futa = false;
        this.ultimateDescription = "";
        this.ultimate = 0;

        // Lore stuff
        this.age = age;
        this.height = height;

        this.Manager = GAME.girl;
        return this;
    }

    getID() {
        return this.id;
    }

    /**
     * @method setBaseStats
     * @memberOf Girl
     * @instance
     * @param {object} obj
     * @returns {Girl}
     */
    setBaseStats(obj) {
        this.baseStats = obj;
        return this;
    }

    /**
     * @method getAge
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getAge() {
        return this.age;
    }

    /**
     * @method getHeight
     * @memberOf Girl
     * @instance
     * @returns {string}
     */
    getHeight() {
        return this.height;
    }

    /**
     * Unlocks a girl
     * @method unlock
     * @memberOf Girl
     * @instance
     * @returns {boolean}
     * @returns {Girl}
     */
    unlock() {
        gameData.girl[this.id].Unlocked = true;
        return this;
    }

    /**
     * Checks if a girl is unlocked
     * @method isUnlocked
     * @memberOf GirlManager
     * @instance
     * @returns {boolean}
     */
    isUnlocked() {
        return gameData.girl[this.id].Unlocked;
    }

    /**
     * @method getPlayerStats
     * @memberOf Girl
     * @instance
     * @param type
     * @returns {number|object}
     */
    getPlayerStats(type) {
        if (type) {
            return gameData.girl[this.id].Stats[type];
        } else {
            return gameData.girl[this.id].Stats;
        }
    }

    /**
     * @method availablePoints
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    availablePoints() {
        let totalUsedStats = 0;
        let baseGain = 1;
        for (let stat of skills) {
            totalUsedStats += this.getPlayerStats(stat);
        }
        let statsForLevel = baseGain * (this.getLevel() - this.getBaseLevel());

        return statsForLevel - totalUsedStats;
    }

    /**
     * @method getBaseStat
     * @memberOf Girl
     * @instance
     * @param {GirlManager.bodyPart} bodyPart
     */
    getBaseStat(bodyPart) {
        return this.baseStats[bodyPart] + Math.floor((this.getLevel() - this.getBaseLevel()) / 2);
    }

    /**
     * @method getStat
     * @memberOf Girl
     * @instance
     * @param {GirlManager.bodyPart} bodyPart
     * @param {boolean} [bonus=true]
     * @returns {number}
     */
    getStat(bodyPart, bonus) {
        let base = this.getBaseStat(bodyPart);
        let playerStats = this.getPlayerStats(bodyPart);
        let clothesStats = this.getClothes().getStats(bodyPart);

        if (bonus === undefined) {
            bonus = true;
        }
        if (bonus === true) {
            return base + playerStats + clothesStats;
        } else {
            return base + playerStats;
        }
    }

    /**
     * @method statUp
     * @memberOf Girl
     * @instance
     * @param {GirlManager.bodyPart} bodyPart
     * @returns {Girl}
     */
    statUp(bodyPart) {
        if (this.availablePoints() > 0) {
            gameData.girl[this.id].Stats[bodyPart] += 1;
        } else {
            GAME.notify(this.id + " does not have any available stat points!");
        }

        globalEvents.emit('statUp');
        return this;
    }

    /**
     * @method getExp
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getExp() {
        return gameData.girl[this.id].EXP
    }

    /**
     * @method setExp
     * @memberOf Girl
     * @instance
     * @param {number} amount
     * @returns {Girl}
     */
    setExp(amount) {
        gameData.girl[this.id].EXP = amount;
        return this;
    }

    /**
     * Adds the exp to a girl's body part
     * @method gainExp
     * @memberOf Girl
     * @instance
     * @param {number} exp
     * @param {boolean} [silent=false] If there should not be pop up text near the pointer
     */
    gainExp(exp, silent) {
        silent = silent || false;
        if (exp === 0) {
            return null;
        }

        let before = GAME.girl[this.id].getLevel();
        let after;

        gameData.girl[this.id].EXP += exp;

        if (gameData.girl[this.id].EXP > GAME.getExp(MAX_LEVEL)) {
            gameData.girl[this.id].EXP = GAME.getExp(MAX_LEVEL);
        }

        after = GAME.girl[this.id].getLevel();

        if (before !== after) {
            globalEvents.emit('levelUp', {girl: this.id});
        }

        globalEvents.emit('gainExp', exp, silent);
    }

    getBaseLevel() {
        return this.baseLevel;
    }

    /**
     * @method getLevel
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getLevel() {
        return GAME.getLevel(this.getExp());
    }

    /**
     * @method getBaseStamina
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getBaseStamina() {
        return this.baseStamina;
    }

    /**
     * @method setBaseStamina
     * @memberOf Girl
     * @instance
     * @param {number} amount
     * @returns {Girl}
     */
    setBaseStamina(amount) {
        this.baseStamina = amount;
        return this;
    }

    /**
     * @method getStaminaGain
     * @memberOf Girl
     * @instance
     * @returns {object}
     */
    getStaminaGain() {
        return this.staminaGain;
    }

    /**
     * @method getStaminaGainAmount
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getStaminaGainAmount() {
        let total = 0;
        let staminaGain = this.getStaminaGain();

        for (let level in staminaGain) {
            if (this.getLevel() >= level) {
                total += staminaGain[level];
            }
        }

        return total;
    }

    /**
     * @method addStaminaGain
     * @memberOf Girl
     * @instance
     * @param {number} level
     * @param {number} amount
     * @returns {Girl}
     */
    addStaminaGain(level, amount) {
        this.staminaGain[level] = amount;
        return this;
    }

    /**
     * Returns the stamina of a girl
     * @method getStamina
     * @instance
     * @memberOf Girl
     * @return {number}
     */
    getStamina() {
        return parseFloat(gameData.girl[this.id].Stamina.toFixed(2));
    }

    /**
     * Returns the limit of stamina a girl can have
     * @method getMaxStamina
     * @instance
     * @memberOf Girl
     */
    getMaxStamina() {
        return parseFloat((this.getBaseStamina() + this.getStaminaGainAmount() + this.getClothes().getStats('Stamina')).toFixed(2))
    }

    /**
     * Sets the stamina for a girl, ignores all rules
     * @method setStamina
     * @memberOf Girl
     * @instance
     * @param {number} amount
     * @returns {Girl}
     */
    setStamina(amount) {
        gameData.girl[this.id].Stamina = amount;
        globalEvents.emit('gainStamina', {girl: this.id, staminaAmount: 0});
        return this;
    }

    /**
     * Subtracts the amount from the girl's current stamina
     * @method loseStamina
     * @instance
     * @memberOf Girl
     * @param amount
     * @returns {Girl}
     */
    loseStamina(amount) {
        if (amount > 0) {
            gameData.girl[this.id].Stamina -= amount;
            globalEvents.emit('loseStamina', {girl: this.id, staminaAmount: -amount});
        }
        return this;
    }

    /**
     * Adds the amount to the girl's current stamina
     * @method gainStamina
     * @instance
     * @memberOf Girl
     * @param amount
     * @param [overMax=true] - If the added stamina should go over her maximum stamina amount
     * @returns {Girl}
     */
    gainStamina(amount, overMax) {
        if (overMax === undefined) {
            overMax = true;
        }
        if (amount > 0) {
            if (overMax === true) {
                gameData.girl[this.id].Stamina += amount;
            } else if (gameData.girl[this.id].Stamina < GAME.girl[this.id].getMaxStamina()) {
                gameData.girl[this.id].Stamina += amount;
                if (gameData.girl[this.id].Stamina > GAME.girl[this.id].getMaxStamina()) {
                    gameData.girl[this.id].Stamina = GAME.girl[this.id].getMaxStamina();
                }
            }
            globalEvents.emit('gainStamina', {girl: this.id, staminaAmount: amount});
        }

        return this;
    };

    /**
     * @method getGuysFucked
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getGuysFucked() {
        return gameData.girl[this.id].GuysFucked;
    }

    /**
     * Increases the amount of guys a girl has fucked by the amount
     * The amount of guys a girl has fucked determines the stamina gain, so this is useful if you create a gang bang quest and want to reward the player with extra points
     * @method fuckGuys
     * @memberOf GirlManager
     * @instance
     * @param {number} amount
     * @returns {Girl}
     */
    fuckGuys(amount) {
        gameData.girl[this.id].GuysFucked += amount;
        return this;
    }

    /**
     * @method getMorals
     * @memberOf Girl
     * @instance
     * @returns {number}
     */
    getMorals() {
        if (gameData.girl[this.id].Morals < -5) {
            gameData.girl[this.id].Morals = -5;
        }

        if (gameData.girl[this.id].Morals > 5) {
            gameData.girl[this.id].Morals = 5;
        }

        return gameData.girl[this.id].Morals
    }

    /**
     * @method increaseMorals
     * @memberOf Girl
     * @instance
     * @param {number} [amount]
     * @returns {Girl}
     */
    increaseMorals(amount) {
        gameData.girl[this.id].Morals += amount;
        if (gameData.girl[this.id].Morals > 5) {
            gameData.girl[this.id].Morals = 5;
        }
        globalEvents.emit('increaseMorals');
        return this;
    }

    /**
     * @method decreaseMorals
     * @memberOf Girl
     * @instance
     * @param {number} [amount]
     * @returns {Girl}
     */
    decreaseMorals(amount) {
        amount = amount || 1;
        gameData.girl[this.id].Morals -= amount;
        if (gameData.girl[this.id].Morals < -5) {
            gameData.girl[this.id].Morals = -5;
        }
        globalEvents.emit('decreaseMorals');
        return this;
    }

    getMoralDescription() {
        let string = "Neutral";
        let morals = this.getMorals();

        switch (morals) {
            case -5:
                string = "Cum Dumpster";
                break;
            case -4:
                string = "Sex Toy";
                break;
            case -3:
                string = "Sex Toy";
                break;
            case -2:
                string = "Low Morals";
                break;
            case -1:
                string = "Low Morals";
                break;
            case 0:
                string = "Neutral Morals";
                break;
            case 1:
                string = "Has Morals";
                break;
            case 2:
                string = "Has Morals";
                break;
            case 3:
                string = "Highly Praised";
                break;
            case 4:
                string = "Highly Praised";
                break;
            case 5:
                string = "Brothel Favorite";
                break;
        }

        return string
    }

    /**
     * Sets the girl as naked or not
     * Clothes stats are not affected, the girl is technically still wearing the clothes
     * @method setNaked
     * @memberOf Girl
     * @instance
     * @param {boolean} boolean
     * @returns {Girl}
     */
    setNaked(boolean) {
        this.naked = boolean;
        globalEvents.emit('refreshGirls');
        return this;
    }

    /**
     * Returns if the girl is naked or not
     * @method isNaked
     * @memberOf Girl
     * @instance
     * @returns {boolean}
     */
    isNaked() {
        return this.naked;
    }

    /**
     * Sets the girl as futa or not
     * @method setFuta
     * @memberOf Girl
     * @instance
     * @param {boolean} boolean
     * @returns {Girl}
     */
    setFuta(boolean) {
        this.futa = boolean;
        globalEvents.emit('refreshGirls');
        return this;
    }

    /**
     * Returns if the girl is futa or not
     * @method isFuta
     * @memberOf Girl
     * @instance
     * @returns {boolean}
     */
    isFuta() {
        return this.futa;
    }

    /**
     * Returns the girl's clothes
     * @method getClothes
     * @memberOf Girl
     * @instance
     * @returns {Clothes}
     */
    getClothes() {
        return GAME.clothes.getClothes(gameData.girl[this.id].Clothes);
    }

    /**
     * @method setClothes
     * @memberOf Girl
     * @instance
     * @param {string} clothesID
     * @returns {Girl}
     */
    setClothes(clothesID) {
        gameData.girl[this.id].Clothes = clothesID;
        return this;
    }

    /**
     * Equips clothes based on the clothes ID
     * @method equipClothes
     * @memberOf Girl
     * @instance
     * @param {string} clothesID
     * @param {boolean} force - Force the clothes on even if the girl is not a high enough level
     * @returns {Girl}
     */
    equipClothes(clothesID,force) {
        force = force || false;
        let clothes = GAME.clothes.getClothes(clothesID);
        let girl = clothes.Girl;

        if (girl.getLevel() < clothes.getLevel() && force === false) {
            GAME.notify(girl.id + " does not have a high enough level to wear that!");
            return this;
        }

        this.setClothes(clothes.id);
        this.setNaked(false);

        globalEvents.emit('refreshGirls');
        return this;

    }

    /**
     * @method getLayers
     * @memberOf Girl
     * @instance
     * @param {boolean} [layerObjs=false]
     * @returns {Array}
     */
    getLayers(layerObjs) {
        layerObjs = layerObjs || false;

        if (layerObjs === true) {
            return this._layers;
        } else {
            let arr = [];
            for (let layer of this._layers) {
                arr.push(layer.layerID);
            }
            return arr;
        }
    }

    /**
     * Adds a layer to the girl's body. Automatically creates a {@link GirlManager.girlLayer}
     * @method addLayer
     * @memberOf Girl
     * @instance
     * @param {boolean} beforeClothes
     * @param {string} layerID
     * @returns {Girl}
     */
    addLayer(beforeClothes, layerID) {
        this._layers.push({
            girl: this.id,
            beforeClothes: beforeClothes,
            layerID: layerID
        });
        globalEvents.emit('refreshGirls');
        return this;
    }

    /**
     * Removes layer from girl's body
     * @method removeLayer
     * @memberOf Girl
     * @instance
     * @param {string} layerID
     */
    removeLayer(layerID) {
        this._layers.splice(this._layers.findIndex(layer => layer.layerID === layerID), 1);
        globalEvents.emit('refreshGirls');
    }

    /**
     * Removes all layers on girl's body
     * @method removeAllLayers
     * @memberOf Girl
     * @instance
     * @returns {Girl}
     */
    removeAllLayers() {
        this._layers = [];
        globalEvents.emit('refreshGirls');
        return this;
    }

    /**
     * Adds a cum layer to the ._cumLayer object. This is used for storing all of the available cum layers that can be added when a girl gets came on.
     * DOES NOT ADD CUM TO THE GIRL. Use {@link GirlManager.cumOn} to add cum layers in game
     * @method addCumLayer
     * @memberOf Girl
     * @instance
     * @param {GirlManager.bodyPart} bodyPart - What body part this cum layer is used for
     * @param {string} cumLayer - ID of cum layer, should be whatever is after the -Layer- part of the texture key.
     * @example
     * cumLayer of texture Queen-Layer-Cum-Throat1 is Cum-Throat1
     * @returns {Girl}
     */
    addCumLayer(bodyPart, cumLayer) {
        this._cumLayers[bodyPart].push(cumLayer);
        return this;
    }

    /**
     * Gets all of the cum layers for a body part
     * @method getCumLayers
     * @memberOf Girl
     * @instance
     * @param {GirlManager.bodyPart} [bodyPart]
     * @returns {Array<string>|boolean}
     */
    getCumLayers(bodyPart) {
        if (bodyPart) {
            return this._cumLayers[bodyPart];
        } else {
            return this._cumLayers;
        }
    }

    /**
     * Adds cum to the girl's body
     * @method cumOn
     * @memberOf Girl
     * @instance
     * @param {GirlManager.bodyPart} bodyPart
     * @param {number} [amount] - Number of cum layers added
     * @returns {Girl}
     */
    cumOn(bodyPart, amount) {
        amount = amount || 1;
        for (let i = 1; i <= amount; i++) {
            let girlLayers = this.getLayers();
            let availableLayers = this.getCumLayers(bodyPart).filter((cumLayer) => girlLayers.includes(cumLayer) === false);

            if (availableLayers.length > 0) {
                this.addLayer(true, chance.pickone(availableLayers));
            }
        }
        return this;
    }

    /**
     * Adds 6 cum layers to every body part
     * @method bukkake
     * @memberOf Girl
     * @instance
     * @returns {Girl}
     */
    bukkake() {
        for (let skill of skills) {
            for (let i = 1; i <= 4; i++) {
                this.cumOn(skill);
            }
        }
        return this;
    }

    /**
     * @method setUltimateDescription
     * @memberOf Girl
     * @instancce
     * @param {string} text
     * @returns {Girl}
     */
    setUltimateDescription(text) {
        this.ultimateDescription = text;
        return this;
    }

    /**
     * @method getUltimateDescription
     * @memberOf Girl
     * @instance
     * @returns {string}
     */
    getUltimateDescription() {
        return this.ultimateDescription;
    }

    subtractUltimate(amount) {
        this.ultimate -= amount;
        if (this.ultimate < 0) {
            this.ultimate = 0;
        }

        return this;
    }

    addUltimate(amount) {
        this.ultimate += amount;
        if (this.ultimate > 100) {
            this.ultimate = 100;
        }

        return this;
    }

    getUltimate() {
        return this.ultimate;
    }
}

/**
 * The GirlManager class lets you check and change anything related to the girls.
 * @class GirlManager
 * @property {Girl} Queen
 * @property {Girl} Suki
 * @property {Girl} Esxea
 * @property {Girl} Scarlett
 * @property {Girl} Ardura
 * @property {Girl} Natasha
 */
class GirlManager {
    constructor() {
        this._girls = ['Queen', 'Suki', 'Esxea', 'Scarlett', 'Ardura', 'Natasha'];

        /**
         * currentGirl is the currently selected girl. It's the girl displayed on the HUD.
         * @name GirlManager#currentGirl
         * @type {string}
         */
        this.currentGirl = 'Queen';
    }

    _initGirls() {
        this.add(new Girl('Queen', 1, 3, 26, "5'5''"))
            .setBaseStats({
                Throat: 1,
                Pussy: 1,
                Tits: 1,
                Anal: 1
            })
            .addStaminaGain(10, 1)
            .addStaminaGain(30, 1)
            .addStaminaGain(50, 1)
            .setUltimateDescription("All girls gain 1 stamina.");

        this.add(new Girl('Suki', 8, 3, 18, "5'4''"))
            .setBaseStats({
                Throat: 8,
                Pussy: 15,
                Tits: 1,
                Anal: 3
            })
            .addStaminaGain(20, 1)
            .addStaminaGain(50, 1)
            .addStaminaGain(80, 1)
            .setUltimateDescription("Suki makes clients lose excitement slowly.");

        this.add(new Girl('Esxea', 10, 3, 22, "3'4''"))
            .setBaseStats({
                Throat: 10,
                Pussy: 10,
                Tits: 10,
                Anal: 10
            })
            .addStaminaGain(20, 1)
            .addStaminaGain(35, 1)
            .addStaminaGain(55, 1)
            .setUltimateDescription("Esxea loses less stamina.");

        this.add(new Girl('Scarlett', 15, 4, 21, "5'10''"))
            .setBaseStats({
                Throat: 10,
                Pussy: 15,
                Tits: 25,
                Anal: 1
            })
            .addStaminaGain(40, 1)
            .addStaminaGain(70, 1)
            .setUltimateDescription("Scarlett makes clients cum faster.");

        this.add(new Girl('Ardura', 20, 5, 28, "8'0''"))
            .setBaseStats({
                Throat: 15,
                Pussy: 10,
                Tits: 5,
                Anal: 25
            })
            .addStaminaGain(60, 1)
            .addStaminaGain(99, 1)
            .setUltimateDescription("Ardura reduces the client's level by 10.");

        this.add(new Girl('Natasha', 10, 3, 19, "5'0''"))
            .setBaseStats({
                Throat: 5,
                Pussy: 13,
                Tits: 5,
                Anal: 7
            })
            .addStaminaGain(25, 1)
            .addStaminaGain(40, 1)
            .addStaminaGain(64, 1)
            .addStaminaGain(80, 1)
            .addStaminaGain(99, 1)
            .setUltimateDescription("");
        // .setUltimateDescription("Natasha increases the ultimate meter for all the girls.");

        for (let girl of this._girls) {
            if (GAME.girl.getGirl(girl).getExp() < GAME.getExp(GAME.girl.getGirl(girl).getBaseLevel())) {
                GAME.girl.getGirl(girl).setExp(GAME.getExp(GAME.girl.getGirl(girl).getBaseLevel()));
            }
        }
    }

    /**
     * @method _initCumLayers
     * @memberOf GirlManager
     * @instance
     * @private
     */
    _initCumLayers() {
        this.Queen.addCumLayer('Throat', 'Cum-Throat1');
        this.Queen.addCumLayer('Throat', 'Cum-Throat2');
        this.Queen.addCumLayer('Throat', 'Cum-Throat3');
        this.Queen.addCumLayer('Throat', 'Cum-Throat4');
        this.Queen.addCumLayer('Pussy', 'Cum-Pussy1');
        this.Queen.addCumLayer('Pussy', 'Cum-Pussy2');
        this.Queen.addCumLayer('Pussy', 'Cum-Pussy3');
        this.Queen.addCumLayer('Pussy', 'Cum-Pussy4');
        this.Queen.addCumLayer('Tits', 'Cum-Tits1');
        this.Queen.addCumLayer('Tits', 'Cum-Tits2');
        this.Queen.addCumLayer('Tits', 'Cum-Tits3');
        this.Queen.addCumLayer('Tits', 'Cum-Tits4');
        this.Queen.addCumLayer('Futa', 'Cum-Futa');
        this.Suki.addCumLayer('Pussy', 'Cum-Pussy1');
        this.Suki.addCumLayer('Pussy', 'Cum-Pussy2');
        this.Suki.addCumLayer('Pussy', 'Cum-Pussy3');
        this.Suki.addCumLayer('Pussy', 'Cum-Pussy4');
        this.Suki.addCumLayer('Throat', 'Cum-Throat1');
        this.Suki.addCumLayer('Throat', 'Cum-Throat2');
        this.Suki.addCumLayer('Throat', 'Cum-Throat3');
        this.Suki.addCumLayer('Throat', 'Cum-Throat4');
        this.Suki.addCumLayer('Tits', 'Cum-Tits1');
        this.Suki.addCumLayer('Tits', 'Cum-Tits2');
        this.Suki.addCumLayer('Tits', 'Cum-Tits3');
        this.Suki.addCumLayer('Tits', 'Cum-Tits4');
        this.Suki.addCumLayer('Futa', 'Cum-Futa');
        this.Esxea.addCumLayer('Pussy', 'Cum-Pussy1');
        this.Esxea.addCumLayer('Pussy', 'Cum-Pussy2');
        this.Esxea.addCumLayer('Pussy', 'Cum-Pussy3');
        this.Esxea.addCumLayer('Pussy', 'Cum-Pussy4');
        this.Esxea.addCumLayer('Throat', 'Cum-Throat1');
        this.Esxea.addCumLayer('Throat', 'Cum-Throat2');
        this.Esxea.addCumLayer('Throat', 'Cum-Throat3');
        this.Esxea.addCumLayer('Throat', 'Cum-Throat4');
        this.Esxea.addCumLayer('Tits', 'Cum-Tits1');
        this.Esxea.addCumLayer('Tits', 'Cum-Tits2');
        this.Esxea.addCumLayer('Tits', 'Cum-Tits3');
        this.Esxea.addCumLayer('Tits', 'Cum-Tits4');
        this.Esxea.addCumLayer('Futa', 'Cum-Futa');
        this.Scarlett.addCumLayer('Pussy', 'Cum-Pussy1');
        this.Scarlett.addCumLayer('Pussy', 'Cum-Pussy2');
        this.Scarlett.addCumLayer('Pussy', 'Cum-Pussy3');
        this.Scarlett.addCumLayer('Pussy', 'Cum-Pussy4');
        this.Scarlett.addCumLayer('Throat', 'Cum-Throat1');
        this.Scarlett.addCumLayer('Throat', 'Cum-Throat2');
        this.Scarlett.addCumLayer('Throat', 'Cum-Throat3');
        this.Scarlett.addCumLayer('Throat', 'Cum-Throat4');
        this.Scarlett.addCumLayer('Tits', 'Cum-Tits1');
        this.Scarlett.addCumLayer('Tits', 'Cum-Tits2');
        this.Scarlett.addCumLayer('Tits', 'Cum-Tits3');
        this.Scarlett.addCumLayer('Tits', 'Cum-Tits4');
        this.Scarlett.addCumLayer('Futa', 'Cum-Futa');
        this.Ardura.addCumLayer('Pussy', 'Cum-Pussy1');
        this.Ardura.addCumLayer('Pussy', 'Cum-Pussy2');
        this.Ardura.addCumLayer('Pussy', 'Cum-Pussy3');
        this.Ardura.addCumLayer('Pussy', 'Cum-Pussy4');
        this.Ardura.addCumLayer('Throat', 'Cum-Throat1');
        this.Ardura.addCumLayer('Throat', 'Cum-Throat2');
        this.Ardura.addCumLayer('Throat', 'Cum-Throat3');
        this.Ardura.addCumLayer('Throat', 'Cum-Throat4');
        this.Ardura.addCumLayer('Tits', 'Cum-Tits1');
        this.Ardura.addCumLayer('Tits', 'Cum-Tits2');
        this.Ardura.addCumLayer('Tits', 'Cum-Tits3');
        this.Ardura.addCumLayer('Tits', 'Cum-Tits4');
        this.Ardura.addCumLayer('Futa', 'Cum-Futa');
        this.Natasha.addCumLayer('Pussy', 'Cum-Pussy1');
        this.Natasha.addCumLayer('Pussy', 'Cum-Pussy2');
        this.Natasha.addCumLayer('Pussy', 'Cum-Pussy3');
        this.Natasha.addCumLayer('Pussy', 'Cum-Pussy4');
        this.Natasha.addCumLayer('Throat', 'Cum-Throat1');
        this.Natasha.addCumLayer('Throat', 'Cum-Throat2');
        this.Natasha.addCumLayer('Throat', 'Cum-Throat3');
        this.Natasha.addCumLayer('Throat', 'Cum-Throat4');
        this.Natasha.addCumLayer('Tits', 'Cum-Tits1');
        this.Natasha.addCumLayer('Tits', 'Cum-Tits2');
        this.Natasha.addCumLayer('Tits', 'Cum-Tits3');
        this.Natasha.addCumLayer('Tits', 'Cum-Tits4');
        this.Natasha.addCumLayer('Futa', 'Cum-Futa');
    }

    /**
     * Adds a girl to the game
     * @method add
     * @memberOf GirlManager
     * @instance
     * @param {Girl} girl
     * @returns {Girl}
     */
    add(girl) {
        this[girl.id] = girl;
        return this[girl.id];
    }

    /**
     * @method getGirl
     * @memberOf GirlManager
     * @instance
     * @param {string} girlID
     * @returns {Girl}
     */
    getGirl(girlID) {
        return this[girlID];
    }

    /**
     * Returns an array with the ids of the girls
     * @method getGirls
     * @instance
     * @memberOf GirlManager
     * @return {array<string>}
     */
    getGirls() {
        return this._girls;
    }

    /**
     * @method getGirlContainer
     * @memberOf GirlManager
     * @instance
     * @param {Phaser.Scene} context
     * @param {string} girlID
     * @param {boolean} [input] - If true, clicking the container will display the girl's image
     * @returns Phaser.GameObjects.Container
     */
    getGirlContainer(context, girlID, input) {
        let chosenGirlID = girlID;
        let girlBody;
        let girlFace;
        let girlEmotion;
        let girlLayers;
        let girlClothes;

        let container = context.add.container();

        container.setNaked = function (boolean) {
            container.getByName('clothes').setVisible(!boolean);
        };

        container.setGirl = function (girlID) {
            girlID = girlID || chosenGirlID;
            chosenGirlID = girlID;

            girlClothes = GAME.girl[girlID].getClothes();
            girlLayers = GAME.girl[girlID].getLayers(true);

            girlBody = girlClothes.getBody();
            girlFace = girlClothes.getFace();
            girlEmotion = "Neutral";

            container.buildGirl();
            return container;
        };

        container.setClothes = function (clothesID) {
            let clothes = GAME.clothes.getClothes(clothesID);
            let girl = clothes.Girl;

            if (clothes.getPlayerStyle() !== false) {
                container.getByName('clothes').setTexture(girl.id + "-Clothes-" + clothes.id + "-" + clothes.getPlayerStyle());
            } else {
                container.getByName('clothes').setTexture(girl.id + "-Clothes-" + clothes.id);
            }
            container.getByName('clothes').clothID = clothes.id;

            return container;
        };

        container.setStyle = function (clothesID, styleID) {
            let clothes = GAME.clothes.getClothes(clothesID);
            let girl = clothes.Girl;

            if (styleID !== false) {
                container.getByName('clothes').setTexture(girl.id + "-Clothes-" + clothes.id + "-" + styleID);
            } else {
                container.getByName('clothes').setTexture(girl.id + "-Clothes-" + clothes.id);
            }

            return container;
        };

        container.setEmotion = function (emotion) {
            container.getByName('face').setTexture(chosenGirlID + "-Face-" + girlFace + "-" + emotion);

            return container;
        };

        container.buildGirl = function () {
            container.removeAll(true);

            container.add(context.add.image(0, 0, chosenGirlID + "-Body-" + girlBody).setOrigin(0.5, 1).setName('body'));
            container.add(context.add.image(0, 0, chosenGirlID + "-Layer-Futa").setOrigin(0.5, 1).setName('futa').setVisible(false));
            container.add(context.add.image(0, 0, chosenGirlID + "-Face-" + girlFace + "-" + girlEmotion).setOrigin(0.5, 1).setName('face'));

            if (girlClothes.getPlayerStyle() !== false) {
                container.add(context.add.image(0, 0, chosenGirlID + "-Clothes-" + girlClothes.id + "-" + girlClothes.getPlayerStyle()).setOrigin(0.5, 1).setName('clothes'));
            } else {
                container.add(context.add.image(0, 0, chosenGirlID + "-Clothes-" + girlClothes.id).setOrigin(0.5, 1).setName('clothes'));
            }
            container.getByName('clothes').clothID = girlClothes.id;

            for (let layer of girlLayers) {
                if (layer.beforeClothes === true) {
                    let clothesIndex = container.getIndex(container.getByName('clothes'));
                    container.addAt(context.add.image(0, 0, chosenGirlID + "-Layer-" + layer.layerID).setOrigin(0.5, 1).setName(layer.layerID), clothesIndex)
                } else {
                    container.add(context.add.image(0, 0, chosenGirlID + "-Layer-" + layer.layerID).setOrigin(0.5, 1).setName(layer.layerID));
                }

                if (GAME.girl[chosenGirlID].isFuta() === true) {
                    if (layer.layerID.includes("Pussy") === true) {
                        container.getByName(layer.layerID).setVisible(false);
                    }
                    if (GAME.girl[chosenGirlID].isNaked() === false) {
                        if (layer.layerID.includes("Futa") === true) {
                            container.getByName(layer.layerID).setVisible(false);
                        }
                    }
                } else {
                    if (layer.layerID.includes("Futa") === true) {
                        container.getByName(layer.layerID).setVisible(false);
                    }
                    if (GAME.girl[chosenGirlID].isNaked() === false) {
                        if (layer.layerID.includes("Futa") === true) {
                            container.getByName(layer.layerID).setVisible(false);
                        }
                    }
                }
            }

            if (GAME.girl[chosenGirlID].isNaked() === true) {
                container.getByName('clothes').setVisible(false);
                if (GAME.girl[chosenGirlID].isFuta() === true) {
                    container.getByName('futa').setVisible(true);
                } else {
                    container.getByName('futa').setVisible(false);
                }
            } else {
                if (GAME.girl[chosenGirlID].isFuta() === true) {
                    container.getByName('futa').setVisible(false);
                }
            }

            container.viewImage = () => {
                return new Promise((resolve) => {
                    let imageLayers = [];
                    container.iterate((child) => {
                        if (child.visible === true) {
                            imageLayers.push({Key: child.texture.key});
                        }
                    });
                    GAME.viewImage(imageLayers).then(resolve);
                })
            }

            container.onPointerUp = () => {
                container.viewImage();
            }

            if (input === true) {
                if (container.input) {
                    container.input.hitArea.setSize(container.getByName('body').getBounds().width, container.getByName('body').getBounds().height);
                } else {
                    container.setInteractive({
                        hitArea: container.getByName('body').getBounds(),
                        hitAreaCallback: Phaser.Geom.Rectangle.Contains,
                        useHandCursor: true
                    })
                        .on('pointerup', () => {
                            container.onPointerUp();
                        })
                }
            }

            return container;
        };

        container.setGirl(girlID);

        globalEvents.on('refreshGirls', container.setGirl);

        container.on(Phaser.GameObjects.Events.DESTROY, () => {
            globalEvents.off('refreshGirls', container.setGirl)
        });

        return container;
    }


    /**
     * Returns the total stamina for all the girls
     * @method getTotalStamina
     * @instance
     * @memberOf GirlManager
     * @returns {number}
     */
    getTotalStamina() {
        let total = 0;

        for (let i in gameData.girl) {
            if (gameData.girl[i].Unlocked === true) {
                total += gameData.girl[i].Stamina;
            }
        }
        return parseFloat(total.toFixed(2));
    }


    /**
     * Splits the exp amongst the girls in the array
     * @method splitExp
     * @memberOf GirlManager
     * @instance
     * @param {Array<string>} girls - Array of girl ids
     * @param {number} totalExp - This number will be divided by the amount of girls and then by the amount of body parts
     */
    splitExp(girls, totalExp) {
        let eachGirlGets = totalExp / girls.length;

        for (let i in girls) {
            GAME.girl[girls[i]].gainExp(eachGirlGets);
        }
    }

    /**
     * Returns an array of girls that are unlocked
     * @method getUnlocked
     * @memberOf GirlManager
     * @instance
     * @param {boolean} [hasStamina] - Only get girls that have stamina
     * @returns {Array}
     */
    getUnlocked(hasStamina) {
        hasStamina = hasStamina || false;
        let girlArray = [];

        for (let girl of GAME.girl.getGirls()) {
            if (GAME.girl.getGirl(girl).isUnlocked()) {
                if (hasStamina === true) {
                    if (GAME.girl.getGirl(girl).getStamina() > 0) {
                        girlArray.push(girl);
                    }
                } else {
                    girlArray.push(girl);
                }
            }
        }

        return girlArray;
    }
}