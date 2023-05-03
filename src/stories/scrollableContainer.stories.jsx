import React from "react";
import { ScrollableContainer } from "../components/ScrollableContainer/ScrollableContainer";
import { TestItem } from "../components/DragDropList/TestItem";
export default {
  title: "Example/ScrollableContainer",
  component: <ScrollableContainer />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <ScrollableContainer {...args}>
    {new Array(100).fill(0).map(() => {
      return <div className="test-item"></div>;
    })}
  </ScrollableContainer>
);

export const Example1 = Template.bind({});
Example1.args = {
  hideScrollBar: false,
};
