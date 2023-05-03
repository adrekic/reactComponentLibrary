import React, { useState } from "react";
import { CarouselV1 } from "../components/CarouselV1/CarouselV1";
export default {
  title: "Example/CarouselV1",
  component: <CarouselV1 />,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => <CarouselV1 {...args} />;

export const Example1 = Template.bind({});
Example1.args = {
  itemCell: ({ item }) => (
    <div style={{ width: "300px", height: "300px", border: "solid 1px black" }}>
      {item.value}
    </div>
  ),
  items: [
    { value: "item1" },
    { value: "item2" },
    { value: "item3" },
    { value: "item4" },
    { value: "item5" },
    { value: "item6" },
    { value: "item7" },
    { value: "item8" },
  ],
  itemsPerSlide: 3,
};
