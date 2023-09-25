/* eslint-disable react/prop-types */
// import formatDistanceToNow from 'date-fns/formatDistanceToNow';
// import locale from 'date-fns/locale/ru'; // npm i date-fns
import axios from 'axios';
import React, { useState } from 'react';

export default function OneToDo({todo, deleteHandler }){

  // const createDate = formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true, locale });
  
    // делаем изм состояние на  чек-бокс
    const [isChecked, setIsChecked] = useState(todo.status)
    // перечеркивание текста
    const [isStriked, setIsStriked] = useState(false);
    // Задаем состояние, чтобы отслеживать, открыто ли поле input для редактирования.
    const [isEditing, setIsEditing] = useState(false);
    // заполнен title или нет. берем конкретный элемент и вставляем его title - todo.title
    const [name, setTitle] = useState(todo.name);
    const [isGrayed, setIsGrayed] = useState(false)
    const strikedStyle = isStriked ? { textDecoration: 'line-through'} : { };
    const textStyle = isGrayed ? { color: 'gray' } : {};     
    
    // установили галочку - checked, поменяй статус в БД
    const changeHandlerCheckBox = async (e) =>    {
        const newStatus = e.target.checked;
        await axios.patch(`/todolist/newstatus/${todo.id}`, { status: newStatus });
        setIsChecked(newStatus) // изменили статус
      setIsStriked(!isStriked); // перечеркнули
      setIsGrayed(newStatus); // Сделать текст серым, если чек-бокс отмечен
    }

    // ИЗМЕНЕНИЕ текста у дела -> изменений в БД в div onChange={changeHandlerTitle}
    const changeTextDB = async () =>    {
        await axios.patch(`/todoList/newtext/${todo.id}`, { name })
        setIsEditing(false) // Закрываем поле input после сохранения изменений.
    }   

    // установили  в title то, что вбили руками в форму     setTitle(e.target.value)
    const changeHandlerTitle = (e) =>    {
        setTitle(e.target.value)
    }


  return (
      <>
          {isEditing ? (
              <div>
          <input  className="form-control"   onChange={changeHandlerTitle}      value={name} />
          <button  onClick={changeTextDB} type="submit" className="btn btn-outline-secondary" >  Save  </button>
            </div>
      ) : (
        <div style={{ ...strikedStyle, ...textStyle }} // Объединяем стили для перечеркнутого текста и серого текста
          onClick={() => setIsEditing(true)}>  {name}  </div>)}

      <input
        onChange={changeHandlerCheckBox} type="checkbox" checked={isChecked} />
      
      <button
        type="submit" className="btn btn-outline-secondary" onClick={() => setIsEditing(true)} // Открываем поле input при нажатии на Edit.
          >
              Edit
      </button>
      
          <button onClick={() => deleteHandler(todo.id)} type="button" className="btn btn-outline-primary"  >    Delete   </button>
    </>
  );
}