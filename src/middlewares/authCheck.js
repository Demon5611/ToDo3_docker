export default function authCheck(isAuth) {
    return function authMiddleware(req, res, next) {
      if (!!req.session?.user === isAuth) {
        return next();
      }
      return res.sendStatus(403);
    };
}
// В противном случае, если условие не выполняется, middleware отправляет 403 (Forbidden), что означает, что доступ запрещен.