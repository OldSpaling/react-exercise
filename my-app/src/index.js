import React from 'react';
import ReactDom from 'react-dom';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date };
  }
  /**
   * 组件第一次被渲染到Dom时候触发
   */
  componentDidMount(){
    this.timeID=setInterval(()=>this.tick(),1000);
  }
  /**
   * 组件从dom中移除时候触发
   */
  componentWillUnmount(){
    clearInterval(this.timeID);
  }
  tick(){
    this.setState({time:new Date})
  }
  render() {
    return <div>{this.state.time.toLocaleTimeString()}</div>
  }
}
ReactDom.render(
  <Clock/>,
  document.getElementById('root'));