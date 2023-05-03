import React, { useState } from "react";
import { CarouselV2 } from "../components/CarouselV2/CarouselV2";
export default {
  title: "Example/CarouselV2",
  component: <CarouselV2 />,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => <CarouselV2 {...args} />;

export const Example1 = Template.bind({});
Example1.args = {
  itemCell: ({ item }) => (
    <div style={{ width: "200px", height: "100px", border: "solid 1px black" }}>
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
    { value: "item9" },
    { value: "item10" },
    { value: "item11" },
    { value: "item12" },
    { value: "item13" },
    { value: "item14" },
    { value: "item15" },
    { value: "item16" },
  ],
  itemsPerPage: 4,
};
