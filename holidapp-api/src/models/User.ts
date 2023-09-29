export interface User {
    name: string,
    email: string,
    quota: {
        year: number,
    }
    remaining: {
        year: number,
    }
    roles: ['user', 'approver']
}
