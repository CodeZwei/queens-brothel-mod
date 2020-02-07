/**
 * The BATTLE object holds all of the information for the current battle.
 * @typedef BATTLE
 * @property {array<BattleClient>} CLIENTS - Array of {@link Client}, the first one in the array is always the one the girl is fucking
 * @property {BattleManager.GIRLS} GIRLS - Object that holds all of the girl's stats
 * @property {array<String>} GIRLS.girlArray - All of the girlIDs that are in the battle
 * @property {'Easy'|'Normal'|'Hard'} Difficulty - The difficulty set for this battle, does not effect anything unless certain attacks utilize this variable
 * @property Parameters - An optional variable that can store anything that is needed during the battle
 */

/**
 * @class BattleManager
 */
class BattleManager {
    constructor() {
        this.currentBattle = false;
        this.battleConditions = {}
    }

    /**
     * Creates the default game battle conditions that any client can use. These are not mandatory and are only used if you want the client to behave like it
     * @method _initBattleConditions
     * @memberOf BattleManager
     * @instance
     * @private
     */
    _initBattleConditions() {
        this.setBattleCondition('default', function () {
            return new Promise((resolve) => {
                if (this.wants.GirlLength > 0) {
                    this.wants.GirlLength -= 1;
                } else {
                    this.wants.GirlLength = 0;
                }

                if (this.wants.BodyPartLength > 0) {
                    this.wants.BodyPartLength -= 1;
                    this.currently.BodyPart = this.wants.BodyPart;
                    this.Animation = this.currently.Girl + this.currently.BodyPart + "default";
                } else {
                    this.wants.BodyPartLength = 5;
                    this.wants.BodyPart = chance.pickone(skills);
                    this.Animation = this.currently.Girl + this.wants.BodyPart + "default";
                }

                resolve();
            });
        });
        this.setBattleCondition('defaultNoAnalTits', function () {
            return new Promise((resolve) => {
                if (this.wants.GirlLength > 0) {
                    this.wants.GirlLength -= 1;
                } else {
                    this.wants.GirlLength = 0;
                }

                if (this.wants.BodyPartLength > 0) {
                    this.wants.BodyPartLength -= 1;
                    this.currently.BodyPart = this.wants.BodyPart;
                    this.Animation = this.currently.Girl + this.currently.BodyPart + "default";
                } else {
                    this.wants.BodyPartLength = 5;
                    this.wants.BodyPart = chance.pickone(['Throat', 'Pussy']);
                    this.Animation = this.currently.Girl + this.wants.BodyPart + "default";
                }


                resolve();
            });
        });
        this.setBattleCondition('defaultNoAnal', function () {
            return new Promise((resolve) => {
                if (this.wants.GirlLength > 0) {
                    this.wants.GirlLength -= 1;
                } else {
                    this.wants.GirlLength = 0;
                }

                if (this.wants.BodyPartLength > 0) {
                    this.wants.BodyPartLength -= 1;
                    this.currently.BodyPart = this.wants.BodyPart;
                    this.Animation = this.currently.Girl + this.currently.BodyPart + "default";
                } else {
                    this.wants.BodyPartLength = 5;
                    this.wants.BodyPart = chance.pickone(['Throat', 'Pussy', 'Tits']);
                    this.Animation = this.currently.Girl + this.wants.BodyPart + "default";
                }


                resolve();
            });
        });
        this.setBattleCondition('charge5', function (BATTLE) {
            return new Promise((resolve) => {
                if (this.wants.GirlLength > 0) {
                    this.wants.GirlLength -= 1;
                } else {
                    this.wants.GirlLength = 0;
                }

                if (this.wants.BodyPartLength > 0) {
                    this.wants.BodyPartLength -= 1;
                    this.currently.BodyPart = this.wants.BodyPart;
                    this.Animation = this.currently.Girl + this.currently.BodyPart + "default";
                    if (this.wants.BodyPartLength < 6 && this.getTickMS() !== 500) {
                        BATTLE.changeClientTimerDelay(this, 500);
                    }
                } else {
                    this.wants.BodyPartLength = 10;
                    this.wants.BodyPart = chance.pickone(skills);
                    this.Animation = this.currently.Girl + this.wants.BodyPart + "default";
                    if (this.getTickMS() !== 1000) {
                        BATTLE.changeClientTimerDelay(this, 1000);
                    }
                }


                resolve();
            });
        });
        this.setBattleCondition('defaultBoris', function (BATTLE) {
            return new Promise((resolve) => {
                if (this.wants.BodyPartLength > 0) {
                    this.wants.BodyPartLength -= 1;
                    this.currently.BodyPart = this.wants.BodyPart;
                    this.Animation = "forestBeast" + this.currently.BodyPart;
                    if (this.wants.BodyPartLength <= 10 && this.wants.BodyPartLength >= 6 && this.getTickMS() !== 500) {
                        BATTLE.changeClientTimerDelay(this, 600);
                    }
                    if (this.wants.BodyPartLength <= 5 && this.getTickMS() !== 300) {
                        BATTLE.changeClientTimerDelay(this, 300);
                    }
                } else {
                    this.wants.BodyPartLength = 15;
                    this.wants.BodyPart = chance.pickone(['Throat', 'Pussy']);
                    this.Animation = "forestBeast" + this.wants.BodyPart;
                    if (this.getTickMS() !== 2000) {
                        BATTLE.changeClientTimerDelay(this, 2000);
                    }
                }
                resolve();
            });
        });
        this.setBattleCondition('defaultGoblin', function (BATTLE) {
            return new Promise((resolve) => {
                if (this.wants.GirlLength > 0) {
                    this.wants.GirlLength -= 1;
                } else {
                    this.wants.Girl = chance.pickone(BATTLE.getActiveGirls());
                    this.wants.GirlLength = 10;
                }

                if (this.wants.BodyPartLength > 0) {
                    this.wants.BodyPartLength -= 1;
                    this.currently.BodyPart = this.wants.BodyPart;
                    this.Animation = this.currently.Girl + this.currently.BodyPart + "default";
                } else {
                    this.wants.BodyPartLength = 5;
                    this.wants.BodyPart = chance.pickone(skills);
                    this.Animation = this.currently.Girl + this.wants.BodyPart + "default";
                }

                resolve();
            });
        })
    }

    /**
     * Returns the function that can be used as a battle condition.
     * BattleManager will contain a bunch of battle conditions I create for the game, the user can always create their own.
     * @method getBattleCondition
     * @memberOf BattleManager
     * @instance
     * @param {string} id
     * @returns {function}
     */
    getBattleCondition(id) {
        return this.battleConditions[id];
    }

    /**
     * Adds/Changes a battle condition function
     * @method setBattleCondition
     * @memberOf BattleManager
     * @instance
     * @param {string} id
     * @param {function} callback
     * @returns {BattleManager}
     */
    setBattleCondition(id, callback) {
        this.battleConditions[id] = callback;
        return this;
    }

    /**
     * Generates an array of clients that could have been summoned with the current reputation
     * @method getClientPack
     * @memberOf BattleManager
     * @instance
     */
    getClientPack() {
        let clients = [];
        let available = [];

        // Easthollow
        available.push('EasthollowResident');

        // Greenhaven
        if (GAME.quest.isComplete('hornyBoris', 'End')) {
            available.push('GreenhavenResident');
        }

        // Morass
        // if (GAME.quest.isComplete('swampBeastQuest', 'Completed')) {
        //     available.push('Goblin');
        // }

        // Avia
        // if (GAME.quest.isComplete('kingsQuest', 'Completed')) {
        //     available.push('AviaResident');
        // }

        let clientLength = 2;
        if (GAME.girl.getUnlocked() >= 6) {
            clientLength = 6;
        }

        for (let i = 1; i <= clientLength; i++) {
            if (i > 6) {
                break;
            }
            let rnd = chance.pickone(available);

            let client = new BattleClient(rnd);

            if (rnd === "EasthollowResident") {
                client
                    .setLevel(chance.integer({min: 2, max: 8}))
                    .setGold(8)
                    .setTicksToFuck(10)
                    .setTickMS(1000)
                    .addBattleCondition('default', true);
                if (GAME.quest.isComplete('townMorals') === false) {
                    client.addBattleCondition('defaultNoAnalTits', true)
                }
                if (GAME.quest.isComplete('sukiQuest') === false) {
                    client.addBattleCondition('defaultNoAnal', true);
                }
            } else if (rnd === "GreenhavenResident") {
                client
                    .setLevel(chance.integer({min: 8, max: 20}))
                    .setGold(14)
                    .setTicksToFuck(20)
                    .setTickMS(1000)
                    .addBattleCondition('charge5', true)
                    .setBodyPartLength(10);
            } else if (rnd === "Goblin") {
                client
                    .setLevel(4)
                    .setGold(8)
                    .setTicksToFuck(10)
            } else if (rnd === "AviaResident") {
                client
                    .setLevel(4)
                    .setGold(8)
                    .setTicksToFuck(10)
            }

            clients.push(client);
        }

        clients = Phaser.Utils.Array.Shuffle(clients);

        return clients;
    }

    /**
     * @method _onClientTick
     * @memberOf BattleManager
     * @instance
     * @private
     * @param {Battle} BATTLE
     * @param {string} girl
     * @param {string} clientGUID
     */
    _onClientTick(BATTLE, girl, clientGUID) {
        let client = BATTLE.getClientByGUID(clientGUID);
        let bodyPart = client.currently.BodyPart;
        client.cum += (1 / client.getTicksToFuck()) * 100;

        let girlLevel = GAME.girl.getGirl(girl).getStat(bodyPart);
        let totalDamage = 0.2 - (0.2 * (Math.round(GAME.Sigmoid(girlLevel, client.getLevel()) * 10) / 10));
        if (totalDamage <= 0) {
            totalDamage = 0.01;
        }

        let totalExp = client.getExp(girl);

        let iterateTicks = (index) => {
            return new Promise((resolve) => {
                let iterate = (index) => {
                    if (client.onTick[index]) {
                        let condition = client.onTick[index];

                        if (condition.getType() === "Battle") {
                            condition.do(client.cum, totalDamage, totalExp).then((results) => {
                                if (results) {
                                    if (results.hasOwnProperty("Cum")) {
                                        client.cum = results.Cum;
                                    }
                                    if (results.hasOwnProperty("totalDamage")) {
                                        totalDamage = results.totalDamage;
                                    }
                                    if (results.hasOwnProperty('totalExp')) {
                                        totalExp = results.totalExp;
                                    }
                                }

                                iterate(index + 1);
                            });
                        } else if (condition.getType() === "Dialogue") {
                            if (condition.Happened === true && condition.Repeat === false) {
                                iterate(index + 1);
                            } else if (condition.Condition(condition, BATTLE, girl, bodyPart, client) === true) {
                                condition.Happened = true;
                                condition.RepeatCounter += 1;
                                client.addToQueue(condition);
                                BATTLE.stopClientTimer(client);
                                iterate(index + 1);
                            } else {
                                iterate(index + 1);
                            }
                        } else if (condition.getType() === "User") {
                            condition.do().then(() => {
                                iterate(index + 1);
                            });
                        } else {
                            iterate(index + 1);
                        }
                    } else {
                        resolve();
                    }
                };
                iterate(index);

            });
        };

        iterateTicks(0).then(() => {
            GAME.girl.getGirl(girl).loseStamina(totalDamage);
            GAME.girl.getGirl(girl).gainExp(totalExp, true);

            if (client.cum >= 100) {
                client.cum = 100;
            }

            if (GAME.girl.getGirl(girl).getStamina() < 0) {
                BATTLE.stopClientTimer(client);
                if (GAME.girl.getUnlocked(true).length <= 0) {
                    globalEvents.emit('loseBattle');
                }
            }

            if (client.wants.Girl !== client.currently.Girl && client.wants.Girl !== "Any") {
                BATTLE.stopClientTimer(client);
            }

            globalEvents.emit('clientTick', BATTLE, girl, clientGUID);
        });
    }

    /**
     * @method startBattle
     * @memberOf BattleManager
     * @instance
     * @param {Battle} Battle
     * @returns {Promise<boolean>}
     */
    startBattle(Battle) {
        return new Promise((resolve) => {
            this.currentBattle = Battle;
            globalEvents.on('_clientTick', this._onClientTick, this);

            game.scene.start('BattleScene', {pauseAllScenes: true, BATTLE: this.currentBattle});
            game.scene.getScene('BattleScene').events.once('shutdown', (scene, data) => {
                globalEvents.off('_clientTick', this._onClientTick);
                resolve(data.answer);
            })
        });
    }
}

class Battle {
    /**
     * @constructor
     * @param {Array<string>} [girlArray]
     * @param {'Easy'|'Normal'|'Hard'} [difficulty="Easy"]
     * @param {*} [parameters]
     * @returns {Battle}
     */
    constructor(girlArray, difficulty, parameters) {
        girlArray = girlArray || GAME.girl.getUnlocked();
        difficulty = difficulty || 'Easy';
        parameters = parameters || null;

        this.GIRLS = {
            girlArray: girlArray
        };
        this.CLIENTS = [];
        this.SelectedClient = false;
        this.Difficulty = difficulty;
        this.Parameters = parameters;

        for (let i in girlArray) {
            this.GIRLS[girlArray[i]] = {
                Client: false,
            }
        }

        return this;
    }

    /**
     * To manually win the battle at any point
     * @method winBattle
     * @memberOf Battle
     * @instance
     */
    winBattle() {
        game.scene.getScene('BattleScene').winBattle();
    }

    /**
     * To manually lose the battle at any point
     * @method loseBattle
     * @memberOf Battle
     * @instance
     */
    loseBattle() {
        game.scene.getScene('BattleScene').loseBattle();
    }

    /**
     * @method addClient
     * @memberOf Battle
     * @instance
     * @param {string|BattleClient} client - Client ID or a new {@link BattleClient}
     * @param {number} [level]
     * @param [startGirl]
     * @param [startBodyPart]
     * @param [defaultBattleCondition='default']
     * @returns {Battle}
     */
    addClient(client, level, startGirl, startBodyPart, defaultBattleCondition) {
        if (typeof client === "string") {
            this.CLIENTS.push(new BattleClient(client, level, startGirl, startBodyPart, defaultBattleCondition));
        } else {
            this.CLIENTS.push(client);
        }

        globalEvents.emit('refreshClients');

        return this;
    }

    /**
     * @method addClients
     * @memberOf Battle
     * @instance
     * @param {Array<BattleClient>} clients
     * @returns {Battle}
     */
    addClients(clients) {
        for (let client of clients) {
            this.CLIENTS.push(client);
        }

        globalEvents.emit('refreshClients');

        return this;
    }


    /**
     * @method fuck
     * @memberOf Battle
     * @instance
     * @param {string} girl
     * @param {BattleClient} client
     * @returns {null}
     */
    fuck(girl, client) {
        if (client === false) {
            GAME.notify("Select a client!");
            return null;
        }
        let bodyPart = client.getWants().BodyPart;
        if (this.clientWantsMatch(client, girl) === false) {
            GAME.notify("Client does not want " + girl);
            return null;
        }
        if (GAME.girl.getGirl(girl).getStamina() <= 0) {
            GAME.notify(girl + " does not have enough stamina!");
            return null;
        }
        if (this.GIRLS[girl].Client !== false) {
            this.stopClientTimer(this.GIRLS[girl].Client);
            this.GIRLS[girl].Client = client;
        }
        if (client.currently.Girl !== false) {
            this.GIRLS[client.currently.Girl].Client = false;
        }
        if (client.cum >= 100) {
            client.currently.Girl = girl;
            client.currently.BodyPart = bodyPart;
            client.doCum(this, girl, bodyPart, client).then((newGirl, newBodyPart) => {
                newGirl = newGirl || girl;
                newBodyPart = newBodyPart || bodyPart;
                this.stopClientTimer(client);
                this.clientCum(newGirl, newBodyPart, client);
            });
            return null;
        }

        this.startClientTimer(girl, bodyPart, client);
        globalEvents.emit('doClient');
    }

    /**
     * @method startClientTimer
     * @memberOf Battle
     * @instance
     * @param girl
     * @param bodyPart
     * @param client
     */
    startClientTimer(girl, bodyPart, client) {
        this.stopClientTimer(client);
        let GUID = client.GUID;
        client.timer = game.scene.getScene('BattleScene').time.addEvent({
            delay: client.getTickMS(), callback: () => {
                globalEvents.emit('_clientTick', this, girl, GUID);
            }, loop: true
        });
        this.GIRLS[girl].Client = client;
        client.currently.Girl = girl;
        client.currently.BodyPart = bodyPart;
        globalEvents.emit("startClientTimer", this, girl, client);
    }

    /**
     * Also changes the client's tickMS
     * @method changeClientTimerDelay
     * @memberOf Battle
     * @instance
     * @param client
     * @param delay
     */
    changeClientTimerDelay(client, delay) {
        let girl = client.currently.Girl;
        client.setTickMS(delay);
        client.timer.reset({
            delay: client.getTickMS(), callback: () => {
                globalEvents.emit('_clientTick', this, girl, client.GUID);
            }, loop: true
        })
    }

    /**
     * @method pauseClientTimer
     * @memberOf Battle
     * @instance
     * @param client
     */
    pauseClientTimer(client) {
        if (client.timer !== false) {
            client.timer.paused = true;
        }
    }

    /**
     * @method resumeClientTimer
     * @memberOf Battle
     * @instance
     * @param client
     */
    resumeClientTimer(client) {
        if (client.timer !== false) {
            client.timer.paused = false;
        }
    }

    /**
     * @method stopClientTimer
     * @memberOf Battle
     * @instance
     * @param client
     */
    stopClientTimer(client) {
        if (client.timer !== false) {
            client.timer.destroy();
        }
        if (client.currently.Girl !== false) {
            this.GIRLS[client.currently.Girl].Client = false;
        }

        client.currently.Girl = false;
        client.currently.BodyPart = false;
        client.timer = false;
        client.Animation = "battleNullImage";
        globalEvents.emit('stopClientTimer', client);
    }

    /**
     * @method clientWantsMatch
     * @memberOf Battle
     * @instance
     * @param client
     * @param girl
     * @returns {boolean}
     */
    clientWantsMatch(client, girl) {
        if (client.wants.Girl !== 'Any') {
            if (client.wants.Girl !== girl) {
                return false;
            }
        }

        return true;
    }

    /**
     * @method clientCum
     * @memberOf Battle
     * @instance
     * @param girl
     * @param bodyPart
     * @param client
     */
    clientCum(girl, bodyPart, client) {
        GAME.girl.getGirl(girl).cumOn(bodyPart);
        GAME.girl.getGirl(girl).fuckGuys(1);
        if (client.getGold(girl) > 0) {
            GAME.addGold(client.getGold(girl));
        }
        client.finished = true;
        this.SelectedClient = false;

        globalEvents.emit('clientCum', this, girl, bodyPart, client);
    }

    /**
     * @method getClientByGUID
     * @memberOf Battle
     * @instance
     * @param clientGUID
     * @returns {*|boolean}
     */
    getClientByGUID(clientGUID) {
        return this.CLIENTS[this.CLIENTS.map(function (x) {
            return x.GUID
        }).indexOf(clientGUID)] || false;
    }

    /**
     * Returns a number of active clients
     * @method numActiveClients
     * @memberOf Battle
     * @instance
     * @returns {number}
     */
    numActiveClients() {
        let counter = 0;

        for (let client of this.CLIENTS) {
            if (client.getFinished() === false) {
                counter += 1;
            }
        }

        return counter;
    }

    /**
     * Returns the girls that have stamina
     * @method getActiveGirls
     * @memberOf Battle
     * @instance
     * @returns {Array<string>}
     */
    getActiveGirls() {
        let array = [];

        for (let girl of this.GIRLS.girlArray) {
            if (GAME.girl[girl].getStamina() > 0) {
                array.push(girl);
            }
        }

        return array;
    }
}