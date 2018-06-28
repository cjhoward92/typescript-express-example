export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export interface IUser {
  username: string;
  email: string;
  status: UserStatus;
}