import React, { createContext, useReducer } from "react";

const TaskContext = createContext();

const TaskContextProvider = () => {
  const initialValue = {
    taskList: [],
    isLoading: false,
  };

  const taskReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TASK": {
        return { ...state, taskList: [...state.taskList, action.payload] };
      }

      case "DELETE_TASK": {
        return {
          ...state,
          taskList: state.taskList.filter(({ id }) => id !== action.payload),
        };
      }

      case "EDIT_TASK": {
        return {
          ...state,
          taskList: state.taskList.reduce((acc, curr) => {
            return action.payload.id === curr.id
              ? [...acc, action.payload.updatedTask]
              : [...acc, curr];
          }, []),
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(taskReducer, initialValue);

  return (
    <TaskContext.Provider value={{ state, dispatch }}></TaskContext.Provider>
  );
};

export default TaskContextProvider;
