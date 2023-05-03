import React, { useContext } from "react";
import classnames from "classnames";

import "./DragDropList.css";
import { DragDropContext } from "./DragDropProvider";

export const TestItem = ({ item }) => {
  // const { draggedId, dragOccuring } = useContext(DragDropContext);
  return (
    <div
      className={classnames({
        "test-item": true,
        // "drag-occuring": dragOccuring && draggedId !== item.id,
        // dragging: draggedId === item.id,
      })}
    >
      {item.item}
    </div>
  );
};
