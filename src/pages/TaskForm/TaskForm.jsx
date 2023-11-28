import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskContext } from "../../context/TaskContextProvider";
import { v4 as uuid } from "uuid";
import "./TaskForm.css";

const TaskForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useContext(TaskContext);

  const [isEditForm, setIsEditForm] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    id: uuid(),
    name: "",
    description: "",
    priority: "",
    dueDate: "0000-00-00",
  });

  useEffect(() => {
    if (location.state) {
      setIsEditForm(true);
      setTaskDetails(location.state);
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
    isEditForm
      ? dispatch({
          type: "EDIT_TASK",
          payload: {
            id: taskDetails.id,
            updatedTask: taskDetails,
          },
        })
      : dispatch({ type: "ADD_TASK", payload: taskDetails });

    navigate("/");
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
        <input
          className="task-input"
          type="text"
          name="name"
          required
          value={taskDetails.name}
        />
      </fieldset>
      <fieldset className="task-fieldset">
        <legend className="task-legend">Task Description</legend>
        <input
          className="task-input"
          type="text"
          name="description"
          value={taskDetails.description}
        />
      </fieldset>
      <fieldset className="task-fieldset">
        <legend className="task-legend">Priority level</legend>
        <select
          className="task-select"
          name="priority"
          id="priority"
          value={taskDetails.priority}
        >
          <option value="">Select Priority Level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </fieldset>
      <fieldset className="task-fieldset">
        <legend className="task-legend">Task Due Date</legend>
        <input
          className="task-input"
          type="date"
          name="dueDate"
          value={taskDetails.dueDate}
        />
      </fieldset>
      <button className="task-button" type="submit">
        {isEditForm ? "Edit" : "Add"} Task
      </button>
    </form>
  );
};

export default TaskForm;
