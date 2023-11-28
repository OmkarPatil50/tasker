import React, { useContext } from "react";
import "./TaskCard.css";
import { TaskContext } from "../../context/TaskContextProvider";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { id, name, description, priority, dueDate } = task;

  const { state, dispatch } = useContext(TaskContext);

  const navigate = useNavigate();

  return (
    <li>
      <div className="task-card">
        <div className="task-header">
          <h2 className="task-title">{name}</h2>
          <div className="task-icons">
            <span
              className="edit-icon"
              onClick={() => {
                navigate(`/edit/${id}`, {
                  state: task,
                });
              }}
            >
              <i className="fas fa-edit"></i>
            </span>
            <span
              className="delete-icon"
              onClick={() => {
                dispatch({ type: "DELETE_TASK", payload: id });
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </div>
        </div>
        <p className="task-description">{description}</p>
        <div className="task-details">
          <p className="task-priority">Priority: {priority}</p>
          <p className="task-due-date">Due Date: {dueDate}</p>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
