import React, {useState} from 'react';
import DebouncedInput from '../components/DebouncedInput/DebouncedInput';
export default {
  title: 'Example/DebouncedInput',
  component: <DebouncedInput />,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <DebouncedInput {...args}/>;

export const Example1 = Template.bind({});
Example1.args = {
  label: "input",
  value: "",
  timeout: 3000,
  disabled: false,
  onChange: (value) => {console.log(value)},
  placeholder: 'Enter text here'
}
