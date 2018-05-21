var Game = function(){
  this.playersGuess = null;
  this.winningNumber = generateWinningNumber();
  this.pastGuesses = [];
}

var generateWinningNumber = function(){
  return Math.floor(Math.random() * 100 + 1);
}

var shuffle = function(array){
  var j, x, i;

  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }

  return array;
}

var newGame = function(){
  return new Game();
}
Game.prototype.playersGuessSubmission = function(number){
  if(typeof number != 'number' || number < 1 || number > 100){
    throw "That is an invalid guess.";
  }

  else{
    this.playersGuess = number;
  }

  return this.checkGuess();
}

Game.prototype.difference = function(){
  return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function(){
  if(this.playersGuess < this.winningNumber){
    return true;
  }

  else{
    return false;
  }
}

Game.prototype.checkGuess = function(){
  if(this.playersGuess === this.winningNumber){
    return 'You Win!';
  }

  else{
    if(this.pastGuesses.includes(this.playersGuess)){
      return 'You have already guessed that number.';
    }

    else{
      this.pastGuesses.push(this.playersGuess);

      if(this.pastGuesses.length == 5){
        return 'You Lose.';
      }

      else{
        if(this.difference() < 10){
          return 'You\'re burning up!';
        }

        else if(this.difference() >= 10 && this.difference() < 25){
          return 'You\'re lukewarm.';
        }

        else if(this.difference() >= 25 && this.difference() < 50){
          return 'You\'re a bit chilly.';
        }

        else if(this.difference() >= 50){
          return 'You\'re ice cold!';
        }
      }
    }
  }
}

Game.prototype.provideHint = function(){
  retArray = [];
  retArray.push(this.winningNumber);
  for(var i = 1; i < 3; i++){
      retArray[i] = generateWinningNumber();
    }
    return shuffle(retArray);
}
