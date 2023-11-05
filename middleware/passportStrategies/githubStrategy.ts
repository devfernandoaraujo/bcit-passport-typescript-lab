import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { getUserByGithubId, addUser} from "../../controllers/userController";


const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: process.env.GITHUB_CALLBACK_URL!,
        passReqToCallback: true,
    },
    
    /* FIX ME 😭 Fixed */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any) => void) => {
          try {
            
            const user = await getUserByGithubId(profile.id!);

            if (user) {
                // User found, return the user object to Passport
                return done(null, user);
            } else {
                
                const newUser =  await addUser(
                   profile.displayName,
                   profile.id
                );

                // Return the new user to Passport
                return done(null, newUser);
            }
        } catch (error:any) {
            return done(error, null);
        }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
