import "./App.css";
import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      id: 0,
      task: "",
      status: "created",
    };
  }
  componentDidMount() {
    axios.get("https://mytodo-app.azurewebsites.net/api/").then((res) => {
      this.setState({
        tasks: res.data,
        id: 0,
        task: "",
        status: "created",
      });
    });
  }
  submit(event, id) {
    console.log(id);
    event.preventDefault();
    axios
      .post("https://mytodo-app.azurewebsites.net/api/", {
        task: this.state.task, //adding new task
        status: "created",
      })
      .then(() => {
        this.componentDidMount();
      });
  }

  delete(id) {
    axios.delete("https://mytodo-app.azurewebsites.net/api/" + id).then(() => {
      this.componentDidMount(); //deleting a completed task
    });
  }

  edit(id) {
    console.log(id)
    axios.put("https://mytodo-app.azurewebsites.net/api/" + id).then(() => {
      this.setState({
        status: "completed", //editing status of the task
      });      
      this.componentDidMount();
    });
  }

  render() {
    return (
      <div className="main">
        <Topbar />
        <hr size="1" />

        {/* Add task Section starts  */}
        <div className="add-task">
          <form onSubmit={(e) => this.submit(e, this.state.id)}>
            <div className="add-icon">
              &nbsp;
              <input
                value={this.state.task}
                onChange={(e) => this.setState({ task: e.target.value })}
                className="input-box"
                placeholder="Add a task"
                required
                validationErrors={
                  {isDefaultRequiredValue: 'Field is required'}
                }
              />
              &nbsp;
              &nbsp;
              <button className="submit-button" type="submit" name="action">
              <i class="fas fa-plus"></i>
              </button>
            </div>
          </form>

          <div className="three-dots">
            <i className="fas fa-ellipsis-v"></i>
          </div>
        </div>
         {/* Add task Section ends  */}

{/* showing created tasks Section starts  */}
         <div className="tasks-view">

          {
              this.state.tasks.map((task) =>
                // displays if task status is created
                  task.status === "created" ?
                    (
                      <><div className="tasks-list">
                      <input className="checkbox" type="checkbox" onClick={(e) => this.edit(task.id)}></input>
                      <div className=" listing">
                      <p className="task-name">{task.task}</p>
                      <button className="delete-button" onClick={(e) => this.delete(task.id)} type="submit" name="action">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                      </div><hr size="1" className="seperation" /></>
                    )
                    : null
                
              )
          }
 {/* showing created task Section ends  */}

 {/* showing completed task Section starts  */}

          {
            this.state.tasks.map((task) =>
            // displays if task status is completed
                task.status === "completed" ?
                  <><div className="tasks-list ">
                  <i className="checkbox fas fa-check"></i>
                    <div className=" listing">
                      <p className="task-name done">{task.task}</p>
                      <button className="delete-button" onClick={(e) => this.delete(task.id)} type="submit" name="action">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </div><hr size="1" className="seperation" /></>
                : null            
              
            )
          }
        
 {/* showing completed task Section ends  */}

</div>


      </div>
    );
  }
}

function Topbar() {
  return (
    <div className="top-bar">
      <div className="title">
        <div className="top-title">TASKS</div>
        <div className="bottom-title">
          TASK &nbsp;
          <i className="fas fa-caret-down"></i>
        </div>
      </div>
      <div className="close-icon">
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}

export default App;
