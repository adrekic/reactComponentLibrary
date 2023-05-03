import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  DragDropProvider,
  reorder,
} from "../components/DragDropList/DragDropProvider";
import { DraggableItem } from "../components/DragDropList/DraggableItem";
import { DroppableArea } from "../components/DragDropList/DroppableArea";
import { TestItem } from "../components/DragDropList/TestItem";
export default {
  title: "Example/DroppableArea",
  component: <DroppableArea />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => {
  const [items, setItems] = useState([
    { item: "item1", id: uuid() },
    { item: "item2", id: uuid() },
    { item: "item3", id: uuid() },
    { item: "item4", id: uuid() },
    { item: "item5", id: uuid() },
    { item: "item6", id: uuid() },
    { item: "item7", id: uuid() },
    { item: "item8", id: uuid() },
    { item: "item9", id: uuid() },
    { item: "item10", id: uuid() },
    { item: "item11", id: uuid() },
    { item: "item12", id: uuid() },
    { item: "item13", id: uuid() },
    { item: "item14", id: uuid() },
    { item: "item15", id: uuid() },
    { item: "item16", id: uuid() }
  ]);

  const handleOnDragEnd = (result) => {
    console.log(result);
    setItems(
      reorder(items, result.source.draggedIndex, result.destination.targetIndex)
    );
  };

  return (
    <DragDropProvider
      items={items}
      itemIdField="id"
      onDragEnd={handleOnDragEnd}
    >
      <DroppableArea>
        {items.map((item) => {
          return (
            <DraggableItem item={item}>
              <TestItem item={item} />
            </DraggableItem>
          );
        })}
      </DroppableArea>
    </DragDropProvider>
  );
};

export const Example1 = Template.bind({});
Example1.args = {};
