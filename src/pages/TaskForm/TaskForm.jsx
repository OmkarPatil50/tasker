import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TaskContext } from "../../context/TaskContextProvider";

const TaskForm = () => {
  const location = useLocation();

  const { state, dispatch } = useContext(TaskContext);

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
    <form onChange={changeHandler} onSubmit={submitHandler}>
      <fieldset>
        <legend>Task Name</legend>
        <input type="text" name="name" />
      </fieldset>
      <fieldset>
        <legend>Task Description</legend>
        <input type="text" required name="description" />
      </fieldset>
      <fieldset>
        <legend>Priority level</legend>
        <select name="priority" id="priority">
          <option value="">Select Priority Level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>Task Due Date</legend>
        <input type="date" name="dueDate" />
      </fieldset>
      <button type="submit">{isEditForm ? "Edit" : "Add"} Task</button>
    </form>
  );
};

export default TaskForm;
