import React, { useContext, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { draggableContext } from "./DraggableProvider";

import "./DragDropV2.css";

export const DraggableItem = ({ item, index, children }) => {
  const { setDragEvent, dragEvent, pressDelay } = useContext(draggableContext);
  const [transform, setTransform] = useState(null);
  const wrapper = useRef();
  const timer = useRef();

  const isDragging = dragEvent.ref === wrapper;

  const isActive = () => {
    return (
      (dragEvent.sourceIndex < index && dragEvent.destinationIndex >= index) ||
      (dragEvent.sourceIndex > index && dragEvent.destinationIndex <= index)
    );
  };

  const active =
    dragEvent.dragOccuring && dragEvent.sourceIndex !== index && isActive();
  const isSourceIndexSmaller = dragEvent.sourceIndex < index;
  const storedIndex = isSourceIndexSmaller
    ? active
      ? index - 1
      : index
    : active
    ? index + 1
    : index;

  useEffect(() => {
    if (dragEvent.ref !== null) {
      const computedStyle = window.getComputedStyle(dragEvent.ref.current);
      const marginBottom = parseInt(
        computedStyle.getPropertyValue("margin-bottom")
      );
      const marginTop = parseInt(computedStyle.getPropertyValue("margin-top"));

      let translateY =
        dragEvent.ref.current.offsetHeight + marginBottom + marginTop;
      if (isSourceIndexSmaller) translateY = -translateY;
      setTransform(`translate(0px,${translateY}px)`);
    }
  }, [dragEvent.ref]);

  const handleMouseDown = (e) => {
    e.preventDefault(); // Removes the annoying chrome globe
    timer.current = setTimeout(
      () => {
        setDragEvent((prevDragEvent) => ({
          ...prevDragEvent,
          dragOccuring: true,
          ref: wrapper,
          sourceIndex: index,
          destinationIndex: index,
          children: children,
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
        }));
      },
      pressDelay ? pressDelay : 0
    );
  };

  const handleMouseUp = (e) => {
    if (timer.current) clearTimeout(timer.current);
  };

  const handleMouseMove = (e) => {
    if (timer.current) clearTimeout(timer.current);
  };

  const handleMouseOver = (e) => {
    if (dragEvent.dragOccuring) {
      setDragEvent((prevDragEvent) => ({
        ...prevDragEvent,
        destinationIndex: storedIndex,
      }));
    }
  };

  return (
    <div
      className={classNames({
        "draggable-item": true,
        "is-dragging": isDragging,
        "drag-occuring": !isDragging && dragEvent.dragOccuring,
      })}
      style={{
        visibility: isDragging ? "hidden" : "visible",
        transform: active ? transform : "",
        transition: dragEvent.dragOccuring ? "linear 100ms transform" : null,
      }}
      draggable={false}
      ref={wrapper}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseOver}
    >
      {children}
    </div>
  );
};
