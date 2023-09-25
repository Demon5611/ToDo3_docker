import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

export default function inputForm({ setAllToDo }){
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false); // Добавляем состояние для отображения модального окна
  const inputHandler = (e) =>    {
    // взяли данные с поля input
    setInput(e.target.value) 
    console.log(e.target.value)

}

const addTodo = async () =>
    {
        await axios
        .post('/todolist/new', { input })
            .then((res) => setAllToDo((prev) => [...prev, res.data]))
            setInput('')    
            setShowModal(true); // Открываем модальное окно после добавления задачи        
          
  setTimeout(() => {
    setShowModal(false);
  }, 2000);
};
  
  // в контролируемом инпуте, при добавлении чего-то сделали запрос на сервер на отправку данных с  формы инпута. вернули  и подставили в новое состояние после текущего поста. очистили форму инпут

  
  return (
    <>
      <div>
        <Form.Label htmlFor="inputPassword5">TODO</Form.Label>
      </div>
      <div>
        <Form.Control
           value={input}
           onChange={inputHandler}
           type="text"
           placeholder='добавь свою ToDo'
        />
      </div>     
      <br/>
      <button onClick={() => addTodo()} type="button" >
              Добавить
      </button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы собираетесь добавить задачу в список!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Ок
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

    
