export interface HolidappUser {
  email: string;
  quota: Map<number, number>;
  roles: string[];
}
