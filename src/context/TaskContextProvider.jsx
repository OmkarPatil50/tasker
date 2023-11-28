import React, { createContext, useEffect, useReducer } from "react";

export const TaskContext = createContext();

const TaskContextProvider = ({ children }) => {
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

  const checkState = localStorage.getItem("taskState");

  const setInitialValue = checkState ? JSON.parse(checkState) : initialValue;

  const [state, dispatch] = useReducer(taskReducer, setInitialValue);

  useEffect(() => {
    localStorage.setItem("taskState", JSON.stringify(state));
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
