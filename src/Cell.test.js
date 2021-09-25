import React from "react";
import { render, fireEvent, debug } from "@testing-library/react";
import Cell from "./Cell";

test("if renders without crashing", () => {
  render(<Cell />)
})

test("if matches snapshot", () => {
  const {asFragment} = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
})


