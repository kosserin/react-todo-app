import React, {useState, useRef, useEffect} from "react";
import './App.css';
import Todolist from "./Todolist";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todos,setTodos] = useState([]);
  const inputValueRef = useRef();
  const [focus,setFocus] = useState(false);
  let numberOfCompleted = todos.filter( todo => todo.checked === true).length;
    const LOCAL_STORAGE_KEY ='todoApp.todos';

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(storedTodos) setTodos(storedTodos);
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  },[todos])

  function showTodos(e){
    const name = inputValueRef.current.value;
    if(name===''){
      return;
    } else{
      setTodos( prevTodos =>{
        return [{text: name, id:uuidv4(), checked: false}, ...prevTodos]
      })
    }
    inputValueRef.current.value = null;
  }

  function toggleChange(id) {
    const newTodos = [...todos];
    const todo = newTodos.find( todo => todo.id === id);
    todo.checked = !todo.checked;
    setTodos(newTodos);
  }

  function handleSubmit(e) {
    e.preventDefault()
  }
  
  function removeCompletedTodos(id) {
    const newTodos = todos.filter(todo => !todo.checked);
    setTodos(newTodos);
  }

  function removeAllTodos() {
    const newTodos = todos.filter(todo => todo.text='');
    setTodos(newTodos);
  }

  function handleDeleteTodo(id){
    const newTodos = [...todos];
    const todo = newTodos.filter( todo => todo.id != id);
    setTodos(todo)
  }

  return (
    <div className="App">
      <h1>KOKI'S TODO</h1>
      <form onSubmit={handleSubmit}>
        <p  className={focus ? 'focused-input' : ''}>Enter your task here</p>
        <input ref={inputValueRef} onFocus={() => setFocus(true)} type="text" name="search-input" id="search-input" />
        <button onClick={showTodos}>ADD</button>
      </form>
      < Todolist todos={todos} toggleChange={toggleChange} handleDeleteTodo={handleDeleteTodo} />
      {numberOfCompleted > 0 ? (<div className='on-completed'><button onClick={removeCompletedTodos} className="removeCompleted">remove completed</button>
                      <p>There {numberOfCompleted === 1 ? 'is' : 'are'} <span>{numberOfCompleted}</span> completed todos you can remove. Click button above to delete.</p>
                      </div>) : ''}

      {todos.length>0 ? <button className='removeAllBtn' onClick={removeAllTodos}>remove all todos</button> : ""}
    </div>
  );
}

export default App;
