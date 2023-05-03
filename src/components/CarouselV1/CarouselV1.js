import React, { useState, useRef, useEffect } from "react";

import "./CarouselV1.css";

export const CarouselV1 = ({ items, itemCell, itemsPerSlide, itemKey }) => {
  const ItemCell = itemCell;
  const wrapper = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [currentItemPartition, setCurrentItemPartition] = useState([]);
  const [sideBarWidth, setSideBarWidth] = useState(0);

  useEffect(() => {
    let tempCurrentItemPartition = items.slice(
      startIndex,
      startIndex + itemsPerSlide
    );

    if (tempCurrentItemPartition.length < itemsPerSlide) {
      tempCurrentItemPartition = tempCurrentItemPartition.concat(
        items.slice(0, itemsPerSlide - tempCurrentItemPartition.length)
      );
    }
    setCurrentItemPartition(tempCurrentItemPartition);
  }, [startIndex, itemsPerSlide, items]);

  useEffect(() => {
    const { width } = wrapper.current.getBoundingClientRect();
    setSideBarWidth(Math.min(30, width * 0.1));
  }, [itemCell, currentItemPartition]);

  const handleSideBarClick = (isLeft) => {
    updateStartIndex(isLeft);
  };

  function updateStartIndex(isLeft) {
    if (isLeft) {
      if (startIndex - itemsPerSlide < 0)
        setStartIndex(items.length + startIndex - itemsPerSlide);
      else setStartIndex(startIndex - itemsPerSlide);
    } else {
      if (startIndex + itemsPerSlide > items.length)
        setStartIndex(startIndex + itemsPerSlide - items.length);
      else setStartIndex(startIndex + itemsPerSlide);
    }
  }

  const renderedItems = currentItemPartition.map((item, index) => {
    const key = itemKey ? item[itemKey] : index;
    return <ItemCell key={key} item={item} />;
  });

  return (
    <div className="carousel-wrapper" ref={wrapper}>
      <div
        className="carousel-side-bar"
        style={{
          width: `${sideBarWidth}px`,
          left: "0px",
        }}
        onClick={() => handleSideBarClick(true)}
      ></div>
      {renderedItems}
      <div
        className="carousel-side-bar"
        style={{
          width: `${sideBarWidth}px`,
          right: "0px",
        }}
        onClick={() => handleSideBarClick(false)}
      ></div>
    </div>
  );
};
