import express from 'express';
import authCheck from '../middlewares/authCheck';
import {ToDo} from '../../db/models'


const renderRouter = express.Router();


renderRouter.get('/', async (req, res) =>{
  try  {    
  const todos = await ToDo.findAll({ order: [["id", 'ASC']] })
  const initState = { todos};
  res.render('Layout', initState);
  } catch (error)  {
  console.error(error);
  res.sendStatus(500);
}  
});

renderRouter.get('/signup', authCheck(false), (req, res) => res.render('Layout'));

renderRouter.get('/login', authCheck(false), (req, res) => res.render('Layout')); 

renderRouter.get('/account', authCheck(true), (req, res) => res.render('Layout')); 



export default renderRouter;