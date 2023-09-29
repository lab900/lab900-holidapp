export interface Request {
    status: "pending" | "approved" | "rejected",
    answeredOn?: Date,
    approver?: string, // User.email
    requesterRemark?: string
    approverRemark?: string
    requester: string // User.email
    from: string // Date
    to: string // Date
    createdOn: Date,
    days: number,
    halfDays: string[]
    year: number
}
