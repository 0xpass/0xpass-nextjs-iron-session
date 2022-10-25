// This is where we specify the typings of req.session.*
export type User = {
  isLoggedIn: boolean
  userId?: string;
  envId?: string;
  address?: string;
}
