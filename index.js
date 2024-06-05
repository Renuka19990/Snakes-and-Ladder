class SnakeAndLadder {
    constructor() {
      this.boardSize = 100;
      this.snakes = {};
      this.ladders = {};
      this.players = [];
      this.positions = {};
    }
  
    addSnakes(snakeList) {
      snakeList.forEach(([head, tail]) => {
        this.snakes[head] = tail;
      });
    }
  
    addLadders(ladderList) {
      ladderList.forEach(([start, end]) => {
        this.ladders[start] = end;
      });
    }
  
    addPlayers(playerNames) {
      playerNames.forEach(name => {
        this.players.push(name);
        this.positions[name] = 0;
      });
    }
  
    rollDice() {
      return Math.floor(Math.random() * 6) + 1;
    }
  
    movePlayer(player, roll) {
      let initialPosition = this.positions[player];
      let finalPosition = initialPosition + roll;
  
      if (finalPosition > this.boardSize) {
        finalPosition = initialPosition;
      } else {
        finalPosition = this.checkSnakeOrLadder(finalPosition);
      }
  
      this.positions[player] = finalPosition;
      console.log(`${player} rolled a ${roll} and moved from ${initialPosition} to ${finalPosition}`);
      return finalPosition;
    }
  
    checkSnakeOrLadder(position) {
      if (this.snakes[position]) {
        console.log(`Oops! Landed on a snake at ${position}. Moving down to ${this.snakes[position]}.`);
        return this.snakes[position];
      }
      if (this.ladders[position]) {
        console.log(`Yay! Landed on a ladder at ${position}. Moving up to ${this.ladders[position]}.`);
        return this.ladders[position];
      }
      return position;
    }
  
    playGame() {
      let winner = null;
      while (!winner) {
        for (let player of this.players) {
          const roll = this.rollDice();
          const finalPosition = this.movePlayer(player, roll);
          if (finalPosition === this.boardSize) {
            winner = player;
            console.log(`${player} wins the game!`);
            break;
          }
        }
      }
    }
  }
  
  // Sample Input
  const snakes = [
    [62, 5], [33, 6], [49, 9], [88, 16], [41, 20],
    [56, 53], [98, 64], [93, 73], [95, 75]
  ];
  const ladders = [
    [2, 37], [27, 46], [10, 32], [51, 68], [61, 79],
    [65, 84], [71, 91], [81, 100]
  ];
  const players = ['Gaurav', 'Sagar'];
  
  // Example usage
  const game = new SnakeAndLadder();
  game.addSnakes(snakes);
  game.addLadders(ladders);
  game.addPlayers(players);
  game.playGame();
  