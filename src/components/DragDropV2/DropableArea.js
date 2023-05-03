import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { draggableContext } from "./DraggableProvider";

import "./DragDropV2.css";
import classNames from "classnames";
import reactDom from "react-dom";

export const DropableArea = ({ children }) => {
  const { dragEvent, resetDragEvent, onDragEnd } = useContext(draggableContext);

  const handleMouseUp = (e) => {
    onDragEnd(dragEvent);
    resetDragEvent();
  };

  return (
    <div
      className={classNames({
        "dropable-area": true,
        "drag-occuring": dragEvent.dragOccuring,
      })}
      onMouseUp={handleMouseUp}
    >
      {children}
      {dragEvent.dragOccuring
        ? reactDom.createPortal(
            <Ghost
              ref={dragEvent.ref}
              clientX={dragEvent.clientX}
              clientY={dragEvent.clientY}
              pageX={dragEvent.pageX}
              pageY={dragEvent.pageY}
              resetDragEvent={resetDragEvent}
            >
              {dragEvent.children ? dragEvent.children : null}
            </Ghost>,
            document.body
          )
        : null}
    </div>
  );
};

const Ghost = forwardRef(
  ({ resetDragEvent, children, clientX, clientY, pageX, pageY }, ref) => {
    const { top, left } = ref.current.getBoundingClientRect();
    const [isDragging, setIsDragging] = useState(false);
    const [inset, setInset] = useState({
      top: pageY - clientY + top,
      left: pageX - clientX + left,
    });

    useEffect(() => {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseUp);
      };
    }, []);

    const handleMouseMove = (e) => {
      setIsDragging(true);
      setInset({
        top: e.pageY - clientY + top,
        left: e.pageX - clientX + left,
      });
    };

    const handleMouseUp = (e) => {
      resetDragEvent();
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseUp);
    };

    return (
      <div
        className={classNames({
          "draggable-item ghost": true,
          "is-dragging": isDragging,
        })}
        draggable={false}
        style={{
          top: `${inset.top}px`,
          left: `${inset.left}px`,
          height: `${ref.current.offsetHeight}px`,
          width: `${ref.current.offsetWidth}px`,
          pointerEvents: true ? "none" : "auto",
        }}
      >
        {children}
      </div>
    );
  }
);
