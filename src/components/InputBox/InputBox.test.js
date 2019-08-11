import React from "react";
import InputBox from "./InputBox";
import { shallow } from "enzyme";

describe("MyPlantCollection tests", () => {
  let component = shallow(<InputBox />);

  it("should render one input tag on the screen ", () => {
    expect(component.find("input").length).toEqual(1);
  });
});
