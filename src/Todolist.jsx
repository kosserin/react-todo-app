import react from 'react';
import Todo from './Todo';

function Todolist({todos, toggleChange, handleDeleteTodo}) {



    return(
        <div className='Todolist'>
            {todos.map( todo => (
                < Todo key={todo.id} todo={todo} toggleChange={toggleChange} handleDeleteTodo={handleDeleteTodo} />
            ))}
        </div>
    )
}

export default Todolist;