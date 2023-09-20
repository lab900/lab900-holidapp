import {HolidappUser} from "./HolidappUser";

export type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface HolidayRequest {
    year: number;
    created_on: Date;
    approved_on: Date;
    days: number;
    from: Date;
    to: Date;
    reply_message?: string;
    request_message?: string;
    status: Status;
    requester: HolidappUser;
    approver: HolidappUser;
}

