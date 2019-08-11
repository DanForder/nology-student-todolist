import React from "react";
import Task from "./Task";
import { shallow } from "enzyme";

describe("MyPlantCollection tests", () => {
  let component = shallow(<Task />);

  it("should render one li tag on the screen ", () => {
    expect(component.find("li").length).toEqual(1);
  });
});
