import express from "express";
import {Request, Response, NextFunction} from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";
import session from "express-session"


const isAdmin = async (req: Request , res: Response, next: NextFunction) => {
 
    if (req!.user!.role === 'admin') {
      next();
    } else {
      req.flash('error_message', 'Not an admin, sorry');
      res.redirect("/dashboard");
    }
};



router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, isAdmin, (req, res) => {
  let listSessions: { id: string; user: number; }[] = [];
  let store: Express.SessionStore = req.sessionStore;

  const getSessionData = new Promise<void>((resolve, reject) => {
    store?.all!((err: any, sessions: session.SessionData[] | { [sid: string]: session.SessionData } | null | undefined) => {
      if (typeof sessions === 'object' && sessions !== null) {
        const sessionKeys = Object.keys(sessions as object);

        sessionKeys.forEach((sessionId) => {
          const session = (sessions as { [sid: string]: session.SessionData })[sessionId];
          const cookies = session.cookie;
          var dd = session.passport;
          var f = dd.user;
          listSessions.push({ id: sessionId, user: session.passport.user });
         
        });

        resolve(); 
      } else {
        reject(err); 
      }
    });
  });

  getSessionData.then(() => {
    res.render("admin", {
      user: req.user,
      sessions: listSessions,
    });
  }).catch((err) => {
  
    req.flash('error_message', 'Error ocorred when loading the sessions');
    res.redirect("/admin");
  });
});

router.get('/revoke-session/:sessionId',ensureAuthenticated, isAdmin, (req, res) => {
  const sessionId = req.params.sessionId;
  req.sessionStore.destroy(sessionId, (error) => {res.redirect('/admin');});
   
});



export default router;
