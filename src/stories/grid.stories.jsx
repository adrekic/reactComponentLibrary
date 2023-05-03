import React from "react";
import { GridWrapper, GridItem } from "../components/Grid/GridWrapper";
export default {
  title: "Example/Grid",
  component: <GridWrapper />,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
};

const Template = (args) => {
  return (
    <div style={{width: "500px", height: "500px"}}>
      <GridWrapper
        style={{
          gridTemplateColumns: "0.51fr 1fr 1fr 0.5fr",
          gridTemplateRows: "0.5fr 1fr 1fr 1fr 1fr 0.5fr",
        }}
      >
        <GridItem
          style={{ gridColumn: "span 4", backgroundColor: "red" }}
        ></GridItem>
        <GridItem
          style={{
            gridColumn: "span 1",
            gridRow: "span 4",
            backgroundColor: "yellow",
          }}
        ></GridItem>
        <GridItem
          style={{
            gridColumn: "span 2",
            gridRow: "span 4",
            backgroundColor: "blue",
          }}
        ></GridItem>
        <GridItem
          style={{
            gridColumn: "span 1",
            gridRow: "span 4",
            backgroundColor: "yellow",
          }}
        ></GridItem>
        <GridItem
          style={{ gridColumn: "span 4", backgroundColor: "red" }}
        ></GridItem>
      </GridWrapper>
    </div>
  );
};

export const GridExample = Template.bind({});
GridExample.args = {
  label: "input",
  value: "",
  timeout: 3000,
  disabled: false,
  onChange: (value) => {
    console.log(value);
  },
  placeholder: "Enter text here",
};
