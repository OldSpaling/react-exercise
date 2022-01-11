import React from "react";
// import { useParams, withParams} from "react-router-dom";
// import { withParams} from 'react-router';
import { getInvoice } from "../data";
import withParams from "../hocs";
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
     render() {
        //class component 不能直接使用此方法
        // const params = useParams();
        let invoice = getInvoice(+this.props.params.invoiceId);
        return (
            <main style={{ padding: "1rem" }}>
                <h2>Total Due:{invoice.amount}</h2>
                <p>
                    {invoice.name}:{invoice.number}
                </p>
                <p>Due Date:{invoice.due}</p>
            </main>
        );
    }
}
export default withParams(Invoice);
