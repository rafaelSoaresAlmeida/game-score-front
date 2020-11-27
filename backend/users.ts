export class User {
  constructor(
    public email: string,
    public name: string,
    public password: string
  ) {}

  matches(another: User): boolean {
    return (
      another !== undefined &&
      another.email === this.email &&
      another.password === this.password
    );
  }
}

export const users: { [key: string]: User } = {
  'juliana@gmail.com': new User(
    'juliana@gmail.com',
    'juliana',
    'juliana@gmail.com'
  ),
  'julia@gmail.com': new User('julia@gmail.com', 'julia', '123'),
  'amanda@gmail.com': new User('amanda@gmail.com', 'amanda', '123'),
  'sobrancela@cansado.com': new User('sobrancela@cansado.com', 'Tired', '123'),
};
