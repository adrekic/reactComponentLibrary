import React, {useState} from 'react';
import { CarouselV1 } from '../components/Carousel/Carousel';
export default {
  title: 'Example/Carousel',
  component: <CarouselV1 />,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <CarouselV1 {...args}/>;

export const Example1 = Template.bind({});
Example1.args = {
  items: ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8"],
  itemCell: (props) => <div style={{border: "solid 1px red"}}>{props.item}</div>,
  itemsPerFrame: 1
}
