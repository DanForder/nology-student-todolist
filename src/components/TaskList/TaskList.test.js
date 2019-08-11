import React from "react";
import TaskList from "./TaskList";
import { shallow } from "enzyme";

describe("TaskList tests", () => {
  let component = shallow(<TaskList list={["test task 1", "test task 2"]} />);

  it("should render a number of task tags equal to the number of mock tasks given above", () => {
    expect(component.find("Task").length).toEqual(2);
  });
});
