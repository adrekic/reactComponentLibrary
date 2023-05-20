import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DraggableProvider } from "../components/DragDropV3/DraggableProvider";
import { DroppableArea } from "../components/DragDropV3/DroppableArea";
import { DraggableItem } from "../components/DragDropV3/DraggableItem";

import "./styles/dragDropV3.css";
import { reorder } from "../components/DragDropList/DragDropProvider";

export default {
  title: "Example/DragDropV3",
  component: <DraggableProvider />,
  parameters: {
    layout: "fullscreen",
  },
};

const ItemCell = ({ item, active }) => {
  return (
    <div
      className="drag-drop-v3-item-example"
      style={{ borderColor: active ? "red" : "black" }}
    >
      {item.item + " | " + item.itemKey}
    </div>
  );
};

const Template = (args) => {
  const [items, setItems] = useState({
    key1: [
      { item: "item1", id: uuid(), itemKey: "key1" },
      { item: "item2", id: uuid(), itemKey: "key1" },
      { item: "item3", id: uuid(), itemKey: "key1" },
      { item: "item4", id: uuid(), itemKey: "key1" },
      { item: "item5", id: uuid(), itemKey: "key1" },
    ],
    key2: [
      { item: "item1", id: uuid(), itemKey: "key2" },
      { item: "item2", id: uuid(), itemKey: "key2" },
      { item: "item3", id: uuid(), itemKey: "key2" },
      { item: "item4", id: uuid(), itemKey: "key2" },
      { item: "item5", id: uuid(), itemKey: "key2" },
    ],
    key3: [
      { item: "item1", id: uuid(), itemKey: "key3" },
      { item: "item2", id: uuid(), itemKey: "key3" },
      { item: "item3", id: uuid(), itemKey: "key3" },
      { item: "item4", id: uuid(), itemKey: "key3" },
      { item: "item5", id: uuid(), itemKey: "key3" },
    ],
  });

  const handleDragEnd = (result) => {
    const { sourceItemsKey, targetItemsKey, sourceIndex, targetIndex } = result;
    if (sourceItemsKey === targetItemsKey) {
      let itemsCopy = { ...items };
      itemsCopy[targetItemsKey] = reorder(
        itemsCopy[targetItemsKey],
        sourceIndex,
        targetIndex
      );
      setItems(itemsCopy);
    }
  };

  return (
    <div className="draggable-list-container">
      <DraggableProvider onDragEnd={handleDragEnd}>
        <DroppableArea itemsKey="key1" className={"droppable-area-v3-example1"}>
          {items["key1"].map((item, index) => (
            <DraggableItem key={item.id} index={index} itemsKey="key1">
              {(active) => <ItemCell item={item} active={active} />}
            </DraggableItem>
          ))}
        </DroppableArea>
        <DroppableArea itemsKey="key2" className={"droppable-area-v3-example1"}>
          {items["key2"].map((item, index) => (
            <DraggableItem key={item.id} index={index} itemsKey="key2">
              {(active) => <ItemCell item={item} active={active} />}
            </DraggableItem>
          ))}
        </DroppableArea>
        <DroppableArea itemsKey="key3" className={"droppable-area-v3-example1"}>
          {items["key3"].map((item, index) => (
            <DraggableItem key={item.id} index={index} itemsKey="key3">
              {(active) => <ItemCell item={item} active={active} />}
            </DraggableItem>
          ))}
        </DroppableArea>
      </DraggableProvider>
    </div>
  );
};

export const Example1 = Template.bind({});
Example1.args = {};
