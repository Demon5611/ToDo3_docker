/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import ToDoForm from '../UI/ToDoForm';
import ToDoItem from '../UI/ToDoItem';

export default function ToDoList({ todos })
{
  const [allToDo, setAllToDo] = useState(todos)

        const deleteHandler = async (id) =>    {
            await axios.delete(`/todolist/onetodo/${id}`);
            setAllToDo((prev)=> prev.filter((el)=> el.id !== id))
    }


  return (
    <>
    <div className="row">
      <div className="col">
        <h2>Todo page</h2>
          <ToDoForm setAllToDo={setAllToDo} />      
        </div>
    </div>
        <br/>
    {allToDo.map((el) => (<ToDoItem key={el.id} todo={el} deleteHandler={deleteHandler}  />))}
  </>
  )
}



