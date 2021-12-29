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
function Square(props) {
  return (
    <button className="square" onClick={() => { props.onClick() }}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state={
  //     squares:Array(9).fill(null),
  //     xIsNext:true
  //   };
  // }
  renderSquare(i) {
    return <Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }
 
  render() {
    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber:0
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: [...history, { squares }],//不使用push，会改变原数组
      xIsNext: !this.state.xIsNext,
      stepNumber:history.length
    });
  }
  jumpTo(step){
    /**
     * 们没有更新 state 中的 history 属性。
     * 这是因为 state 更新被合并了，
     * 或者用更简单的话说，React 不会更新 setState 
     * 方法中未提到的属性
     */
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : 'go to game start';
      /**
       * 每当一个列表重新渲染时，React 会根据每一项列表元素的 key 
       * 来检索上一次渲染时与每个 key 所匹配的列表项。
       * 如果 React 发现当前的列表有一个之前不存在的 key，
       * 那么就会创建出一个新的组件。如果 React 发现和之前对比少了一个 key，
       * 那么就会销毁之前对应的组件。如果一个组件的 key 发生了变化，这个组件会被销毁，
       * 然后使用新的 state 重新创建一份
       * 我们强烈推荐，每次只要你构建动态列表的时候，都要指定一个合适的 key
       */
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })
    let status;
    if (winner) {
      status = `Winner:${winner}`;
    } else {
      status = `Next player:${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
