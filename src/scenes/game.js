import Phaser from 'phaser';
import bg from '../assets/bg.jpg';
import lessButton from '../assets/lessthan.png';
import book from '../assets/book.png';
import endingSceneImg from '../assets/woodEnding.png';
import scoreImg from '../assets/score.png';
import greaterButton from '../assets/greaterthan.png';
import equalButton from '../assets/equal.png';
import airplane from '../assets/airplane.png';
import playAgain from '../assets/play-again.png';
import animal1 from '../assets/animal1.png';
import ruleBoard from '../assets/ruleBoard2.png';
import flowerEnding from '../assets/flowerEnding.png';

let number1Text;
let number2Text;
const WinningText = 'YOU WON!!!';
let resultText;
let score = 0;
let scoreText;

const Game = new Phaser.Scene('Game');
Game.preload = function() {
	this.load.image('bg', bg);
	this.load.image('book1', book);
	this.load.image('book2', book);
	this.load.image('scoreImg', scoreImg);
	this.load.image('lessButton', lessButton);
	this.load.image('greaterButton', greaterButton);
	this.load.image('equalButton', equalButton);
	this.load.image('airplane', airplane);
	this.load.image('endingSceneImg', endingSceneImg);
	this.load.image('playAgain', playAgain);
	this.load.image('animal1', animal1);
	this.load.image('flowerEnding', flowerEnding);
	this.load.image('ruleBoard', ruleBoard);
};

Game.create = function() {
	this.add.image(400, 300, 'bg').setScale(0.5);
	this.add.image(250, 300, 'book1');
	this.add.image(500, 300, 'book2');
	this.add.image(540, 100, 'scoreImg');
	this.add.image(100, 50, 'ruleBoard').setScale(0.6);

	this.airplaneBanner = this.physics.add.sprite(1100, 200, 'airplane');
	this.airplaneBanner.body.setAllowGravity(false);

	let number1 = Game.generateNumbers();
	let number2 = Game.generateNumbers();

	number1Text = this.add.text(260, 270, number1, { fontFamily: 'Chalkduster', fontSize: '50px', fill: '#000' });
	number2Text = this.add.text(520, 270, number2, { fontFamily: 'Chalkduster', fontSize: '50px', fill: '#000' });
	resultText = this.add.text(170, 380, '', { fontFamily: 'Chalkduster', fontSize: '50px', fill: 'red' });
	scoreText = this.add.text(470, 60, scoreText, { fontFamily: 'Chalkduster', fontSize: '27px', fill: '#000' });

	scoreText.setText('Score: ' + score);
	this.leButton = this.add.image(220, 500, 'lessButton').setInteractive({ useHandCursor: true });
	this.leButton.on('pointerdown', () => {
		if (number1 < number2) {
			this.result = 'right';
			score += 5;
			scoreText.setText('Score:' + score);
			this.scene.restart();
		} else if (number1 > number2 || number1 === number2) {
			resultText.setText('WRONG ANSWER...');
			this.time.addEvent({
				delay: 2000,
				callback: this.restart1,
				callbackScope: this
			});
		}
	});
	this.gtButton = this.add.image(440, 500, 'greaterButton').setInteractive({ useHandCursor: true });
	this.gtButton.on('pointerdown', () => {
		if (number1 > number2) {
			score += 5;
			scoreText.setText('Score ' + score);
			this.scene.restart();
		} else if (number1 < number2 || number1 === number2) {
			resultText.setText('WRONG ANSWER...');
			this.time.addEvent({
				delay: 2000,
				callback: this.restart1,
				callbackScope: this
			});
		}
	});

	this.eqButton = this.add.image(660, 500, 'equalButton').setInteractive({ useHandCursor: true });
	this.eqButton.on('pointerdown', () => {
		if (number1 === number2) {
			score += 5;
			scoreText.setText('Score ' + score);
			this.scene.restart();
		} else if (number1 < number2 || number1 > number2) {
			resultText.setText('WRONG ANSWER...');
			this.time.addEvent({
				delay: 2000,
				callback: this.restart1,
				callbackScope: this
			});
		}
	});
	number1Text.setText(number1);
	number2Text.setText(number2);
};

Game.restart1 = function() {
	this.scene.restart();
};
Game.update = function() {
	if (score >= 50) {
		this.airplaneBanner.x -= 4; // adding animation to once you reach 50
		if (this.airplaneBanner.x <= -250) {
			this.scene.start(endingScene);
			score = 0;
		}
		this.leButton.visible = false;
		this.gtButton.visible = false;
		this.eqButton.visible = false;
	}
};
Game.generateNumbers = function() {
	return Math.floor(Math.random() * 100);
};
export const endingScene = new Phaser.Scene('Ending');
endingScene.create = function() {
	this.add.image(400, 300, 'bg').setScale(0.5);

	this.add.image(430, 245, 'endingSceneImg').setScale(0.23);
	this.add.image(270, 240, 'animal1');
	this.add.image(320, 220, 'flowerEnding');
	this.add.text(330, 200, WinningText, { fontFamily: 'Chalkduster', fontSize: '50px', fill: '#000' });
	const playAgainButton = this.add
		.sprite(535, 350, 'playAgain')
		.setScale(0.5)
		.setInteractive({ useHandCursor: true });
	playAgainButton.on('pointerdown', () => this.scene.start(Game));
};
export default Game;
