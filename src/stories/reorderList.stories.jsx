import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { ReorderList, ReorderListItem } from "../components/ReorderList";
import "./styles/radioGroup.css";
import classNames from "classnames";
export default {
  title: "Example/ReorderList",
  component: <ReorderList />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => {
  const [items, setItems] = useState([
    { title: "Item1", id: uuid(), description: "Lorem ipsum dolor sit amet." },
    { title: "Item2", id: uuid(), description: "lorem askm ask" },
    { title: "Item3", id: uuid(), description: "Husmk ipsum utli sit." },
    { title: "Item4", id: uuid(), description: "Ipsum huji lik opa." },
    { title: "Item5", id: uuid(), description: "Bajm upas tusi qut." },
  ]);
  return (
    <div
      style={{
        width: "400px",
        height: "min-content",
        marginLeft: "20px",
        // border: "solid black 1px",
        // padding: "10px",
        marginTop: "20px",
      }}
    ></div>
  );
};

export const Example1 = Template.bind({});
Example1.args = {};
