new Vue({

    el: "#app",

    data: {
        playerHeal: 100,
        monsterHeal: 100,
        gameIsOn: false,
        logs: []
    },

    methods: {

        startGame: function () {

            this.gameIsOn = true; //Starting game

            var warSound = new Audio();
            warSound.src = "./effect/war-sound.mp3";
            warSound.volume = 0.2;
            warSound.play();

        },

        attack: function () {

            var attackSound = new Audio();
            attackSound.src = "./effect/sword-effect.mp3";
            attackSound.play();

            const point = Math.ceil(Math.random() * 10)
            this.monsterHeal -= point
            this.monsterAttack();

            this.addToLog({
                turn: "Player",
                text: "Player Attack  (" + point + ")"
            })

        },

        monsterAttack: function () {
            const point = Math.ceil(Math.random() * 15)
            this.playerHeal -= point

            this.addToLog({
                turn: "Monster",
                text: "Monster Attack  (" + point + ")"
            })
        },

        specialAttack: function () {

            var specialAttackSound = new Audio();
            specialAttackSound.src = "./effect/special-attack.mp3";
            specialAttackSound.play();

            const point = Math.ceil(Math.random() * 25)
            this.monsterHeal -= point
            this.monsterAttack();

            this.addToLog({
                turn: "Player",
                text: "Player Special Attack!  (" + point + ")"
            })


        },

        giveUp: function () {


            this.playerHeal = 0;


            this.addToLog({
                turn: "Player",
                text: "Player Give Up..."
            })

        },

        healUp: function () {

            var healAttackSound = new Audio();
            healAttackSound.src = "./effect/heal.mp3";
            healAttackSound.play();

            const point = Math.ceil(Math.random() * 27)
            this.playerHeal += point
            this.monsterAttack();

            this.addToLog({
                turn: "Player",
                text: "Player Heal Up!  (" + point + ")"
            })



        },

        addToLog: function (log) {
            this.logs.push(log);
        }
    },

    watch: {
        playerHeal: function (value) {
            debugger

            if (value <= 0) {

                this.playerHeal = 0;

                
                var youLoseSound = new Audio();
                youLoseSound.src = "./effect/you-lose.mp3";
                youLoseSound.play();

                if (confirm("You Lose! Try again?")) {
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.logs = [];
                }

            } else if (value >= 100) {
                this.playerHeal = 100;
            }

        },

        monsterHeal: function (value) {



            if (value <= 0) {
                this.monsterHeal = 0;

                var youWinSound = new Audio();
                youWinSound.src = "./effect/you-win.mp3";
                youWinSound.play();


                if (confirm("You Win! Fight again?")) {
                    this.playerHeal = 100;
                    this.monsterHeal = 100;
                    this.logs = [];
                }

            } else if (value >= 100) {
                this.monsterHeal = 100;
            }

        }
    },

    computed: {

        playerProgress: function () {
            return {
                width: this.playerHeal + "%"
            }
        },
        monsterProgress: function () {
            return {
                width: this.monsterHeal + "%"
            }
        },


    }




})