import React from "react";
import { Link } from "react-router-dom";

class Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     todos: []
    };
  }

  componentDidMount() {
    const url = "/api/v1/todos/index";
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ todos: response }))
      .catch(() => this.props.history.push("/"));
}

render() {
    const { todos } = this.state;
    const allTodos = todos.map((todo, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <li>
                <h5 className="card-title">Task: {todo.task}</h5>
                <p>Description: {todo.description}</p>
            </li>
            
            <Link to={`/todo/${todo.id}`} className="btn custom-button">
              View Todo-List
            </Link>
          </div>
        </div>
      </div>
    ));
    const noTodo = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No task assign yet. Why not <Link to="/new_todo">NEW TASK</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">Todo-List</h1>
          </div>
        </section>    
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/todo" className="btn custom-button">
                Create New Task
              </Link>
            </div>
            <div className="row">
              {todos.length > 0 ? allTodos : noTodo}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }

}
export default Todos;