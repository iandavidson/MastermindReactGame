import React, { Component } from 'react';
import './Mastermind.css';



let uniqueSeed = 0;
function nextUniqueKey() {
    return uniqueSeed += 1;
}


const red = require('./images/redCircle.png');
const blue = require('./images/blueCircle.png');
const green = require('./images/greenCircle.png');
const purple = require('./images/purpleCircle.png');
const teal = require('./images/tealCircle.png');
const magenta = require('./images/magentaCircle.png');
const emptyCircle = require('./images/emptyCircle.png');
const InvisibleCircle = require('./images/InvisibleCircle.png');
const NUM_ROWS = 8;
const NUM_COLUMNS = 4;



class SecretCode extends Component
{
  render()
  {
    // console.log(this.props.secretColorCode);
    // return(<td><span role="img">Master💡💡Mind</span></td>);
    if(this.props.gameOver){
      return (
        <table className="SecretCode board_table">
          <tbody>
          <tr >
          {
            this.props.secretColorCode.map((value, index) =>
              <Cell key={index} value={value} /> )
          }
          </tr>
          </tbody>
        </table>

      );
    }else{
      return(<p> </p>);
    }
  }
}



class StatusRow extends Component
{
  //SecretColorCode={this.SecretColorCode}

    render(props)
    {

      let {
          color,
          colorName
      } = this.props.statusCircle;

      return (
        <div className="StatusRow">
        <table className="status_circles"><tbody>
         <tr><td><img onClick={this.props.resetGame}  className="large_circle" src={red} alt="red circle" /></td>
         <td><img className="large_circle" src={color} alt={colorName} /></td>
         </tr>
         </tbody>
         </table>
         <SecretCode gameOver={this.props.gameOver} secretColorCode={this.props.secretColorCode}/>
        </div>
          );

    }
}


class Cell extends Component
{
  renderPaletteType(props){
    // console.log("palette type called");
    return(
      <td onClick={() => this.props.selectedPaletteCircle(this.props.value)}>
        <img className="large_circle" src={this.props.value.color} alt={this.props.value.colorName} />
      </td>
    );
  }

  renderBodyType(props){

    return(
      <td onClick={() => this.props.handleBoardClick(this.props.value)}>
        <img className="large_circle" src={this.props.value.color} alt={this.props.value.colorName}/>
      </td>
    );
  }


  renderSecretType(props){
    // console.log("secret type called");
    // <td className="invisible_table">
    return(<td >
        <img className="large_circle" src={this.props.value.color} alt={this.props.value.colorName}/>
      </td>

    );
  }

  render()
  {

    // console.log('rendering Cell', this.props)
    //trying to differentiate the type of cell based on what arguments are defined.
      //not sure if this is the right way to go about it....

    if(this.props.selectedPaletteCircle){ //return statement for palette type of cell
      return this.renderPaletteType();

    }else if(this.props.handleBoardClick){ //return statement for body type of cell
      //this.props.handleBoardClick
      // console.log("rendering body type: ");
      // console.log(this.props.value);
      return this.renderBodyType();
    }else{ //return statement for secret code type of cell
      return this.renderSecretType();
    }
  }
}


class Palette extends Component
{
    render()
    {
      return (

            <table className="palette_circles">
              <tbody>
                <tr>
                {
                  this.props.paletteColors.map((value, index) =>
                    <Cell key={index} selectedPaletteCircle={this.props.selectedPaletteCircle}
                      value={value} /> )
                }
                </tr>
              </tbody>
            </table>
      );
    }
}


class Row extends Component
{

  IsFeedbackElementInvisible(feedbackCircle){
    if(feedbackCircle.colorName !== "Invisible Circle"){
        return(<img className="small_circle" src={feedbackCircle.color} alt={feedbackCircle.colorName} />);
    }else{
      // return(<p>nope</p>);
      return(<img className="invisible_table" src={feedbackCircle.color} alt={feedbackCircle.colorName} />);
    }
  }



  FeedbackElementRender(feedbackArray){
    // console.log(feedbackArray);


    return(
      <table>
          <tbody className="feedback_table">
              <tr><td>{this.IsFeedbackElementInvisible(feedbackArray[2])}</td>
                  <td>{this.IsFeedbackElementInvisible(feedbackArray[3])}</td></tr>
              <tr><td>{this.IsFeedbackElementInvisible(feedbackArray[0])}</td>
                  <td>{this.IsFeedbackElementInvisible(feedbackArray[1])}</td></tr>
          </tbody>
          </table>
    );
  }


  render()
  {
    // console.log("row: " + this.props.row);
    return (
      <tr>
      {
        this.props.row.map((value, idx) =>
          <Cell key={nextUniqueKey()} handleBoardClick={this.props.handleBoardClick} value={value}/>)
      }
        <td>{this.FeedbackElementRender(this.props.feedback)}</td>

      </tr>

    );
  }
}

class Mastermind extends Component {

    constructor(props) {
        super(props);

        this.paletteColors = [
            {color: green, colorName: 'Green', visable: true},
            {color: teal, colorName: 'Teal', visable: true},
            {color: magenta, colorName: 'Magenta', visable: true},
            {color: blue, colorName: 'Blue', visable: true},
            {color: red, colorName: 'Red', visable: true},
            {color: purple, colorName: 'Purple', visable: true}
        ];

        this.nonFilledCircle = {
            color: emptyCircle,
            colorName: 'Empty circle',
            visable: true
        };

        this.invisibleCircle = {
            color: InvisibleCircle,
            colorName: 'Invisible Circle',
            visable: false
        }



        this.FeedbackEmpty =
        [
            this.invisibleCircle,
            this.invisibleCircle,
            this.invisibleCircle,
            this.invisibleCircle
        ];


        let secretColorCode = [
            this.paletteColors[this.getRandomIdx(0, 5)],
            this.paletteColors[this.getRandomIdx(0, 5)],
            this.paletteColors[this.getRandomIdx(0, 5)],
            this.paletteColors[this.getRandomIdx(0, 5)]
        ];
        console.log(secretColorCode);
        // console.log(JSON.parse(JSON.stringify(this.invisibleCircle)));
        //initialize game board here
        //assign clones of circles into game board to avoid problems
        let gameboard = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill(JSON.parse(JSON.stringify(this.invisibleCircle))));

        gameboard = gameboard.map((row, rowIdx) => row.map((col, colIdx)=>{
          if(rowIdx !== 0){
            return {...gameboard[rowIdx][colIdx], row: rowIdx, column: colIdx};
          }else{
            return {...JSON.parse(JSON.stringify(this.nonFilledCircle)), row: rowIdx, column: colIdx};
          }
        }));

        //appending on a
        let feedbackArray = Array(NUM_ROWS).fill(Array(4).fill(JSON.parse(JSON.stringify(this.invisibleCircle))));


        // console.log(gameboard[0]);

        this.state = {
            secretColorCode: secretColorCode,
            mastermindArray: gameboard,   //[firstRow, secondRow], //this should be a table or 2d array.
            feedbackArray: feedbackArray,
            statusCircle: {color: emptyCircle, colorName: 'Empty circle', visible: true},
            currentRow: 0,
            currentTurn: 0,
            gameOver: false,
            winner: false
        };

        this.selectedPaletteCircle = this.selectedPaletteCircle.bind(this);
        this.handleBoardClick = this.handleBoardClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    handleBoardClick(Circle){ //should just go to current row as click listener.
        // console.log(Circle);

        let statusValue = JSON.parse(JSON.stringify(this.state.statusCircle));
        if(statusValue.colorName === 'Empty circle'){
          console.log("Status circle is empty");
          return;
        }else if(Circle.colorName !== "Empty circle"){
          console.log("circle clicked is not empty");
          return;
        }
        //assign copy of statusCircles onto param-Circle
        // Circle.colorName = this.state.statusCircle.colorName;
        // Circle.color = this.state.statusCircle.color;

        let copyCircle = JSON.parse(JSON.stringify(Circle));
        // copyCircle.colorName = this.state.statusCircle.colorName;
        // copyCircle.color = this.state.statusCircle.color;
        //splice gameboard array, replace gameboard[Circle.rowIdx][Circle.colIdx]

        // console.log("circle: "  + JSON.stringify(Circle));

        let theRow = this.state.mastermindArray[copyCircle.row].slice(0);
        theRow[copyCircle.column] = {color: this.state.statusCircle.color,
                                      colorName: this.state.statusCircle.colorName,
                                      row: copyCircle.row,
                                      column: copyCircle.column,
                                      visible: true}; //copyCircle

        let newBoard =this.state.mastermindArray.slice();
        newBoard[copyCircle.row] = theRow;



        //condition for winner:

        statusValue = {color: emptyCircle, colorName: 'Empty circle', visible: true};

        //need to make statusCircle a new emptyCircle

        //need to increment turn/row/check if game is done
        let turn = JSON.parse(JSON.stringify(this.state.currentTurn));
        let row = JSON.parse(JSON.stringify(this.state.currentRow));
        let done = JSON.parse(JSON.stringify(this.state.gameOver));
        let gameUpdate = {};
        let winner = false;
        let nextTurn = false;
        if(turn === 3){
          //call funciton to returnFeedback();
          // alert("filled up the row");
          nextTurn = true;
          gameUpdate = this.checkMove(theRow);
          turn = 0;
          row += 1;
          gameUpdate.feedbackArrayCopy = this.state.feedbackArray.slice(0);
          gameUpdate.feedbackArrayCopy[row-1] = gameUpdate.feedbackArray;
          // console.log(gameUpdate);

          if(gameUpdate.gameOver){
            done = true;
            winner = true;

          }else if(row === 8){
            done = true;
          }else{
            for(let i=0; i< 4; i++){
              newBoard[row][i] = {
                color : emptyCircle,
                visable: true,
                colorName: "Empty circle",
                row: row,
                column: i
              };

            }
            //add another row of cells in. @ [row]
          }
        }else{
        turn++;
        }


        if(!done && !nextTurn){
          this.setState({statusCircle: statusValue,
                          mastermindArray: newBoard,
                          currentTurn: turn,
                          currentRow: row,
                          gameOver: done,
                          winner: winner});
                          // function() { console.log(this.state); });
        }else{
          this.setState({statusCircle: statusValue,
                          mastermindArray: newBoard,
                          feedbackArray: gameUpdate.feedbackArrayCopy,
                          currentTurn: turn,
                          currentRow: row,
                          gameOver: done,
                          winner: winner});
        }

        //change state all at once: turn, row, gameover
    }

    checkMove(row){
      //go through both the the <row>, and this.state.secretColorCode
      let checked = [0,0,0,0];
      let checkedWhite = [0,0,0,0];
      let redCircles = 0;
      let whiteCircles = 0;

      // console.log("Red checking");

      for(let i= 0; i< 4; i++){
        // console.log(this.state.secretColorCode[i].colorName + " vs " + row[i].colorName);
        if(this.state.secretColorCode[i].colorName === row[i].colorName ){
          checked[i] = 1;
          checkedWhite[i] = 1;
          redCircles += 1;

        }
      }

      for(let j=0; j < 4; j++){
        if(checked[j] === 0){ //will only go through if red circle match did not happen.

          if(this.checkForWhite(j, row, checkedWhite)){
            whiteCircles += 1;
          }
          //go through red array to and mark if found;

        }
      }


      // alert("reds: " + redCircles + " white: " + whiteCircles);

      let feedbackArray = Array(4).fill({value: null});
      for(let l =0; l < redCircles; l++){
        feedbackArray[l] = {
            color: red,
            colorName: 'Red',
            visable: true
        };
      }

      for(let m =0; m < whiteCircles; m++){
        console.log(m+redCircles);
        feedbackArray[m+redCircles] = {
            color: emptyCircle,
            colorName: 'Empty circle',
            visable: true
        };
      }


      if(redCircles === 4){
        return {feedbackArray: feedbackArray,
                gameOver: true};
      }else{
        return {feedbackArray: feedbackArray,
                gameOver: false};
      }
    }

    checkForWhite(j, row, checked){
      //checked[j] == 0
      for(let k =0; k < 4; k++){
        if(checked[k] === 0){
          // console.log(row[k].colorName + " : " + this.state.secretColorCode[j].colorName)
          if(row[k].colorName === this.state.secretColorCode[j].colorName){
            checked[k] = 1;
            return true;
          }
        }
      }
      return false;
    }

    resetGame() {
      //set my board back to initial (row1 -> outline) (row2->8 == invisible),
      //set my feedback to all invisible to



      let secretColorCode = [
          JSON.parse(JSON.stringify(this.paletteColors[this.getRandomIdx(0, 5)])),
          JSON.parse(JSON.stringify(this.paletteColors[this.getRandomIdx(0, 5)])),
          JSON.parse(JSON.stringify(this.paletteColors[this.getRandomIdx(0, 5)])),
          JSON.parse(JSON.stringify(this.paletteColors[this.getRandomIdx(0, 5)]))
      ];

      let gameboard = Array(NUM_ROWS).fill(Array(NUM_COLUMNS).fill(JSON.parse(JSON.stringify(this.invisibleCircle))));

      gameboard = gameboard.map((row, rowIdx) => row.map((col, colIdx)=>{
        if(rowIdx !== 0){
          return {...gameboard[rowIdx][colIdx], row: rowIdx, column: colIdx};
        }else{
          return {...JSON.parse(JSON.stringify(this.nonFilledCircle)), row: rowIdx, column: colIdx};
        }
      }));

      let feedbackArray = Array(NUM_ROWS).fill(Array(4).fill(JSON.parse(JSON.stringify(this.invisibleCircle))));



      this.setState({
          secretColorCode: secretColorCode,
          mastermindArray: gameboard,   //[firstRow, secondRow], //this should be a table or 2d array.
          feedbackArray: feedbackArray,
          statusCircle: {color: emptyCircle, colorName: 'Empty circle', visible: true},
          currentRow: 0,
          currentTurn: 0,
          gameOver: false,
          winner: false
      });


    }

    componentDidMount() {
        //this gets called when this class gets rendered.
        //calls to api's go here.
    }

    selectedPaletteCircle(circle) {
        //make deep copy of the clicked palette color, assign to status circle
        this.setState({statusCircle: JSON.parse(JSON.stringify(circle))});
    }

    getRandomIdx(low, high) {
            return Math.floor(Math.random() * (high - low + 1) + low);
    }

    topMessage(){
      if(this.state.winner){
        return(<h3 role="image" aria-label="hamburger"> Borger 🍔 Borger</h3>);
      }else if(this.state.gameOver){
        return(
          <h3>You Lost</h3>
        );
      }else{
        return(
          <h3>MasterMind</h3>
        );
      }
    }

//<!-- put in a function call here to show game over/ winner/loser -->
    render() {
        return (
            <div className="Mastermind">
                {
                  this.topMessage()
                }
                < StatusRow resetGame={this.resetGame} secretColorCode={this.state.secretColorCode} gameOver={this.state.gameOver} statusCircle={this.state.statusCircle}/>

                <div>&nbsp;</div>

                    <table className="board_table">
                      <tbody>
                    {
                      this.state.mastermindArray.slice(0).reverse().map((row, idx) =>
                            <Row key={nextUniqueKey()} idx={idx} feedback={this.state.feedbackArray[7 -idx]} handleBoardClick={this.handleBoardClick} row={row} />)
                    }
                      </tbody>
                    </table>
                    <Palette selectedPaletteCircle={this.selectedPaletteCircle} paletteColors={this.paletteColors} />
            </div>
        );

    }
}

// {this.paletteCircles()}
export default Mastermind;
