import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts.css';
import choices from './choices.json';

function header() {
  return <h3 class="head">·-—  timeline  —-·</h3>;
}

function label(text, variable) {
  return <div class="label">{text}: {variable}</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.choicesLeft = choices.slice();
    const opt1 = this.getNewChoice();
    const opt2 = this.getNewChoice();
    this.state = {
      highscore: 0,
      score : 0,
      option1 : opt1,
      option2: opt2,
      gameOver: false,
      label: "Which came first?",
    };
  }

  getNewChoice() {
    if (this.choicesLeft.length === 0) {
      this.choicesLeft = choices.slice();
      if (this.choicesLeft.indexOf(this.state.option1) > -1) {
        this.choicesLeft.splice(this.choicesLeft.indexOf(this.state.option1), 1);
      }
      if (this.choicesLeft.indexOf(this.state.option2) > -1) {
        this.choicesLeft.splice(this.choicesLeft.indexOf(this.state.option2), 1);
      }
    }
    var index = Math.floor(Math.random() * this.choicesLeft.length);
    var toReturn = this.choicesLeft[index];

    this.choicesLeft.splice(index, 1);
    return toReturn;
  }

  opt1Clicked() {
    if (!this.state.gameOver) {
      this.roundOver(true);
    }
  }

  opt2Clicked() {
    if (!this.state.gameOver) {
      this.roundOver(false);
    }
  }

  roundOver(isOpt1) {
    var isOpt1Correct = true;

    const opt1Date = this.state.option1["year"] + (this.state.option1["month"]/12);
    const opt2Date = this.state.option2["year"] + (this.state.option2["month"]/12);

    if (opt1Date > opt2Date) {
      isOpt1Correct = false;
    }

    if ((isOpt1 && isOpt1Correct) || (!isOpt1 && !isOpt1Correct)) {
      let currScore = this.state.score;
      var opt1 = this.state.option1;
      var opt2 = this.state.option2;
      var newHigh = this.state.highscore;
      if (isOpt1Correct) {
        opt2 = this.getNewChoice();
      } else {
        opt1 = this.getNewChoice();
      }
      if (currScore + 1 > this.state.highscore) {
        newHigh += 1;
      }
      this.setState({
        score: currScore + 1,
        option1: opt1,
        option2: opt2,
        highscore: newHigh,
      });
    } else {
      this.setState({
        gameOver: true,
        label: "Game Over :(",
      });
    }
  }

  restart() {
    console.log("restart clicked");
    this.choicesLeft = choices.slice();
    const opt1 = this.getNewChoice();
    const opt2 = this.getNewChoice();
    this.setState({
      score : 0,
      option1 : opt1,
      option2: opt2,
      gameOver: false,
      label: "Which came first?",
    });
  }

  render() {
    const opt1ToDisplay = this.state.option1["choice"];
    const opt2ToDisplay = this.state.option2["choice"];

    return (
      <div>
        {header()}
        <div style={{"marginBottom": this.state.gameOver ? '30px' : '0px'}}>{this.state.label}</div>
        <div style={{display: this.state.gameOver ? 'none' : 'flex'}} class="choicesPanel">
          <button class="option" onClick={() => this.opt1Clicked()}>{opt1ToDisplay}</button>
          <button class="option" onClick={() => this.opt2Clicked()}>{opt2ToDisplay}</button>
        </div>
        {label("Score", this.state.score)}
        {label("High Score", this.state.highscore)}
        <div style={{display: this.state.gameOver ? 'block' : 'none' }}>
          <button class="restart" onClick={() => this.restart()}>Restart</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
