import React from "react";
import ToDoContainer from "./ToDoContainer";
import { shallow } from "enzyme";

describe("ToDoContainer tests", () => {
  const mockUser = {
    uid: "0123456789"
  };

  let component = shallow(<ToDoContainer user={mockUser} />);

  it("the visibility of completed tasks should be toggled when toggleCompletedVisiblity method is called", () => {
    component.setState({
      completedTasksVisible: false
    });
    component.instance().toggleCompletedVisibility();
    expect(component.state("completedTasksVisible")).toEqual(true);
    component.instance().toggleCompletedVisibility();
    expect(component.state("completedTasksVisible")).toEqual(false);
  });

  it("the visibility of current tasks should be toggled when toggleCurrentVisibility method is called", () => {
    component.setState({
      currentTasksVisible: false
    });
    component.instance().toggleCurrentVisibility();
    expect(component.state("currentTasksVisible")).toEqual(true);
    component.instance().toggleCurrentVisibility();
    expect(component.state("currentTasksVisible")).toEqual(false);
  });
});
