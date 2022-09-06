export interface IUser {
  firstName: string;
  lastName: string;
  bio: string;
}

export type Validator = (args: IUser) => IUser;

const buildUser =
  ({ validator }: { validator: Validator }) =>
  (input: IUser) => {
    const { firstName, lastName, bio } = validator(input);

    return { firstName, lastName, bio };
  };

export { buildUser };
