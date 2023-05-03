import React, { useState } from "react";
import { DropDownCard } from "../components/DropDownCard/DropDownCard";
export default {
  title: "Example/DropDownCard",
  component: <DropDownCard />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <DropDownCard
    toggleButton={
      <div
        style={{
          width: "100px",
          height: "30px",
          backgroundColor: "red",
          borderRadius: "1vw",
        }}
      ></div>
    }
  >
    <div
      style={{
        width: "200px",
        height: "300px",
        backgroundColor: "red",
        borderRadius: "1vw",
      }}
    ></div>
  </DropDownCard>
);

export const Example1 = Template.bind({});
Example1.args = {};
