export type InvoiceModel = {
    name: string,
    number: number,
    amount: string,
    due: string
};
let invoices: InvoiceModel[] = [
    {
        name: "Santa Monica",
        number: 1995,
        amount: "$10,800",
        due: "12/05/1995"
    },
    {
        name: "Stankonia",
        number: 2000,
        amount: "$8,000",
        due: "10/31/2000"
    },
    {
        name: "Ocean Avenue",
        number: 2003,
        amount: "$9,500",
        due: "07/22/2003"
    },
    {
        name: "Tubthumper",
        number: 1997,
        amount: "$14,000",
        due: "09/01/1997"
    },
    {
        name: "Wide Open Spaces",
        number: 1998,
        amount: "$4,600",
        due: "01/27/2998"
    }
];

export function getInvoices() {
    return new Promise<InvoiceModel[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(invoices);
        }, 1000);
    });
}
export function getInvoice(number: number) {
    return new Promise<InvoiceModel>((resolve, reject) => {
        setTimeout(() => {
            const invoice = invoices.find(
                invoice => invoice.number === number
            );
            resolve(invoice as InvoiceModel);
        }, 1000);
    })

}
export function deleteInvoice(number: number) {
    return new Promise<1|0>((resolve, reject) => {
        setTimeout(()=>{
            invoices = invoices.filter(o => o.number !== number);
            resolve(1);
        },1000);
    });
}