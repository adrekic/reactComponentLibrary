import React, { createContext, useEffect, useReducer, useContext, useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";

export const DraggableContext = createContext();

const initialState = {
  dragOccuring: false,
  dragging: false,
  pageX: null,
  pageY: null,
  sourceItemsKey: null,
  sourceIndex: null,
  sourceRef: null,
  translate: { x: 0, y: 0 },
  sourceChildren: null,
  targetItemsKey: null,
  targetIndex: null,
};

const draggableReducer = (state, action) => {
  if (action.type === "INIT_DRAG") {
    return {
      ...state,
      dragOccuring: true,
      pageX: action.payload.pageX,
      pageY: action.payload.pageY,
      sourceItemsKey: action.payload.sourceItemsKey,
      sourceIndex: action.payload.sourceIndex,
      sourceRef: action.payload.sourceRef,
      sourceChildren: action.payload.sourceChildren,
      targetItemsKey: action.payload.targetItemsKey,
      targetIndex: action.payload.targetIndex,
    };
  } else if(action.type === "SET_DRAGGING"){
    return {
      ...state,
      dragging: action.payload,
    };
  } else if (action.type === "SET_TARGET_INDEX") {
    return {
      ...state,
      targetIndex: action.payload,
    };
  } else if (action.type === "SET_SOURCE_ITEMS_KEY") {
    return {
      ...state,
      sourceItemsKey: action.payload,
    };
  } else if (action.type === "SET_TARGET_ITEMS_KEY") {
    return {
      ...state,
      targetItemsKey: action.payload,
      // sourceIndex: null,
    };
  } else if (action.type === "SET_TRANSLATE") {
    return {
      ...state,
      translate: action.payload,
    };
  } else if (action.type === "RESET_DRAG") {
    return initialState;
  }
};

export const DraggableProvider = ({ children, onDragEnd }) => {
  const [state, dispatch] = useReducer(draggableReducer, initialState);

  useEffect(() => {
    if (state.sourceRef && state.sourceRef.current) {
      const sourceElement = state.sourceRef.current;
      const computedStyle = window.getComputedStyle(sourceElement);

      // Getting Margins from DraggableItem component to properly calculate translate x and y:
      const marginBottom = parseInt(
        computedStyle.getPropertyValue("margin-bottom")
      );
      const marginTop = parseInt(computedStyle.getPropertyValue("margin-top"));
      const marginLeft = parseInt(
        computedStyle.getPropertyValue("margin-left")
      );
      const marginRight = parseInt(
        computedStyle.getPropertyValue("margin-right")
      );

      dispatch({
        type: "SET_TRANSLATE",
        payload: {
          x: sourceElement.offsetWidth + marginLeft + marginRight,
          y: sourceElement.offsetHeight + marginTop + marginBottom,
        },
      });
    }
  }, [state.sourceRef]);

  // console.log(state);
  return (
    <DraggableContext.Provider value={{ state, dispatch, onDragEnd }}>
      {children}
      {state.dragOccuring
        ? createPortal(
            <GhostDraggableItem
              sourceRef={state.sourceRef}
              pageX={state.pageX}
              pageY={state.pageY}
            >
              {state.sourceChildren()}
            </GhostDraggableItem>,
            document.body
          )
        : null}
    </DraggableContext.Provider>
  );
};

function GhostDraggableItem({ sourceRef, pageX, pageY, children }) {
  const { state, dispatch } = useContext(DraggableContext);
  const {dragging} = state;
  const { top, left } = sourceRef.current.getBoundingClientRect();
  const [inset, setInset] = useState({ top: top, left: left });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  function handleMouseMove(e) {
    setInset({ top: e.pageY - pageY + top, left: e.pageX - pageX + left });
    dispatch({type: "SET_DRAGGING", payload: true});
  }

  function handleMouseUp(e) {
    dispatch({ type: "RESET_DRAG" });
  }

  return (
    <div
      className="draggable-item-v3-wrapper ghost"
      style={{
        top: `${inset.top}px`,
        left: `${inset.left}px`,
        pointerEvents: dragging ? "none" : "all"
      }}
    >
      {children}
    </div>
  );
}
