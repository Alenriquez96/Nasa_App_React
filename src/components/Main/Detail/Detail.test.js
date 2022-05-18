import React from "react";
import { shallow } from "enzyme";
import Detail from "./Detail";

describe("Detail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Detail />);
    expect(wrapper).toMatchSnapshot();
  });
});
