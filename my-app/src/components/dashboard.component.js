import React from "react";

/**
 * 我们想渲染一个在 App 中的组件。不过在此时，App 的 render 中的 this.props.children 还是 undefined。
 * 这种情况我们可以使用 IndexRoute 来设置一个默认页面
 */
export default class DashboardComponent extends React.Component{
    render() {
        return <div>Welcome to the app!</div>
    }
}