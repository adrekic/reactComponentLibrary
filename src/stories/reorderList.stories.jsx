import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ReorderList, ReorderListItem } from "../components/ReorderList";
import "./styles/reorderList.css";
import classNames from "classnames";
import { reorder } from "../components/DragDropList/DragDropProvider";
export default {
  title: "Example/ReorderList",
  component: <ReorderList />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => {
  const [items, setItems] = useState([
    { title: "Item1", id: uuid(), description: "Lorem ipsum dolor sit amet." },
    { title: "Item2", id: uuid(), description: "lorem askm ask" },
    { title: "Item3", id: uuid(), description: "Husmk ipsum utli sit." },
    { title: "Item4", id: uuid(), description: "Ipsum huji lik opa." },
    { title: "Item5", id: uuid(), description: "Bajm upas tusi qut." },
  ]);

  const handleReorder = (result) => {
    setItems(reorder(items, result.sourceIndex, result.targetIndex));
  };

  return (
    <div className="reorder-list-example1-container">
      <ReorderList numItems={items.length} onReorder={handleReorder}>
        {items.map((item, index) => (
          <ReorderListItem item={item} index={index} key={item.id}>
            {(isSelected) => (
              <div
                className={classNames({
                  "reorder-list-item-example1": true,
                  selected: isSelected,
                })}
              >
                {item.title}
              </div>
            )}
          </ReorderListItem>
        ))}
      </ReorderList>
    </div>
  );
};

export const Example1 = Template.bind({});
Example1.args = {};
