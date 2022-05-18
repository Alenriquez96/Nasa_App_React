import React from "react";
import { shallow } from "enzyme";
import NeasList from "./NeasList";

describe("NeasList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<NeasList />);
    expect(wrapper).toMatchSnapshot();
  });
});
