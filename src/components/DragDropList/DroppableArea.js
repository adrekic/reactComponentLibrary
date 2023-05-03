import React, { useContext } from "react";
import { DragDropContext } from "./DragDropProvider";

import "./DragDropList.css";
import classNames from "classnames";

const DroppableArea = ({ children }) => {
  const {
    draggedId,
    targetId,
    onDragEnd,
    items,
    itemIdField,
    resetIndicies,
    dragOccuring,
  } = useContext(DragDropContext);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    console.log("draggedId: ", draggedId, "targetId: ", targetId);
    const result = {
      source: {
        draggedId,
        draggedIndex: items.findIndex((item) =>
          itemIdField ? item[itemIdField] === draggedId : item === draggedId
        ),
      },
      destination: {
        targetId,
        targetIndex: items.findIndex((item) =>
          itemIdField ? item[itemIdField] === targetId : item === targetId
        ),
      },
    };
    onDragEnd(result);
    resetIndicies();
  };

  return (
    <div
      className={classNames(
        "draggable-area",
        dragOccuring ? "drag-occuring" : null
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
export { DroppableArea };
