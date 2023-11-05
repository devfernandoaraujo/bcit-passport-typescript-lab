const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    githubId: 0,
    role: 'user'
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    githubId:  0,
    role: 'user'
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    githubId: 0,
    role: 'user',
  },
  {
    id: 4,
    name: "Fernando de Matos Araujo",
    email: "fernando@gmail.com",
    password: "fernando123!",
    githubId: 0,
    role: 'admin',
  },
];

const userModel = {

  /* FIX ME (types) 😭 Fixed */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 Fixed */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findByEmail: (email: string) =>{
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },

  findByGithubId: (githubId: number) =>{
    const user = database.find((user) => user?.githubId === githubId );
    if (user) {
      return user;
    }
    return null;
  },

   createUser: (name: string, githubId : number ) => {
    const newUser = {
      id: database.length + 1, // Generate a new ID
      name: name,
      email: "",
      password: "",
      githubId: githubId,
      role: 'user '
    };

    database.push(newUser);

    return newUser;
  }
};

export { database, userModel };
