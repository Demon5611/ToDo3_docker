export default function isAuth(req, res, next) {
    if (req.session.user) return next();
      res.redirect('/auth');
  }
  //  если пользователь не аутентифицирован, он будет перенаправлен на страницу /auth 