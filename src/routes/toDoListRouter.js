import express from 'express';
import { ToDo } from '../../db/models';


const router = express.Router();


// добавляем новое дело 
router.post('/new', async (req, res) =>{
  const { input } = req.body;  
  if (!req.session.user)   {
    console.error('Необходимо авторизоваться!')
    return res.status(400).json({ message: 'Необходимо авторизоваться!' });
  }
  const newTodo = await ToDo.create({
    name: input,
    status: false,
    authorId: req.session.user.id
  })
  res.json(newTodo);
});


router.delete('/onetodo/:id', async (req, res) =>{
  await ToDo.destroy({where:{id: req.params.id} })
  res.sendStatus(200);
});

// изменение статуса ok
router.patch('/newstatus/:id', async (req, res) =>{
  const { status } = req.body
await ToDo.update({status},{ where: { id: req.params.id } });
  res.sendStatus(200);
});
// изм текста и запись в БД. приходит с хендлера changeTextDB
router.patch('/newtext/:id', async (req, res) =>{
  const { name } = req.body;
  const updateTodo = await ToDo.findOne({ where: { id: req.params.id } });
  updateTodo.name = name;
  updateTodo.save();
  res.sendStatus(200);
});




export default router;
