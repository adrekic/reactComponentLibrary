import React, { useState } from "react";
import { DropDownV1 } from "../components/DropDownV1/DropDownV1";
export default {
  title: "Example/DropDownV1",
  component: <DropDownV1 />,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => {
  const [options, setOptions] = useState(args.options);
  const [selected, setSelected] = useState(null);

  const handleChange = (option) => {
    setSelected(option);
  };

  return (
    <DropDownV1
      onChange={handleChange}
      options={options}
      selected={selected}
      optionCell={args.optionCell}
    />
  );
};

export const Example1 = Template.bind({});
Example1.args = {
  optionCell: (option, isSelected) => (
    <div style={{ width: "300px", height: "50px", border: "solid 1px black" }}>
      {option ? option.value : "Select an option"}
    </div>
  ),
  options: [
    { value: "item1" },
    { value: "item2" },
    { value: "item3" },
    { value: "item4" },
    { value: "item5" },
    { value: "item6" },
    { value: "item7" },
    { value: "item8" },
  ],
};
