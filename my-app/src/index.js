import React from 'react';
import ReactDom from 'react-dom';
import { nanoid } from 'nanoid';
let data = [
  { name: "test1" },
  { name: "test2" },
  { name: "test3" },
  { name: "test4" }
];
 data.forEach(o => o.key = nanoid());
class ListItem extends React.Component {
  render() {
    return <li >{this.props.name}</li>;
  }
}
class List extends React.Component{
  render(){
    const items = data.map(o => <ListItem key={o.key} name={o.name} ></ListItem>)
    return <ul>{items}</ul>
  }
}
// const lists=<ul><ListItems/></ul>
ReactDom.render(
  <List></List>,
  document.getElementById('root'));