import React from "react";
import { Link } from "react-router-dom";

class Todo extends React.Component {
    constructor(props) {
      super(props);
      this.state = { todo: { task: "", description:"" } };
      this.addHtmlEntities = this.addHtmlEntities.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
    }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ todo: response }))
      .catch(() => this.props.history.push("/todos"));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }

  deleteTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.props.history.push("/todos"))
      .catch(error => console.log(error.message));
    }

  render() {
    const { todo } = this.state;
    let todoList = "No todo-list available";
    let todoDesc = "No description available";

    if (todo.task.length > 0 || todo.description.length >0) {
      todoList = todo.task
      todoDesc= todo.description
        .split("\n")
        .map((task,description, index) => (
          <li key={index} className="list-group-item">
            {task}
            {description}
          </li>
         
        ));
    }

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <div  style="white-space: pre" />
          <h1 className="display-4 position-relative text-white">
            {todo.task}
          </h1>
          <h4>{todo.description}</h4>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group" >
                <h5 className="mb-2">Tasks</h5>
                  {todo.task}
                  {todo.description}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                Delete Task
              </button>
            </div>
          </div>
          <Link to="/todos" className="btn btn-link">
            Back to todo-list
          </Link>
        </div>
      </div>
    );
  }
}
  
  export default Todo;