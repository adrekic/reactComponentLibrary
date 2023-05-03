import React, { useState } from "react";
import { ProgressBar } from "../components/ProgressBar/ProgressBar";
export default {
  title: "Example/ProgressBar",
  component: <ProgressBar />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => {
  return (
    <div
      style={{
        width: "300px",
        height: "20px",
        backgroundColor: "lightgray",
        borderRadius: "1vw",
        overflow: "hidden",
      }}
    >
      <ProgressBar {...args} />
    </div>
  );
};

export const Example1 = Template.bind({});
Example1.args = {
  duration: 3000,
  progress: 1,
};
