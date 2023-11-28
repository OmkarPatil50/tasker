import React, { useContext } from "react";
import { TaskContext } from "../../context/TaskContextProvider";
import TaskCard from "../../components/TaskCard/TaskCard";
import './TaskList.css'

const TaskList = () => {
  const { state, dispatch } = useContext(TaskContext);

  return (
    <div>
      <ul className="task-list">
        {state.taskList.map((task) => {
          return <TaskCard task={task} />;
        })}
      </ul>
    </div>
  );
};

export default TaskList;
