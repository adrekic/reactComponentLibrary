import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { RadioGroup } from "../components/RadioGroup/RadioGroup";
import { RadioOption } from "../components/RadioGroup/RadioOption";
import "./styles/radioGroup.css";
import classNames from "classnames";
export default {
  title: "Example/RadioGroup",
  component: <RadioGroup />,
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
  const [selected, setSelected] = useState(null);

  const onSelectChange = (item) => {
    setSelected(item);
  };
  console.log(selected);
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
    >
      <RadioGroup
        className={"test"}
        selected={selected}
        onSelectChange={onSelectChange}
      >
        {items.map((item) => (
          <RadioOption className={"test"} item={item} key={item.id}>
            {(selected) => {
              console.log(selected, item);
              return (
                <div
                  className={classNames({
                    "radio-option-example1": true,
                    selected: selected,
                  })}
                >
                  <div className="title">{item.title}</div>
                  <div className="description">{item.description}</div>
                </div>
              );
            }}
          </RadioOption>
        ))}
      </RadioGroup>
    </div>
  );
};

export const Example1 = Template.bind({});
Example1.args = {};
