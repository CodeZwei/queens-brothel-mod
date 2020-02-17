class Clothes {
    /**
     * @constructor
     * @param {string} id
     * @param {string} girl
     * @param {boolean} [unlockedByDefault=false]
     * @property {string} id
     * @property {string} face
     * @property {string} body
     * @property {boolean} visible
     * @property {Girl} Girl
     * @property {string} name
     * @property {string} description
     * @property {number} level
     * @property {boolean} shop
     * @property {number} cost
     * @property {object} stats
     * @property {object<ClothesStyle>} styles
     * @returns {Clothes}
     * @example
     * let myClothes = new Clothes('myClothes','Queen')
     *      .setVisible(true)
     *      .setName("My Clothes")
     *      .setDescription("These are my mod's clothes")
     *      .setLevel(15)
     *      .setShop(true)
     *      .setCost(3000)
     *      .setStat("Throat", 2)
     *      .setStat("Pussy", 1);
     *
     * // Visible condition example
     * // These clothes will be visible in the shop if Queen is above level 10
     * let myClothes = new Clothes('myClothes2','Queen')
     *      .setVisible(() =>{
     *          return myMod.girl.Queen.getLevel() > 10;
     *      })
     */
    constructor(id, girl, unlockedByDefault) {
        this.id = id;
        this.unlockedByDefault = unlockedByDefault || false;
        this.styles = {};

        this.face = "Default";
        this.body = "Default";
        this.visible = this.unlockedByDefault || false;
        this.Girl = GAME.girl.getGirl(girl);
        this.name = "";
        this.description = "";
        this.level = 0;
        this.shop = false;
        this.cost = 0;
        this.stats = {
            Stamina: 0,
            Recovery: 0,
            Throat: 0,
            Tits: 0,
            Pussy: 0,
            Anal: 0
        };

        this.addStyle(new ClothesStyle(false, "Default", true));

        return this;
    }

    /**
     * @method setID
     * @memberOf Clothes
     * @instance
     * @param {string} id
     * @returns {Clothes}
     */
    setID(id) {
        this.id = id;
        return this;
    }

    /**
     * @method getID
     * @memberOf Clothes
     * @instance
     * @returns {string}
     */
    getID() {
        return this.id;
    }

    /**
     * @method isUnlocked
     * @memberOf Clothes
     * @instance
     * @returns {boolean}
     */
    isUnlocked() {
        return gameData.clothes[this.id].Unlocked;
    }

    /**
     * @method unlock
     * @memberOf Clothes
     * @instance
     * @returns {Clothes}
     */
    unlock() {
        gameData.clothes[this.id].Unlocked = true;
        return this;
    }

    /**
     * @method buy
     * @memberOf Clothes
     * @instance
     * @return {Clothes}
     */
    buy() {
        if (this.isUnlocked() === false) {
            GAME.removeGold(this.getCost());
            this.unlock();
            globalEvents.emit('refreshClothes');
        }

        return this;
    }

    /**
     * @method addStyle
     * @member Clothes
     * @instance
     * @param {ClothesStyle} style
     * @returns {Clothes}
     */
    addStyle(style) {
        this.styles[style.id] = style;
        return this;
    }

    /**
     * @method removeStyle
     * @memberOf Clothes
     * @instance
     * @param {string} styleID
     */
    removeStyle(styleID) {
        delete this.styles[styleID];
    }

    /**
     * @method getStyle
     * @memberOf Clothes
     * @instance
     * @param {string} styleID
     * @returns {ClothesStyle}
     */
    getStyle(styleID) {
        return this.styles[styleID];
    }

    /**
     * @method getAllStyles
     * @memberOf Clothes
     * @instance
     * @param {boolean} [visible=true]
     * @returns {object}
     */
    getAllStyles(visible) {
        if (visible === undefined) {
            visible = true;
        }

        if (visible === true) {
            let array = [];

            for (let style in this.styles) {
                if (this.styles[style].isVisible()) {
                    array.push(style);
                }
            }

            return array;
        } else {
            return this.styles;
        }
    }

    /**
     * @method setStyle
     * @memberOf Clothes
     * @instance
     * @param {string|boolean} styleID
     * @returns {Clothes}
     */
    setStyle(styleID) {
        gameData.clothes[this.id].Style = styleID;
        globalEvents.emit('refreshGirls');
        return this;
    }

    /**
     * @method getPlayerStyle
     * @memberOf Clothes
     * @instance
     * @returns {string|boolean}
     */
    getPlayerStyle() {
        let styleID = gameData.clothes[this.id].Style;
        if (styleID === false) {
            return false;
        } else if (this.getStyle(styleID)) {
            return this.getStyle(styleID).id;
        } else {
            this.setStyle(false);
            return false;
        }
    }

    /**
     * @method setFace
     * @memberOf Clothes
     * @instance
     * @param {string} key
     * @returns {Clothes}
     */
    setFace(key) {
        this.face = key;
        return this;
    }

    /**
     * @method getFace
     * @memberOf Clothes
     * @instance
     * @returns {string}
     */
    getFace() {
        return this.face;
    }

    /**
     * @method setBody
     * @memberOf Clothes
     * @instance
     * @param {string} key
     * @returns {Clothes}
     */
    setBody(key) {
        this.body = key;
        return this;
    }

    /**
     * @method getBody
     * @memberOf Clothes
     * @instance
     * @returns {string}
     */
    getBody() {
        return this.body;
    }

    /**
     * @method setVisible
     * @memberOf Clothes
     * @instance
     * @param condition
     * @returns {Clothes}
     */
    setVisible(condition) {
        this.visible = condition;
        return this;
    }

    /**
     * @method isVisible
     * @memberOf Clothes
     * @instance
     * @returns {boolean}
     */
    isVisible() {
        if (typeof this.visible === "boolean") {
            return this.visible;
        } else if (typeof this.visible === "function") {
            return this.visible();
        } else {
            return false;
        }
    }

    /**
     * @method setGirl
     * @memberOf Clothes
     * @instance
     * @param {string} girl
     * @returns {Clothes}
     */
    setGirl(girl) {
        this.Girl = GAME.girl.getGirl(girl);
        return this;
    }

    /**
     * @method getGirl
     * @memberOf Clothes
     * @instance
     * @returns {Girl}
     */
    getGirl() {
        return this.Girl;
    }

    /**
     * @method setName
     * @memberOf Clothes
     * @instance
     * @param {string} name
     * @returns {Clothes}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }

    /**
     * @method setDescription
     * @memberOf Clothes
     * @instance
     * @param {string} text
     * @returns {Clothes}
     */
    setDescription(text) {
        this.description = text;
        return this;
    }

    /**
     * @method getDescription
     * @memberOf Clothes
     * @instance
     * @returns {string}
     */
    getDescription() {
        return this.description;
    }

    /**
     * @method setLevel
     * @memberOf Clothes
     * @instance
     * @param {number} number
     * @returns {Clothes}
     */
    setLevel(number) {
        this.level = number;
        return this;
    }

    /**
     * @method getLevel
     * @memberOf Clothes
     * @instance
     * @returns {number}
     */
    getLevel() {
        return this.level;
    }

    /**
     * @method setShop
     * @memberOf Clothes
     * @instance
     * @param {boolean} boolean
     * @returns {Clothes}
     */
    setShop(boolean) {
        this.shop = boolean;
        return this;
    }

    /**
     * @method getShop
     * @memberOf Clothes
     * @instance
     * @returns {boolean}
     */
    getShop() {
        return this.shop;
    }

    /**
     * @method setCost
     * @memberOf Clothes
     * @param {number} amount
     * @returns {Clothes}
     */
    setCost(amount) {
        this.cost = amount;
        return this;
    }

    /**
     * @method getCost
     * @memberOf Clothes
     * @returns {number}
     */
    getCost() {
        return this.cost;
    }

    /**
     * @method setStat
     * @memberOf Clothes
     * @instance
     * @param {string|object} skill
     * @param {number} [amount]
     * @returns {Clothes}
     */
    setStat(skill, amount) {
        if (typeof skill === "object") {
            for (let i in skill) {
                this.stats[i] = skill[i];
            }
        } else {
            this.stats[skill] = amount;
        }
        return this;
    }

    /**
     * @method getStats
     * @memberOf Clothes
     * @instance
     * @param {string} skill
     * @returns {object|number}
     */
    getStats(skill) {
        if (skill) {
            return this.stats[skill];
        } else {
            return this.stats;
        }
    }
}


class ClothesManager {
    /**
     * @constructor
     * @property {object<Clothes>} Clothes
     */
    constructor() {
        this.Clothes = {};
    }

    _initClothes() {
        // Queen
        this.add(new Clothes('PrincessQueen', 'Queen', false))
            .setName("Princess")
            .setDescription("A dress a princess would wear.")
            .setLevel(25)
            .setStat({Tits: 3, Pussy: 2});
        this.add(new Clothes('MudQueen', 'Queen', false))
            .setName('Mud')
            .setDescription('Not really clothes, just mud slathered onto her body.')
            .setLevel(20)
            .setStat({Throat: 1, Tits: 1, Pussy: 1});
        this.add(new Clothes('ForestQueen', 'Queen', false))
            .setName('Greenhaven')
            .setDescription("The women of Greenhaven don't seem to wear much clothing.")
            .setLevel(12)
            .setStat({Throat: 1, Pussy: 1});
        this.add(new Clothes('SchoolgirlQueen', 'Queen', false))
            .setName('School Uniform')
            .setDescription("A uniform for school.")
            .setLevel(5)
            .setStat({Pussy: 2})
            .setShop(true)
            .setCost(200)
            .setVisible(true);
        this.add(new Clothes('DefaultQueen', 'Queen', true))
            .setLevel(0)
            .addStyle(new ClothesStyle('AlphaBlack', "Transparent Black", function () {
                return GAME.quest.isComplete('alphaBlack', 'Start');
            }));
        this.add(new Clothes('Valentines2020Queen', 'Queen', false)
            .setName('Lingerie')
            .setDescription('Valentines 2020 Event')
            .setLevel(0)
            .setStat({Throat: 1, Tits: 1, Pussy: 1, Anal: 1}));
        this.add(new Clothes('Halloween2019Queen', 'Queen', false))
            .setName('Succubus')
            .setDescription("Halloween 2019 Event")
            .setLevel(20)
            .setStat({Throat: 2, Tits: 2, Pussy: 2})
            .setShop(true)
            .setCost(1000)
            .setVisible(() => {
                return GAME.quest.isComplete('hornyBoris', 'End');
            });

        // Suki
        this.add(new Clothes('PrincessSuki', 'Suki', false))
            .setName("Princess")
            .setDescription("A dress a princess would wear.")
            .setLevel(25)
            .setStat({Tits: 3, Pussy: 2});
        this.add(new Clothes('MudSuki', 'Suki', false))
            .setName('Mud')
            .setDescription('Not really clothes, just mud slathered onto her body.')
            .setLevel(20)
            .setStat({Throat: 1, Tits: 1, Pussy: 1});
        this.add(new Clothes('ForestSuki', 'Suki', false))
            .setName('Greenhaven')
            .setDescription("The women of Greenhaven don't seem to wear much clothing.")
            .setLevel(12)
            .setStat({Throat: 1, Pussy: 1});

        // this.add(new Clothes('LeotardSuki', 'Suki', false))
        //     .setName('Leotard')
        //     .setDescription("Silky smooth leotard. Careful, tears easily.")
        //     .setLevel(30)
        //     .setStat({Pussy: 2, Tits: 2})
        //     .setShop(true)
        //     .setCost(2000)
        //     .setVisible(function () {
        //         return GAME.quest.isComplete('principalFeetQuest', 'Started');
        //     });

        this.add(new Clothes('DefaultSuki', 'Suki', true))
            .setLevel(0)
            .setStat({Pussy: 3});
        this.add(new Clothes('Valentines2020Suki', 'Suki', false)
            .setName('Lingerie')
            .setDescription('Valentines 2020 Event')
            .setLevel(0)
            .setStat({Throat: 1, Tits: 1, Pussy: 1, Anal: 1}));
        this.add(new Clothes('Halloween2019Suki', 'Suki', false))
            .setName('Nurse')
            .setDescription("Halloween 2019 Event")
            .setLevel(20)
            .setStat({Throat: 2, Tits: 2})
            .setShop(true)
            .setCost(1000)
            .setFace('Halloween2019')
            .setVisible(() => {
                return GAME.quest.isComplete('hornyBoris', 'End');
            });


        // Esxea
        this.add(new Clothes('PrincessEsxea', 'Esxea', false))
            .setName("Princess")
            .setDescription("A dress a princess would wear.")
            .setLevel(25)
            .setStat({Tits: 3, Pussy: 2});

        this.add(new Clothes('MudEsxea', 'Esxea', false))
            .setName('Mud')
            .setDescription('Not really clothes, just mud slathered onto her body.')
            .setLevel(20)
            .setStat({Throat: 1, Tits: 1, Pussy: 1});
        this.add(new Clothes('ForestEsxea', 'Esxea', false))
            .setName('Greenhaven')
            .setDescription("The women of Greenhaven don't seem to wear much clothing.")
            .setLevel(12)
            .setStat({Throat: 1, Pussy: 1});
        this.add(new Clothes('DefaultEsxea', 'Esxea', true))
            .setLevel(0)
            .setStat({Tits: 1, Pussy: 1});
        this.add(new Clothes('Valentines2020Esxea', 'Esxea', false)
            .setName('Lingerie')
            .setDescription('Valentines 2020 Event')
            .setLevel(0)
            .setStat({Throat: 1, Tits: 1, Pussy: 1, Anal: 1}));
        this.add(new Clothes('Halloween2019Esxea', 'Esxea', false))
            .setName('Super Hero')
            .setDescription("Halloween 2019 Event")
            .setLevel(20)
            .setStat({Throat: 2})
            .setShop(true)
            .setCost(1000)
            .setVisible(() => {
                return GAME.quest.isComplete('hornyBoris', 'End');
            });

        // Scarlett
        this.add(new Clothes('PrincessScarlett', 'Scarlett', false))
            .setName("Princess")
            .setDescription("A dress a princess would wear.")
            .setLevel(25)
            .setStat({Tits: 3, Pussy: 2});

        this.add(new Clothes('MudScarlett', 'Scarlett', false))
            .setName('Mud')
            .setDescription('Not really clothes, just mud slathered onto her body.')
            .setLevel(20)
            .setStat({Throat: 1, Tits: 1, Pussy: 1});

        this.add(new Clothes('ForestScarlett', 'Scarlett', false))
            .setName('Greenhaven')
            .setDescription("The women of Greenhaven don't seem to wear much clothing.")
            .setLevel(12)
            .setStat({Throat: 1, Pussy: 1});
        this.add(new Clothes('DefaultScarlett', 'Scarlett', true))
            .setLevel(0)
            .setStat({Tits: 3});
        this.add(new Clothes('Valentines2020Scarlett', 'Scarlett', false)
            .setName('Lingerie')
            .setDescription('Valentines 2020 Event')
            .setLevel(0)
            .setStat({Throat: 1, Tits: 1, Pussy: 1, Anal: 1}));
        this.add(new Clothes('Halloween2019Scarlett', 'Scarlett', false))
            .setName('Mummy')
            .setDescription("Halloween 2019 Event")
            .setLevel(20)
            .setStat({Tits: 2, Pussy: 2})
            .setShop(true)
            .setCost(1000)
            .setVisible(() => {
                return GAME.quest.isComplete('hornyBoris', 'End');
            });

        // Ardura
        this.add(new Clothes('PrincessArdura', 'Ardura', false))
            .setName("Princess")
            .setDescription("A dress a princess would wear.")
            .setLevel(25)
            .setStat({Anal: 2, Pussy: 3});
        this.add(new Clothes('MudArdura', 'Ardura', false))
            .setName('Mud')
            .setDescription('Not really clothes, just mud slathered onto her body.')
            .setLevel(20)
            .setStat({Throat: 1, Tits: 1, Pussy: 1});
        this.add(new Clothes('DefaultArdura', 'Ardura', true))
            .setLevel(0)
            .setStat({Anal: 2});
        this.add(new Clothes('Valentines2020Ardura', 'Ardura', true)
            .setName('Lingerie')
            .setDescription('Valentines 2020 Event')
            .setLevel(0)
            .setStat({Throat: 1, Tits: 1, Pussy: 1, Anal: 1}));

    }

    /**
     * @method add
     * @memberOf ClothesManager
     * @instance
     * @param {Clothes} clothes
     * @returns {Clothes}
     */
    add(clothes) {
        this.Clothes[clothes.id] = clothes;

        if (gameData.clothes.hasOwnProperty(clothes.id) === false) {
            gameData.clothes[clothes.id] = {
                "Unlocked": clothes.unlockedByDefault,
                "Style": false
            }
        }

        return this.Clothes[clothes.id];
    }

    /**
     * @method remove
     * @memberOf ClothesManager
     * @instance
     * @param {string} clothesID
     * @returns {ClothesManager}
     */
    remove(clothesID) {
        delete this.Clothes[clothesID];
        return this;
    }

    /**
     * @method getClothes
     * @memberOf ClothesManager
     * @instance
     * @param {string} clothID
     * @returns {Clothes}
     */
    getClothes(clothID) {
        if (this.Clothes[clothID]) {
            return this.Clothes[clothID]
        } else {
            return false;
        }
    }

    /**
     * Returns an object of all the clothes, or an array of clothes for a specific girl
     * @method getAllClothes
     * @memberOf ClothesManager
     * @instance
     * @param {string} [girlID]
     * @returns {Object|Array<Clothes>}
     * */
    getAllClothes(girlID) {
        if (girlID) {
            let array = [];
            let girlClothesIDs = Object.keys(this.Clothes).filter((clothesID) => {
                return this.Clothes[clothesID].Girl.id === girlID;
            });
            for (let id of girlClothesIDs) {
                array.push(this.getClothes(id));
            }
            return array;
        } else {
            return this.Clothes;
        }
    }
}

class ClothesStyle {
    /**
     * @constructor
     * @param {string|boolean} id
     * @param {string} name
     * @param {function|boolean} condition
     */
    constructor(id, name, condition) {
        this.id = id;
        this.name = name;
        this.condition = condition;
    }

    /**
     * @method setID
     * @memberOf ClothesStyle
     * @instance
     * @param id
     * @returns {ClothesStyle}
     */
    setID(id) {
        this.id = id;
        return this;
    }

    /**
     * @method getID
     * @memberOf ClothesStyle
     * @instance
     * @returns {string}
     */
    getID() {
        return this.id;
    }

    /**
     * @method setName
     * @memberOf ClothesStyle
     * @instance
     * @param {string} name
     * @returns {ClothesStyle}
     */
    setName(name) {
        this.name = name;
        return this;
    }

    /**
     * @method getName
     * @memberOf ClothesStyle
     * @instance
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @method setCondition
     * @memberOf ClothesStyle
     * @instance
     * @param {function|boolean} condition
     * @returns {ClothesStyle}
     */
    setCondition(condition) {
        this.condition = condition;
        return this;
    }

    /**
     * @method getCondition
     * @memberOf ClothesStyle
     * @instance
     * @returns {function|boolean}
     */
    getCondition() {
        return this.condition;
    }

    /**
     * @method isVisible
     * @memberOf ClothesStyle
     * @instance
     * @returns {boolean}
     */
    isVisible() {
        if (typeof this.getCondition() === "boolean") {
            return this.getCondition();
        } else {
            return this.getCondition()();
        }
    }
}