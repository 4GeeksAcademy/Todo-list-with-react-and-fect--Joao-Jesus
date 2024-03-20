import React, { useState, useEffect } from "react";

const AnyComponent = () => {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        if (username.trim() !== '') {
            fetchTasks();
        }
    }, [username]);

    const fetchTasks = () => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(response => {
                setTasks(response);
            })
            .catch(error => {
                setError('Failed to fetch data');
                console.error(error);
            });
    };

    const addTask = () => {
        if (inputValue.trim() !== '') {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
                method: "POST",
                body: JSON.stringify({ label: inputValue }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add task');
                    }
                    return response.json();
                })
                .then(response => {
                    setTasks(prevTasks => [...prevTasks, response]);
                    setInputValue('');
                })
                .catch(error => {
                    setError('Failed to add task');
                    console.error(error);
                });
        }
    };

    const handleKeyEnter = (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    };

    const removeTask = (taskId) => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => { 
                console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to delete task');
                }
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
               
            })
            .catch(error => {
                setError('Failed to delete task');
                console.error(error);
            });
    };

    return (
        <div className="container mt-3">
            <h5 className="Title text-center mt-5 mb-2 p-3">Todos List</h5>
            <div>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Username"
                    onKeyPress={handleKeyEnter} 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={fetchTasks}>Fetch Tasks</button>
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
            {error && <div>Error: {error}</div>}
            <div className="TaskRemover mt-2">
                {tasks.map(task => (
                    <div className="ListTasks d-flex container p-0" key={task.id}>
                        <div className="navbar navbar-light bg-light container p-4">
                            <p className="Newtasks mb-0">{task.label}</p>
                            <span className="spanIcone">
                            <i className="fa-solid fa-ban" 
                            onClick={() => removeTask(task.id)}></i>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="TasksNum  bg-light mt-2 p-2">{tasks.length} Tasks left to do</div>
        </div>
    );
}

export default AnyComponent;
