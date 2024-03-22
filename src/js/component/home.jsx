import React, { useState, useEffect } from "react";

const AnyComponent = () => {
  const [username, setUsername] = useState("");

  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");

  const getUserTodos = () => {
    fetch (`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }, 
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.status + "! Something went wrong");
      })
      .then((todoData) => {
        console.log("todoData");
        console.log(todoData);
        setTasks(todoData);
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  };

  const addUser = async (event) => {
    //prevenir o browser de fazer refresh dps de clickares no botao
    event.preventDefault();

    //if useername field is not empty the code runs
    if (username.trim() !== "") {
      //api call to create user/todo list
      const response = await fetch(
        `https://playground.4geeks.com/apis/fake/todos/user/${username}`,
        {
          method: "POST",
          mode: "cors",
          redirect: "follow",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify([]),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      setTasks([]);
    } else {
      //if input is empty alert the user
      alert("Please add a name to the input");
    }
  };

  const deleteUser = () => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        //   setTasks(data);
        setUsername("");
        setTasks([]);
      })
      .catch((error) => {
        setError("Failed to addTask");
        console.log(error);
      });
  };

  const addTask = () => {
    const updatedTasks = [...tasks, { done: false, label: newTaskName }];

    if (newTaskName.trim() !== "") {
      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTasks),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch todos");
          }
          return response.json();
        })
        .then((data) => {
          //   setTasks(data);
          setNewTaskName("");
        })
        .then(() => {
          getUserTodos();
        })
        .catch((error) => {
          setError("Failed to addTask");
          console.log(error);
        });
    } else {
      alert("task needs a name");
    }
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const updateTask = (id) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    console.log("updatedTasks");
    console.log(updatedTasks);

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // setTasks(data);
      })
      .then(() => {
        getUserTodos();
      })
      .catch((error) => {
        setError("Failed to Update todos");
        console.log(error);
      });
  };

  return (
    <div className="container mt-3">
      <h5 className="Title text-center mt-5 mb-2 p-3">Todos List</h5>
      <div>
        <input
          className="inputUser"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Username"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(" Fetch Todo List");
              fetchTodoList();
            }
          }}
        />
        <button onClick={addUser}>Create User</button>
        <button onClick={getUserTodos}>Get User</button>
        <button onClick={deleteUser}>Delete User</button>
      </div>
      <nav className="navbar navbar-light bg-light">
        <input
          className="Tasker container"
          type="text"
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyPress={handleKeyEnter}
          placeholder="What needs to be done"
          maxLength={80}
          value={newTaskName}
        />
      </nav>

      <div className="TaskRemover mt-2">
        {tasks?.length > 0 &&
          tasks.map((task, index) => {
            console.log("task");
            console.log(task);

            return (
              <div className="ListTasks d-flex container p-0" key={index}>
                <div className="navbar navbar-light bg-light container p-4">
                  {/* <input type="checkbox" checked={true} /> */}
                  <p className="Newtasks mb-0">{task.label}</p>
                  <span className="spanIcone">
                    <i
                      className="fa-solid fa-ban "
                      onClick={() => updateTask(task.id)}
                    ></i>
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      <div className="TasksNum bg-light mt-2 p-2">
        {tasks.length} Tasks left to do
      </div>
    </div>
  );
};

export default AnyComponent;


