import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";

import { DraggableContext } from "./DraggableProvider";

import "./style.css";
import { createPortal } from "react-dom";

const GhostDraggableItem = ({ sourceRef, pageX, pageY, children }) => {
  const { state, dispatch } = useContext(DraggableContext);
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
      }}
    >
      {children}
    </div>
  );
};

export const DroppableArea = ({ children, className, itemsKey }) => {
  const { state, dispatch, onDragEnd } = useContext(DraggableContext);
  const {
    dragOccuring,
    sourceRef,
    pageX,
    pageY,
    sourceItemsKey,
    targetItemsKey,
  } = state;

  const handleMouseUp = () => {
    if (!dragOccuring) return;

    onDragEnd(state);
    dispatch({ type: "RESET_DRAG" });
  };

  const handleMouseEnter = () => {
    if (!dragOccuring) return;
  };

  const handleMouseLeave = () => {
    if (!dragOccuring) return;
    
    dispatch({ type: "SET_TARGET_ITEMS_KEY", payload: null });
    dispatch({ type: "SET_TARGET_INDEX", payload: null });
  };

  return (
    <>
      <div
        className={classNames("droppable-area-v3-wrapper", className)}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {/* {dragOccuring && sourceItemsKey === itemsKey
        ? createPortal(
            <GhostDraggableItem
              sourceRef={sourceRef}
              pageX={pageX}
              pageY={pageY}
            >
              {state.sourceChildren()}
            </GhostDraggableItem>,
            document.body
          )
        : null} */}
    </>
  );
};
