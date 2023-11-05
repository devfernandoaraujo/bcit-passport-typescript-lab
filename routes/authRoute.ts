import express from "express";
import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { forwardAuthenticated } from "../middleware/checkAuth";


const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login");
})

router.post( "/login", (req : Request, res: Response, next: NextFunction) => {
   passport.authenticate('local', function(err, user, info) {
    /* FIX ME: 😭 failureMsg needed when login fails  Fixed*/
    if (!user) { 
      req.flash('error_message', err.message ?? info?.message);
      return res.redirect("/auth/login");
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function (req, res) {
    res.redirect('/dashboard');
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
