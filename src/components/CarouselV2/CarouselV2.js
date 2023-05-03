import React, { useEffect, useRef, useState } from "react";

import "./CarouselV2.css";

export const CarouselV2 = ({ items, itemCell, itemsPerPage }) => {
  const ItemCell = itemCell;
  const frame = useRef(null);
  const itemsList = useRef(null);
  const itemContainerRefs = useRef(null);
  const currentParitionedIndex = useRef(0);
  const [partitionedItems, setParitionedItems] = useState([[]]);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const getItemContainerRefsMap = () => {
    if (itemContainerRefs.current === null)
      itemContainerRefs.current = new Map();
    return itemContainerRefs.current;
  };

  useEffect(() => {
    let tempPartitionedItems = [];
    for (let index = 0; index < items.length; index += itemsPerPage) {
      tempPartitionedItems.push(items.slice(index, index + itemsPerPage));
    }
    setParitionedItems(tempPartitionedItems);
  }, [items, itemsPerPage]);

  useEffect(() => {
    const itemContainer = itemContainerRefs.current.get(0);
    const { height, width } = itemContainer.getBoundingClientRect();
    frame.current.style.height = `${height}px`;
    frame.current.style.width = `${width}px`;
  }, [itemCell, partitionedItems]);

  const handleClick = (isLeft) => {
    const index = isLeft
      ? currentParitionedIndex.current
      : currentParitionedIndex.current + 1;

    const itemContainer = itemContainerRefs.current.get(index);
    const { width } = itemContainer.getBoundingClientRect();
    const transitionRate = partitionedItems[index].length / itemsPerPage;
    itemsList.current.style.transitionDuration = `${transitionRate * 300}ms`;

    if (isLeft) {
      setTranslate((prevTranslate) => ({
        ...prevTranslate,
        x: prevTranslate.x + width,
      }));
      currentParitionedIndex.current -= 1;
    } else {
      setTranslate((prevTranslate) => ({
        ...prevTranslate,
        x: prevTranslate.x - width,
      }));
      currentParitionedIndex.current += 1;
    }
  };

  const renderedItems = partitionedItems.map((partition, index) => {
    return (
      <div
        className="item-cell-container"
        ref={(ele) => {
          let map = getItemContainerRefsMap();
          if (ele) map.set(index, ele);
          else map.delete(index);
        }}
        key={index}
      >
        {partition.map((item, index) => {
          return <ItemCell key={index} item={item} />;
        })}
      </div>
    );
  });
  console.log(partitionedItems, currentParitionedIndex.current);

  return (
    <div className="carousel-v2-wrapper">
      <button onClick={() => handleClick(true)}>{"<"}</button>
      <div className="carousel-v2-frame" ref={frame}>
        <div
          className="carousel-v2-items-list"
          ref={itemsList}
          style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
        >
          {renderedItems}
        </div>
      </div>
      <button onClick={() => handleClick(false)}>{">"}</button>
    </div>
  );
};
