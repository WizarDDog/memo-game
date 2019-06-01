import React, { Component } from 'react';
import './App.scss';
import { logos } from './data/logos';
import { difficulty } from './data/difficulty';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: [],
        checked: '',
        double: [],
        oneOpened: false,
        secondOpened: false,
        show: false,
      }
  }

  shuffle = short => {
    let changeHowMuch = [...logos];
    changeHowMuch.splice(0, short)
    changeHowMuch = changeHowMuch.concat(changeHowMuch);
    let currentIndex = changeHowMuch.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = changeHowMuch[currentIndex];
      changeHowMuch[currentIndex] = changeHowMuch[randomIndex];
      changeHowMuch[randomIndex] = temporaryValue;
    }
    return this.setState({
      data: [...changeHowMuch],
      show: true,
    });
  }

  showClicked = which => {
    let { data, oneOpened } = this.state;
    let newArr = []
    if (!data[which].view) {
      data.map(logo => {
        return newArr.push(Object.assign({}, logo))
      })
      newArr[which].view = true
      if (oneOpened) {
        this.setState({
          data: [...newArr],
          whichSecond: which,
          secondOpened: true,
        })
      } else {
        this.setState({
          data: [...newArr],
          whichOpened: which,
          oneOpened: true,
        })
      }
    }
  }

  checkIfMatches = () => {
    let { data, whichOpened, whichSecond } = this.state;
    let newArr = [];
    if (data[whichSecond].name === data[whichOpened].name) {
      data.map(logo => {
        return newArr.push(Object.assign({}, logo))
      })
      newArr[whichSecond].checked = true;
      newArr[whichOpened].view = false;
      newArr[whichOpened].checked = true;
      this.setState({
        data: [...newArr],
        oneOpened: false,
        secondOpened: false,
      })
    } else {
      data.map(logo => {
        return newArr.push(Object.assign({}, logo))
      })
      newArr[whichSecond].view = false;
      newArr[whichOpened].view = false;
      this.setState({
        data: [...newArr],
        oneOpened: false,
        secondOpened: false,
      })
    }
  }

  render() {
  const { data, secondOpened, show } = this.state;

  if (secondOpened) {
    setTimeout(() => this.checkIfMatches(), 800);
  }
  return (
    <div className="App">
      {!show ? (
      <div className="difficulty">
        <div className="choose">
          Choose difficulty:
        </div>
        {difficulty.map(dif => 
          <button className="choose-difficulty" onClick={() => this.shuffle(dif.index)}>
            {dif.title}
          </button>
        )}
      </div>
      ) : (
      <div className="all-logos">
        {data.map((logo, i) =>
          <div 
            className={`logo ${logo.view ? "view" : ''} ${logo.checked ? "checked" : ''}`} 
            key={i} 
            onClick={() => {!secondOpened ? this.showClicked(i) : console.log("Can`t do")}}
          >
            <div className="front">
                PICK ME!
            </div>
            <div className="back">
              <img src={logo.logo} alt={logo.name}/>
            </div>
          </div>
        )}
        <div className="rechoose">
          <button onClick={() => this.setState({show: false})}>Change Difficulty</button>
        </div>
      </div>
      )}
    </div>
    );
  }
}

export default App;
