import React, {useState} from "react";
import { Animation } from "../components/Animation/Animation";
export default {
  title: "Example/Animation",
  component: <Animation />,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => {
  const [show, setShow] = useState(false);
  return (
    <>
    <button onClick={() => setShow(!show)}>show</button>
    <Animation show={show} delay={250}>
      <div className="test-div">hey</div>
    </Animation>
    </>
    
  );
};

export const Example1 = Template.bind({});
Example1.args = {};
