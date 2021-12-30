import React from 'react';
import ReactDom from 'react-dom';

class Dialog extends React.Component{
  render(){
    return (
      <div style={{border:`1px solid ${this.props.color||'red'}`}}>
        {this.props.children}
        {this.props.name}
        {this.props.btn}
      </div>
    );
  }
}
const btn=<button>按钮</button>
const dialog=<Dialog name='lizhao' color="green" btn={btn}>
  <h1>Welcome title</h1>
  <p>welcome content</p>
</Dialog>
ReactDom.render(
  dialog,
  document.getElementById('root'));