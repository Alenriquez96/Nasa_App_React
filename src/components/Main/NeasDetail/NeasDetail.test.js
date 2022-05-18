import React from "react";
import { shallow } from "enzyme";
import NeasDetail from "./NeasDetail";

describe("NeasDetail", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NeasDetail />);
    expect(wrapper).toMatchSnapshot();
  });
});
