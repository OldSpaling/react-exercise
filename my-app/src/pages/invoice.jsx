import React from "react";
// import { useParams, withParams} from "react-router-dom";
// import { withParams} from 'react-router';
import { deleteInvoice, getInvoice } from "../data";
import { withNavigate, withParams} from "../hocs";
//useParams 获取路由param,不能使用class component
// export default function Invoice() {
//     const params = useParams();
//     let invoice = getInvoice(+params.invoiceId);
//     return (
//         <main style={{ padding: "1rem" }}>
//             <h2>Total Due:{invoice.amount}</h2>
//             <p>
//                 {invoice.name}:{invoice.number}
//             </p>
//             <p>Due Date:{invoice.due}</p>
//         </main>
//     );
// }
class Invoice extends React.Component{
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            invoice : {
                name: null,
                number: null,
                amount: null,
                due: null
            }
        }
    }
    componentDidMount() {
        this.load();
    }
    load() {
        setTimeout(() => {
            const invoice = getInvoice(+this.props.params.invoiceId);
            this.setState({
                invoice
            })
        },2000)
    }
    delete() {
        deleteInvoice(this.invoice.number);
        this.props.navigate("/invoices");
     }
     render() {
        //class component 不能直接使用此方法
        // const params = useParams();
        // let invoice = getInvoice(+this.props.params.invoiceId);
        //  this.load();
        return (
            <main style={{ padding: "1rem" }}>
                <h2>Total Due:{this.state.invoice.amount}</h2>
                <p>
                    {this.state.invoice.name}:{this.state.invoice.number}
                </p>
                <p>Due Date:{this.state.invoice.due}</p>
                <p>
                    <button onClick={this.delete}>删除</button>
                </p>
            </main>
        );
    }
}
//可以嵌套使用
export default withParams(withNavigate(Invoice));
