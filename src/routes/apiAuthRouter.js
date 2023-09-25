import bcrypt from 'bcrypt';
import express from 'express';
import { User } from '../../db/models';

const apiAuthRouter = express.Router();


apiAuthRouter.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const [user, created] = await User.findOrCreate({
    // ищем  user по email,  createt -флаг, если найден, то он false, если нет, то true. если не найден, то мы создадим юзера и допишем ему пароль и имя
    where: { email },
    defaults: {
      email, name, password: hashPassword,
    },
  })
  if (created) {
    req.session.user = { ...user.get(), hashPassword: undefined };
    return res.sendStatus(200);
  }
  return res.status(400).json({ message: 'Email already exists' });
});


apiAuthRouter.post('/login', async (req, res) => {
  const { email, password } = req.body; // забираем из тела запроса email и password c фронта
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    return res.status(400).json({ message: 'Email not found' });
  }
  

  const isCorrect = await bcrypt.compare(password, user.password); // compare. возвр промис. принимает данные пароль и сравнивает с хеш из БД.  - сравниваем пароль захеширован ли он в БД 
  if (!isCorrect)
  {
    return res.status(400).json({ message: 'Incorrect password' });
  }
  delete user.dataValues.password;
// если все ок, то залогинь в сессию пользователя 
  req.session.user = { ...user.get(), password: undefined };
  res.sendStatus(200);


});


apiAuthRouter.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');
  res.sendStatus(200);
  window.location.href ='/';

});

export default apiAuthRouter;


