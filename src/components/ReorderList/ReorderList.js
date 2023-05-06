import React, { createContext, useReducer, useState } from "react";

import "./ReorderList.css";

export const ReorderListContext = createContext();

const initialState = {
  selectedItem: null,
  ref: null,
  sourceIndex: null,
  targetIndex: null,
};

const reducer = (state, action) => {
  if (action.type === "SET_SELECTED_ITEM") {
    return {
      ...state,
      selectedItem: action.payload.selectedItem,
      sourceIndex: action.payload.sourceIndex,
      targetIndex: action.payload.targetIndex,
      ref: action.payload.ref,
    };
  } else if (action.type === "SET_SOURCE_INDEX") {
    return { ...state, sourceIndex: action.payload };
  } else if (action.type === "SET_TARGET_INDEX") {
    return { ...state, targetIndex: action.payload };
  } else if (action.type === "RESET_SELECTED_ITEM") {
    return initialState;
  }
};

export const ReorderList = ({ children, onReorder, numItems }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleReorder = () => {
    onReorder(state);
    dispatch({ type: "RESET_SELECTED_ITEM" });
  };

  return (
    <div className="reorder-list">
      <ReorderListContext.Provider
        value={{ state, dispatch, handleReorder, numItems }}
      >
        {children}
      </ReorderListContext.Provider>
    </div>
  );
};
