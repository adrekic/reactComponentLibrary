import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  DragDropProvider,
  reorder,
} from "../components/DragDropList/DragDropProvider";
import { DraggableItem } from "../components/DragDropV2/DraggableItem";
import { DropableArea } from "../components/DragDropV2/DropableArea";
import { DraggableProvider } from "../components/DragDropV2/DraggableProvider";
import { TestItem } from "../components/DragDropList/TestItem";
import { ScrollableContainer } from "../components/ScrollableContainer/ScrollableContainer";
export default {
  title: "Example/DragDropV2",
  component: <DropableArea />,
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
    { item: "item16", id: uuid() },
  ]);

  const handleOnDragEnd = (dragEvent) => {
    setItems(reorder(items, dragEvent.sourceIndex, dragEvent.destinationIndex));
  };

  return (
    <DraggableProvider {...args} onDragEnd={handleOnDragEnd}>
      <DropableArea>
        {items.map((item, index) => {
          return (
            <DraggableItem item={item} index={index}>
              {/* <TestItem item={item} /> */}
              {item.item}
            </DraggableItem>
          );
        })}
      </DropableArea>
    </DraggableProvider>
  );
};

const Template2 = (args) => {
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
    { item: "item16", id: uuid() },
  ]);

  const handleOnDragEnd = (dragEvent) => {
    setItems(reorder(items, dragEvent.sourceIndex, dragEvent.destinationIndex));
  };

  return (
    <ScrollableContainer>
      <DraggableProvider {...args} onDragEnd={handleOnDragEnd}>
        <DropableArea>
          {items.map((item, index) => {
            return (
              <DraggableItem item={item} index={index}>
                {/* <TestItem item={item} /> */}
                {item.item}
              </DraggableItem>
            );
          })}
        </DropableArea>
      </DraggableProvider>
    </ScrollableContainer>
  );
};

export const Example1 = Template.bind({});
Example1.args = {
  pressDelay: 100,
};

export const Example2 = Template2.bind({});
Example2.args = {
  pressDelay: 100
}
