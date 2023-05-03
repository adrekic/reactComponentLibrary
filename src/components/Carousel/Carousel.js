import React, { useEffect, useRef, useState } from "react";

import "./Carousel.css";

const CarouselV1 = ({ items, itemsPerFrame, itemCell }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [frames, setFrames] = useState([[]]);

  useEffect(() => {
    let tempFrames = [];
    for (let index = 0; index < items.length; index += itemsPerFrame) {
      tempFrames.push(items.slice(index, index + itemsPerFrame));
    }
    console.log(tempFrames);
    setFrames(tempFrames);
    setSelectedIndex(0)
  }, [items, itemsPerFrame]);

  const handleClick = (forward) => {
    if(forward){
      if(selectedIndex < frames.length - 1) setSelectedIndex(selectedIndex + 1)
    } else {
      if(selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
    }
  }

  const renderedFrame = frames[selectedIndex].map((item) => {
    return itemCell ? itemCell({ item }) : null;
  });

  return (
    <div className="carousel-wrapper">
      <button onClick={() => handleClick(false)}>back</button>
      <div className="frame-wrapper">{renderedFrame}</div>
      <button onClick={() => handleClick(true)}>forward</button>
    </div>
  );
};

const Carousel = ({ items, itemWidth, itemHeight, itemsPerFrame }) => {
  // const itemList = useRef();

  // const handleClick = (isRight) => {
  //   if (isRight){
  //     itemList.current.style.transform = `${}`
  //   } else {

  //   }
  // }

  // const renderedItems = items.map((item) => {
  //   return (
  //     <div
  //       className="item"
  //       style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
  //     ></div>
  //   );
  // });

  // return (
  //   <div className="carousel-wrapper">
  //     <button></button>
  //     <div
  //       className="carousel-view"
  //       style={{ width: `${itemWidth * itemsPerFrame}px` }}
  //     >
  //       <div className="item-list" ref={itemList}>
  //         {renderedItems}
  //       </div>
  //     </div>
  //     <button></button>
  //   </div>
  // );
};
export { CarouselV1 };
