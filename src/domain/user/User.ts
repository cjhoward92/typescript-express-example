// A nice enum for constants
export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

// Just our User type, basically. As an interface for flexibility.
export interface IUser {
  username: string;
  email: string;
  status: UserStatus;
}