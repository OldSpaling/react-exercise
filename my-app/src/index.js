import React from 'react';
import ReactDom from 'react-dom';

const name = {
  firstName: "josh", lastName: ' Perez'
};
const element = <h1>hello,{name.firstName + name.lastName}</h1>;
const element1 = (<h1>hello,{name.firstName + name.lastName}</h1>);
/**
 * @name 名字必须使用大驼峰的命名
 * @description  <Element2 firstName={name.firstName} lastName={name.lastName}></Element2>
 * @param {*} props 
 */
function Element2(props) {
  return <h1>hello,{props.firstName + props.lastName}</h1>;
}
/**
 * @name 名字必须使用大驼峰的命名
 * @description  <Element3 firstName={name.firstName} lastName={name.lastName}></Element3>
 * @param {*} props
 */
class Element3 extends React.Component {
  render() {
    return (<h1>hello,{this.props.firstName + this.props.lastName}</h1>);
  }
}
ReactDom.render(
  <Element2 firstName={name.firstName} lastName={name.lastName}></Element2>,
  document.getElementById('root'));