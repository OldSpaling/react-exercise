import React from "react";
import { useNavigate, useParams } from "react-router";
import { deleteInvoice, getInvoice, InvoiceModel } from "../data";
type StateModel = {
    invoice: InvoiceModel
};
export default function Invoice() {
    const [state, setState] = React.useState<StateModel>(
        {
            invoice: {
                name: "",
                number: -1,
                amount: '',
                due: ""
            }
        }
    );
    const params = useParams<{ invoiceId: string }>();
    const navigate = useNavigate();
    const deleteItem = async () => {
        await deleteInvoice(state.invoice.number);
        navigate("/invoices");
    }
    React.useEffect(() => {
        const getInvoiceAsync = async () => {
            //params.invoiceId! ver+'!' 断言不为空
            const invoice = await getInvoice(+params.invoiceId!);
            setState({ invoice })
        }
        if (params.invoiceId) {
            getInvoiceAsync();
        }
    });
    return (
        <main style={{ padding: "1rem" }}>
            <h2>Total Due:{state.invoice.amount}</h2>
            <p>
                {state.invoice.name}:{state.invoice.number}
            </p>
            <p>Due Date:{state.invoice.due}</p>
            <p>
                <button onClick={deleteItem}>删除</button>
            </p>
        </main>
    );
}