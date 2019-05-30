/*
	Author 	: Rahat Hossain
	Date	: 31 - 5 - 19
	rahathossain690@gmail.com
*/
var HEIGHT = 9, WIDTH = 9, BOMB = 10;
var result = document.getElementById("result");
var cell = [[],[],[],[],[],[],[],[],[],[],[]];
var dirX = [-1, 0, 1,-1, 0, 1, -1,  0,  1];
var dirY = [ 1, 1, 1, 0, 0, 0, -1, -1, -1];
var explored = 0;
var continueGame = true;

function isInside(x, y){
	return 1 <= x && x <= WIDTH && 1 <= y && y <= HEIGHT;
}

function Cell(x, y){
	this.x = x;
	this.y = y;
	this.bomb = false;
	this.value = -1;
	this.controller = document.getElementById("cell" + this.x + "" + this.y);
	this.setValue = function(){
		if(this.bomb) return;
		var temp = 0;
		for(var i = 0; i < dirX.length; i++){
			if(isInside(this.x + dirX[i], this.y + dirY[i]))
				temp += cell[this.x + dirX[i]][this.y + dirY[i]].isBomb();
		}
		this.value = temp;
	}
	this.getValue = function(){
		return this.value;
	}
	this.isBomb = function(){
		return this.bomb;
	}
	this.setBomb = function(){
		this.bomb = true;
	}
}

function shuffle(){
	cell = [[],[],[],[],[],[],[],[],[],[],[]];
	explored = 0;
	continueGame = true;
	result.innerHTML = "";
	result.classList.add("normal");
	result.classList.remove("win");
	result.classList.remove("lose");
	for(var i = 1; i < 10; i++){
		for(var j = 1; j < 10; j++){
			cell[i][j] = new Cell(i, j);
			cell[i][j].controller.innerHTML = "";
			cell[i][j].controller.classList.remove("bomb");
			cell[i][j].controller.classList.remove("opened");
		}
	}
	var ans = randomize();
	for(var i = 0; i < ans.length; i++){
		cell[ (ans[i] - ans[i] % 10) / 10 ][ ans[i] % 10 ].setBomb();
	}
	for(var i = 1; i <= 9; i++){
		for(var j = 1; j <= 9; j++){
			cell[i][j].setValue();
		}
	}
}

function clicked(a){
	if(continueGame == false){
		if((HEIGHT * WIDTH) - BOMB == explored)
			result.innerHTML = "How about winning again! Shuffle to play";
		else result.innerHTML = "Better luck next time! Shuffle to play";
		return;
	}
	var y = a % 10, x = (a - y) / 10;
	if(cell[x][y].isBomb()){
		cell[x][y].controller.innerHTML = "*";
		cell[x][y].controller.classList.add("bomb");
		result.innerHTML = "OH NO! BOMB! YOU LOSE"
		result.classList.add("lose");
		continueGame = false;
		for(var i = 1; i <= 9; i++){
			for(var j = 1; j <= 9; j++){
				if(cell[i][j].isBomb())
					cell[i][j].controller.innerHTML = "*";
				else cell[i][j].controller.innerHTML = cell[i][j].getValue();
			}
		}
	}
	else {
		cell[x][y].controller.innerHTML = cell[x][y].getValue();
		cell[x][y].controller.classList.add("opened");
		explored += 1;
	}
	if((HEIGHT * WIDTH) - BOMB == explored){
		result.innerHTML = "YOU WIN!";
		result.classList.add("win");
		continueGame = false;
	}
}

function randomize(){
	var temp = [], turn = BOMB, ans = [], index;
	for(var i = 11; i < 100; i += i%10==9? 2 : 1) temp.push(i);
	while(turn--){
		index = Math.floor(Math.random() * temp.length);
		ans.push( temp[index] );
		temp.splice(index, 1);
	}
	return ans;
}