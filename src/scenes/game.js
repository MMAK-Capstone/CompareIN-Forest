import Phaser from 'phaser';
import bg from '../assets/bg.jpg';
import lessButton from '../assets/lessthan.png';
import book from '../assets/book.png';
import banner from '../assets/banner.png';
import wrongAns from '../assets/wrongAns.png';
import scoreImg from '../assets/score.png';
import greaterButton from '../assets/greaterthan.png';
import equalButton from '../assets/equal.png';
import airplane from '../assets/airplane.png';

let number1Text;
let number2Text;
let headingText;
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
};

Game.create = function() {
	this.add.image(400, 300, 'bg').setScale(0.5);
	this.add.image(250, 300, 'book1');
	this.add.image(500, 300, 'book2');
	this.add.image(540, 100, 'scoreImg');

	this.airplaneBanner = this.physics.add.sprite(1100, 200, 'airplane');
	this.airplaneBanner.body.setAllowGravity(false);

	let number1 = Math.floor(Math.random() * 100);
	let number2 = Math.floor(Math.random() * 100);
	// let heading = 'Compare two numbers';
	// headingText = this.add.text(30, 30, heading, { fontFamily: 'Amarante', fontSize: '20px', fill: '#000' });
	number1Text = this.add.text(260, 270, number1, { fontSize: '50px', fill: '#000' });
	number2Text = this.add.text(520, 270, number2, { fontSize: '50px', fill: '#000' });
	resultText = this.add.text(300, 400, '', { fontSize: '30px', fill: 'red' });
	scoreText = this.add.text(470, 60, scoreText, { fontSize: '27px', fill: '#000' });

	scoreText.setText('Score: ' + score);
	const leButton = this.add.image(220, 500, 'lessButton').setInteractive({ useHandCursor: true });
	leButton.on('pointerdown', () => {
		if (number1 < number2) {
			this.result = 'right';
			score += 5;
			scoreText.setText('Score:' + score);
			this.scene.restart();
		} else if (number1 > number2 || number1 === number2) {
			// console.log('Wrong Answer...');
			resultText.setText('Wrong Answer!!!');
		}
	});
	const gtButton = this.add.image(440, 500, 'greaterButton').setInteractive({ useHandCursor: true });
	gtButton.on('pointerdown', () => {
		if (number1 > number2) {
			score += 5;
			scoreText.setText('Score ' + score);
			this.scene.restart();
		} else if (number1 < number2 || number1 === number2) {
			// console.log('Wrong Answer...');
			resultText.setText('Wrong Answer!!!');
		}
	});

	const eqButton = this.add.image(660, 500, 'equalButton').setInteractive({ useHandCursor: true });
	eqButton.on('pointerdown', () => {
		if (number1 === number2) {
			score += 5;
			scoreText.setText('Score ' + score);
			this.scene.restart();
		} else if (number1 < number2 || number1 > number2) {
			// console.log('Wrong Answer...');
			resultText.setText('Wrong Answer!!!');
		}
	});

	// headingText.setText(heading);
	number1Text.setText(number1);
	number2Text.setText(number2);
};

Game.update = function() {
	if (score >= 10) {
		this.airplaneBanner.x -= 4;
	}
};
export default Game;
