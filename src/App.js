import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const App = () => {

    const [ tasks, setTasks ] = useState([
        {
            id: uuid(),
            title: 'Cachorro',
            text: 'Passear com o cachorro',
            status: 'OPEN'
        },
        {
            id: uuid(),
            title: 'Cachorro',
            text: 'Dar comida pro cachorro',
            status: ''
        },
        {
            id: uuid(),
            title: 'Casa',
            text: 'Fazer a faxina',
            status: 'OPEN'
        },
        {
            id: uuid(),
            title: 'Casa',
            text: 'Fazer o rancho',
            status: 'OPEN'
        },
        
    ])

    const [newTask, setNewTask] = useState({
        title: '',
        text: '',
        status: 'OPEN'
    });


    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tasks))
    }, [tasks])



    const addTaskHandler = (event) => {
        event.preventDefault();

        // Criando nova tarefa
        const createdTask = {   
            id: uuid(),
            ...newTask
        }

        // Adicionado nova tarefa na lista de tarefas
        setTasks( prevState => ( [...prevState, createdTask] ) );

        // Apagando as entradas do usuário, após a submissão do form
        setNewTask({ ...newTask, title: '', text: '' })
        
    }

    return (
        <div>
        
        <form onSubmit={addTaskHandler}>
            <div>
                <label>Título</label>
                <input type='text' value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}/>
            </div>
            <div>
                <label>Texto</label>
                <input type='text' value={newTask.text} onChange={(event) => setNewTask({ ...newTask, text: event.target.value })}/>
            </div>

            <button type='submit'>Adicionar Tarefa</button>
        </form>
            
        <ul>
            {
                tasks.map( task => (
                    <li key={task.id}>
                        <div>{task.title}</div>
                        <div>{task.text}</div>
                        <div>{task.status}</div>
                    </li>
                ))
            }
        </ul>
        
        </div>
    )
}

export default App
