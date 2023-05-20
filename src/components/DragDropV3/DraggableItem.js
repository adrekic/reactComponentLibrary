import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { DraggableContext } from "./DraggableProvider";
import { getDragInfo } from "./utils";

import "./style.css";

export const DraggableItem = ({ children, className, index, itemsKey }) => {
  const { state, dispatch } = useContext(DraggableContext);
  const {
    dragOccuring,
    dragging,
    sourceRef,
    sourceItemsKey,
    sourceIndex,
    targetItemsKey,
    targetIndex,
    translate,
  } = state;
  const wrapper = useRef(null);
  const [dragState, setDragState] = useState({
    active: false,
    storedIndex: index,
    directionMultiplier: 1,
  });

  const resetDragState = () => {
    setDragState({
      active: false,
      storedIndex: index,
      directionMultiplier: 1,
    });
  };

  useEffect(() => {
    if (!dragOccuring) {
      // resetDragState();
      return;
    }
    if (wrapper === sourceRef) return;

    // Adding to other list
    if (itemsKey !== sourceItemsKey && itemsKey === targetItemsKey) {
      setDragState({
        ...dragState,
        storedIndex: index >= targetIndex ? index + 1 : index,
        active: index >= targetIndex,
      });
    }

    // Reordering within list
    else if (sourceItemsKey === itemsKey && targetItemsKey === itemsKey) {
      // console.log(targetIndex, index > targetIndex, translate.y)
      setDragState({
        ...dragState,
        active: targetIndex < index,
      });
      // setDragState(getDragInfo(sourceIndex, targetIndex, index));
    }
  }, [dragOccuring, targetIndex]);

  // useEffect(() => {
  //   if (targetItemsKey === null) {
  //     console.log('reseting')
  //     resetDragState();
  //   }
  // }, [targetItemsKey]);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Removes the annoying chrome globe
    dispatch({
      type: "INIT_DRAG",
      payload: {
        pageX: e.pageX,
        pageY: e.pageY,
        sourceItemsKey: itemsKey,
        sourceIndex: index,
        sourceRef: wrapper,
        sourceChildren: children,
        targetItemsKey: itemsKey,
        targetIndex: index,
      },
    });
  };

  const handleMouseOver = (e) => {
    if (!dragOccuring) return;

    // If entering with an item from another list, hence targetitemsKey is null
    if (sourceItemsKey && targetItemsKey === null) {
      dispatch({ type: "SET_TARGET_ITEMS_KEY", payload: itemsKey });
      dispatch({ type: "SET_TARGET_INDEX", payload: dragState.storedIndex });
    }

    if (itemsKey === sourceItemsKey) {
      dispatch({ type: "SET_TARGET_INDEX", payload: dragState.storedIndex });
    }
  };

  if(itemsKey === "key1" && index === 1) console.log(dragState);

  return (
    <div
      className={classNames("draggable-item-v3-wrapper", className)}
      style={{
        visibility: sourceRef === wrapper ? "hidden" : "visible",
        position: sourceRef === wrapper ? "fixed" : null,
        borderColor: dragState.active ? "red" : "black",
        transition: dragging && dragState.active ? "150ms linear transform" : null,
        transform: dragging && dragState.active ? `translate(0px, ${translate.y}px)` : null,
      }}
      ref={wrapper}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
    >
      {children(dragState.active)}
    </div>
  );
};
