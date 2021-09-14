import react from 'react';

function Todo({todo, toggleChange, handleDeleteTodo}) {

    function handleChange() {
        toggleChange(todo.id);
    }

    function deleteTodo() {
        handleDeleteTodo(todo.id)
    }

    return(
        <div className='Todo'>
            <div className="left-side">
            <input type="checkbox" name="checkbox" id={todo.id} checked={todo.checked} onChange={handleChange} />
            <span>{todo.text}</span>
            </div>
            <span onClick={deleteTodo} style={{
                color:'red',
                cursor: 'pointer'
            }}><i className='fas fa-times'></i></span>
        </div>
    )
}

export default Todo;