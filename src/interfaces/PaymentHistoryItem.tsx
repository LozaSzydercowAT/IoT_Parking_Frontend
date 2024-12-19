export interface PaymentHistoryItem {
    id: string;
    type: "topup" | "payment" | "added" | "return",
    status: "success" | "rejected",
    date: Date,
    description: string;
}
