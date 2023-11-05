import { Request, Response, NextFunction } from 'express';

/*
FIX ME (types) 😭 Fixed
*/
export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_message', 'Please log in to access the requested page');
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭 Fixed
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
}