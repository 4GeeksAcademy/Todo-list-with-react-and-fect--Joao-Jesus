import React, { useState, useEffect } from "react";

const AnyComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('');

    const fetchTodoList = () => {
        console.log(' fetch todo list for user')
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                }
        }).then(response => {
            if(response.ok) {
                return response.json()
            }
            throw Error(response.status + "! Something went wrong")
        }).then((todoData) => {
            console.log(toDoData);
        }).catch(err => {
            console.log('Error', err)
        })
      
    }

    const addUser = () => {
        if(inputValue.trim() !== '');
        fetch(`'https://playground.4geeks.com/apis/fake/todos/user/${username}'`,{
            method: 'POST',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
            'Content-Type': 'text/plain'
            })
        }
       
        ).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            return response.json();
        })
        .then(data => {
            setTasks(data);
            setInputValue('');
        })
        .catch(error => {
            
            setError('Failed to fetch todos');
        });{
            setTasks([...tasks, inputValue]);
            
        } 
        setUsername([...username, inputValue])
        setUsername('');
    }

    const deleteUser = () => {
        console.log('Delete username')
    }

    const addTask = () => {
        if (inputValue.trim() !== '') 
        fetch(`'https://playground.4geeks.com/apis/fake/todos/user/${username}'`,{
            method: 'POST' ,
            headers: {
                "Content-Type": "application/json"
              }
        }
       
        ).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            return response.json();
        })
        .then(data => {
            setTasks(data);
            setInputValue('');
        })
        .catch(error => {
            
            setError('Failed to fetch todos');
        });{
            setTasks([...tasks, inputValue]);
            
        } 
    }

    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            addTask();
        } 
    };

    const removeTask = (index) => {
        fetch(`'https://playground.4geeks.com/apis/fake/todos/user/${username}'`,{
            method: 'DELETE' ,
            headers: {
                "Content-Type": "application/json"
              }
        }
       
        ).then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch todos');
            }
            return response.json();
        })
        .then(data => {
            setTasks(data);
            setInputValue('');
        })
        .catch(error => {
            
            setError('Failed to fetch todos');
        });{
            setTasks([...tasks, inputValue]);
            
        } 
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    

    return (
        <div className="container mt-3">
            
            <h5 className="Title text-center mt-5 mb-2 p-3">Todos List</h5>
            <div>
                <input
                className="inputUser"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your Username"
              
                onKeyDown={(e) => {
                    if (e.key === 'Enter' ) {
                        console.log(' Fetch Todo List')
                        fetchTodoList()
                    }
                }}
                />
                <button onClick={deleteUser}>Delete User</button>
            </div>
            <nav className="navbar navbar-light bg-light">
                <input
                    className="Tasker container"
                    type="text"
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyEnter}
                    placeholder="What needs to be done"
                    maxLength={80}
                    value={inputValue}
                />
            </nav>
            

                <div className="TaskRemover mt-2">
                    {tasks.map((task, index) => (
                        <div className="ListTasks d-flex container p-0" key={index}>
                            <div className="navbar navbar-light bg-light container p-4">
                                <input type="checkbox"
                                checked=""
                                />
                                <p className="Newtasks mb-0">{task}</p>
                                <span className="spanIcone">
                                    <i
                                        className="fa-solid fa-ban "
                                        onClick={() => removeTask(index)}
                                    ></i>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
        
            <div className="TasksNum bg-light mt-2 p-2">{tasks.length} Tasks left to do</div>
           
        </div>
    );
};

export default AnyComponent;


