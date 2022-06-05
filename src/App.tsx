
import { strictEqual } from 'assert';
import React, {useState} from 'react';

import './App.css';




function App() {
  const [InputValue,setInputValue] = useState("")
  const [todos,setTodos] = useState<Todo[]>([]);

  type Todo ={
    inputvalue:string;
    ID: number;
    checked:boolean; 
  };

  const handaleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    //console.log(e.target.value)
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); //ボタンを押したときの勝手なリロードをやめる
  
    const newTodo: Todo={
      inputvalue: InputValue,
      ID: todos.length,
      checked:false, 
    };
    setTodos([newTodo,...todos]);
    setInputValue("");
  }

  const handleEdit = (id:number,inputvalue:string) =>{
    const newTodos = todos.map((todo) =>{
      if(todo.ID === id){
          todo.inputvalue = inputvalue
      };
      return todo;
    })

    setTodos(newTodos);
  };

  const handlechecked = (id:number,checked:boolean) =>{
    const newTodos = todos.map((todo) =>{
      if(todo.ID === id){
          todo.checked = !checked
      };
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id:number) =>{
    const newtodos = todos.filter((todo) => todo.ID !== id); //ここで何を残すかを選んでいる
    setTodos(newtodos)
  };

  return (  //ここからtsx(HTML)
    <div className="App">
    <div>
      <h2>
        Todoリスト with Typescript
      </h2>
      <form onSubmit={(e) => {handleSubmit(e)}}> 
        <input type="text" 
          onChange={(e) => {handaleChange(e)}}
          className = "inputText"/>

        <input type="submit" value='作成' className="submitButton" />
      </form>
      <ul>
        {todos.map((todo)=>(
          <li key={todo.ID}>
            <input type="text" 
            onChange={(e) => handleEdit(todo.ID,e.target.value)}
            className = "inputText"
            value={todo.inputvalue}
            disabled={todo.checked}
            />

            <input type="checkbox" 
            onChange={(e) => handlechecked(todo.ID,todo.checked)}
            className = "inputText"/>

            <button onClick={() => handleDelete(todo.ID)}>消</button>

          </li>
          ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
