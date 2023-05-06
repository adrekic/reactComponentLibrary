import React, { useContext, useEffect, useRef, useState } from "react";

import { ReorderListContext } from "./ReorderList";

import "./ReorderList.css";

export const ReorderListItem = ({ children, item, index }) => {
  const { state, dispatch, handleReorder, numItems } =
    useContext(ReorderListContext);
  const { selectedItem, targetIndex, sourceIndex, ref } = state;
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const wrapper = useRef();

  useEffect(() => {
    if (selectedItem === null) {
      setTranslate({ x: 0, y: 0 });
    } else {
      if (selectedItem === item) {
        const multiplier = targetIndex - sourceIndex;
        console.log("multiplier: ", multiplier);
        setTranslate((prevTranslate) => ({
          ...prevTranslate,
          y: ref.current.offsetHeight * multiplier,
        }));
      } else {
        const isActive =
          sourceIndex < index ? index <= targetIndex : index >= targetIndex;
        const direction = sourceIndex < index ? -1 : 1;
        console.log(isActive, index);
        setTranslate((prevTranslate) => ({
          ...prevTranslate,
          y: isActive ? direction * ref.current.offsetHeight : 0,
        }));
      }
    }
  }, [ref, targetIndex]);

  const handleItemSelect = () => {
    if (selectedItem) {
      handleReorder();
      // setTranslate({ x: 0, y: 0 });
      dispatch({ type: "RESET_SELECTED_ITEM" });
    }

    if (selectedItem !== item) {
      let storedIndex = index;

      if (selectedItem) {
        const isActive =
          sourceIndex < index ? index <= targetIndex : index >= targetIndex;
        storedIndex = isActive
          ? sourceIndex < index
            ? index - 1
            : index + 1
          : index;
        console.log(storedIndex);
      }

      dispatch({
        type: "SET_SELECTED_ITEM",
        payload: {
          selectedItem: item,
          sourceIndex: storedIndex,
          targetIndex: storedIndex,
          ref: wrapper,
        },
      });
      wrapper.current.focus();
    } else if (selectedItem === item) {
      // handleReorder();
      dispatch({ type: "RESET_SELECTED_ITEM" });
      wrapper.current.blur();
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      if (state.targetIndex !== 0) shift(true);
      // ArrowUp
    } else if (e.keyCode === 40) {
      if (state.targetIndex !== numItems - 1) shift(false);
      // ArrowDown
    } else if (e.keyCode === 13) {
      handleReorder();
    }
  };

  function shift(isUp) {
    if (isUp) {
      dispatch({ type: "SET_TARGET_INDEX", payload: state.targetIndex - 1 });
    } else {
      dispatch({ type: "SET_TARGET_INDEX", payload: state.targetIndex + 1 });
    }
  }

  return (
    <div
      className="reorder-list-item"
      style={{
        transform: `translate(${translate.x}px,${translate.y}px)`,
        zIndex: selectedItem === item ? "1000" : "0",
        transition: selectedItem !== null ? "linear 250ms transform" : null,
      }}
      tabIndex={index}
      ref={wrapper}
      onClick={handleItemSelect}
      onKeyDown={handleKeyDown}
    >
      {children(selectedItem === item)}
    </div>
  );
};
