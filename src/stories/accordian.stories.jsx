import React from "react";
import { TiledAccordian } from "../components/TiledAccordian/TiledAccordian";
export default {
  title: "Example/Accordian",
  component: <TiledAccordian />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => <div>
  <div style={{width: "100px", height: "100px"}}></div>
    <TiledAccordian {...args} />
  </div>;

export const Example1 = Template.bind({});
Example1.args = {
  items: ["item1", "item2", "item3"],
};
