import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// class Square extends React.Component {
//   render() {
//     //onClick用箭头函数，避免this指向不期望值
//     return (
//       <button className="square" onClick={() => { this.props.onClick() }}>
//         {this.props.value}
//       </button>
//     );
//   }
// }
/**
 * 函数式组件
 */
function Square(props){
  return (
    <button className="square" onClick={() => { props.onClick() }}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={
      squares:Array(9).fill(null)
    };
  }
  renderSquare(i) {
    return <Square 
    value={this.state.squares[i]} 
    onClick={()=>this.handleClick(i)}
    />;
  }
  handleClick(i) {
    //为了保证this.state值不变，使component数据纯粹和数据可追溯，重新复制一份数据copy
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({ squares: squares });
  }
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
