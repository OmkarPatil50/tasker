import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TaskContext } from "../../context/TaskContextProvider";
import "./TaskForm.css";

const TaskForm = () => {
  const location = useLocation();

  const { dispatch } = useContext(TaskContext);

  const [isEditForm, setIsEditForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    name: "",
    description: "",
    priority: "",
    dueDate: "0000-00-00",
  });

  useEffect(() => {
    if (location.state) {
      setIsEditForm(true);
    }

    return () => {
      setIsEditForm(false);
    };
  }, []);

  const changeHandler = (event) => {
    event.preventDefault();
    setTaskDetails(() => {
      return { ...taskDetails, [event.target.name]: event.target.value };
    });
  };

  const submitHandler = () => {
    dispatch({ type: "ADD_TASK", payload: taskDetails });
  };

  return (
    <form
      className="task-form"
      onChange={changeHandler}
      onSubmit={submitHandler}
    >
      <h2 className="form-heading">{isEditForm ? "Edit" : "Add"} Task</h2>
      <fieldset className="task-fieldset">
        <legend className="task-legend task-name">Task Name</legend>
        <input className="task-input" type="text" name="name" required/>
      </fieldset>
      <fieldset className="task-fieldset">
        <legend className="task-legend">Task Description</legend>
        <input className="task-input" type="text" name="description" />
      </fieldset>
      <fieldset className="task-fieldset">
        <legend className="task-legend">Priority level</legend>
        <select className="task-select" name="priority" id="priority">
          <option value="">Select Priority Level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </fieldset>
      <fieldset className="task-fieldset">
        <legend className="task-legend">Task Due Date</legend>
        <input className="task-input" type="date" name="dueDate" />
      </fieldset>
      <button className="task-button" type="submit">
        {isEditForm ? "Edit" : "Add"} Task
      </button>
    </form>
  );
};

export default TaskForm;
