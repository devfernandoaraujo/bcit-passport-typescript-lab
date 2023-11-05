export {};

declare module 'express-session' {
  interface SessionData {
    passport: {
        user: number;
    };
  }
}

declare global {
  
   
    namespace Express {
        interface AuthInfo {  }

        interface User {
            id: number; 
            role: string;
        }

        interface Request {
        flash: (type: string, message?: string) => any;
        }
    }


}