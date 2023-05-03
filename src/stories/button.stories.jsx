import React from "react";
import { CircleButton } from "../components/CircleButton/CircleButton";
export default {
  title: "Example/Button",
  component: <CircleButton />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <CircleButton {...args} />;

export const Example1 = Template.bind({});
Example1.args = {
  children: "Click Me",
};

export const Example2 = Template.bind({});
Example2.args = {
  children: "Change the Color",
  style: {
    backgroundColor: "red",
  },
  width: "200px",
  height: "200px",
};
