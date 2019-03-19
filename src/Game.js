import React from 'react';




// const num_colors = 6;
//
//
class Cancel extends React.Component
{
  render(){
    return
    (
        <button style={{backgroundColor:"red"}}>Cancel</button>

    );
  }
}


class Selected extends React.Component
{
  render(){
    return
    (
      <button style={{this.props.color}} >Selected</button>

    );
  }
}

class Header extends React.Component
{
  render(){
    return
    (
      <Cancel />
      <Selected color={this.state.selectedColor}/>
    );
  }

}
//will contain the top 2 elemnts for sure
//not sure if I should put  secret-code in this Component
class Cell extends React.Component
{
  render()
  {
    return(
        <td height="30px" width="30px" style={{backgroundColor: this.props.color}}
        onClick={ () => this.props.SelectPaletteChoice(this.props.color)}>
        </td>
    );
  }
}


class Palette extends React.Component
{
  render()
  {
      return (
        <tr>
          {
            this.props.colors.map((value, index) => <Cell key={index} color={value} SelectPaletteChoice={this.props.SelectPaletteChoice} /> )
          }
        </tr>
      );
  }
}


class Game extends React.Component
{
  SelectPaletteChoice(color){

    let clicked = color;

    this.setState({
      selectedColor:clicked
    });

    document.getElementById("selected").style = ;

    // alert(color);

  }

  constructor(props){
    super(props);


//all this shit is kinda related to the colorPalette class.
    let selected = "white";
    let paletteColors = ["green", "orange", "darkblue", "yellow", "darkred", "lightblue"];

    this.palette = paletteColors;


    this.state={selectedColor:selected};
    //handler for a click on colorPalette
    this.SelectPaletteChoice = this.SelectPaletteChoice.bind(this);


    // //handler for a click on a cell with the current array
    // this.MakeGuess = this.MakeGuess.bind(this);


    //state => initially null

  }

  //reset() ->
  //  Reset States relevant to game
  //          make selected null
  //
  //
  //
//<Header  />
  render(){

    return (
      <div id="Game">
        <h1>Hi there this is my game title</h1>


        <Header selectedColor={this.state.selectedColor}/>


        <table align="center">
          <tbody>
            {

             <Palette colors={this.palette} SelectPaletteChoice={this.SelectPaletteChoice} />
            }
          </tbody>
        </table>
      </div>
    );
  }


}

export default Game;
