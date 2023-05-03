import React, { useContext, useState, useRef, useEffect } from "react";
import classNames from "classnames";
import { DragDropContext } from "./DragDropProvider";

import "./DragDropList.css";

const DraggableItem = ({ item, children }) => {
  const {
    itemIdField,
    setDraggedId,
    setTargetId,
    resetIndicies,
    dragOccuring,
  } = useContext(DragDropContext);
  const [dragging, setDragging] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);
  const wrapper = useRef();
  const id = itemIdField ? item[itemIdField] : item;

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    wrapper.current.style.height = `${wrapper.current.offsetHeight}px`;
    setDraggedId(id);
  };

  const handleDragOver = (e) => {
    setDraggingOver(!dragging);
    e.preventDefault();
    setTargetId(id);
  };

  const handleDragEnd = (e) => {
    resetIndicies();
    setDragging(false);
    setDraggingOver(false);
    wrapper.current.style.height = "";
  };

  const handleDrag = (e) => {
    setDragging(true);
  };

  return (
    <div
      className={classNames(
        "draggable-item",
        dragging ? "dragging" : null,
        draggingOver ? "dragging-over" : null
      )}
      draggable
      ref={wrapper}
      onDragLeave={() => setDraggingOver(false)}
      onDrag={handleDrag}
      onDrop={() => setDraggingOver(false)}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
};
export { DraggableItem };
