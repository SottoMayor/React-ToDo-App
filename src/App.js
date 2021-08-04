import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import Button from './components/UI/Button/Button';

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

    // Puxar dados do localStorage
    useEffect(() => {
        const getTasks = localStorage.getItem('tarefas');
        setTasks( JSON.parse(getTasks) )
    }, [])
    
    // Atualização
    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tasks))
    }, [tasks])
    

    const addTaskHandler = useCallback((event) => {
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
        
    }, [newTask])

    const AttStattusHandler = (identifier) => {
        const findIndexTask = tasks.findIndex( task => identifier === task.id );

        const updatedTasks = [...tasks];

        updatedTasks[findIndexTask].status = updatedTasks[findIndexTask].status === 'OPEN' ? 'DONE' : 'OPEN'

        setTasks(updatedTasks);
        
    }

    // useMemo: É um meio de otimização de React para não re-renderizarmos componentes de maneira desnecessária, dessa forma a performance aumenta!
    // useMemo vs useCallback: O useCallback também é um meio de otimização, mas ele é restrito a funções. Usamo-lo geralmente em métodos ou handlers.
    return (
        <div>
        <br/>
        <h2>Quantidade de Tarefas: { useMemo( () =>  tasks.length, [tasks] ) }</h2>
        <br/>

        <form onSubmit={addTaskHandler}>
            <div>
                <label>Título</label>
                <input type='text' value={newTask.title} onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}/>
            </div>
            <div>
                <label>Texto</label>
                <input type='text' value={newTask.text} onChange={(event) => setNewTask({ ...newTask, text: event.target.value })}/>
            </div>

            <Button buttonType='submit'>Adicionar Tarefa</Button>
        </form>
            
        <ul>
            {  tasks.length > 0 &&
                tasks.map( task => (
                    <li key={task.id} onClick={() => AttStattusHandler(task.id)}>
                        <div>{task.title}</div>
                        <div>{task.text}</div>
                        <div>{task.status}</div>
                    </li>
                ))
            }
            {tasks.length === 0 && <p>Adicione sua primeira tarefa!!</p>}
        </ul>
        
        </div>
    )
}

export default App
