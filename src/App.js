import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedtodoArr = [...allTodos];
    updatedtodoArr.push(newTodoItem);
    setTodos(updatedtodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedtodoArr));
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };
  const deletcompleted = (index) => {
    let reducecompleted = [...completedTodos];
    reducecompleted.splice(index, 1);
    localStorage.setItem("completedlist", JSON.stringify(reducecompleted));
    setCompletedTodos(reducecompleted);
  };

  const handleCompleted = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let hr = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + m + "-" + yy;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedlist", JSON.stringify(updatedCompletedArr));
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let completedTodo = JSON.parse(localStorage.getItem("completedlist"));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (completedTodo) {
      setCompletedTodos(completedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What is the task title?"
            ></input>
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What is the task description?"
            ></input>
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primary-btn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            To Do
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      id={index}
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />
                    <BsCheckLg
                      className="check-icon"
                      onClick={() => handleCompleted(index)}
                      title="Completed"
                    />
                  </div>
                </div>
              );
            })}
          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on :{item.completedOn}</small>
                    </p>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      id={index}
                      onClick={() => deletcompleted(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
