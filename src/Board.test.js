import React from "react";
import { render, fireEvent, debug } from "@testing-library/react";
import Board from "./Board";

test("if renders without crashing", () => {
  render(<Board />)
})

test("if matches snapshot with no lights on", () => {
  const {asFragment} = render(<Board chanceLightStartsOn={0} />);
  expect(asFragment()).toMatchSnapshot();
})

test("if matches snapshot with all lights on", () => {
  const {asFragment} = render(<Board chanceLightStartsOn={1} />);
  expect(asFragment()).toMatchSnapshot();
})

test("if game shows winning message when all lights are out", () => {
  const { queryByText, queryByTestId, debug } = render(<Board chanceLightStartsOn={0}/>);
  debug();
    
  expect(queryByText("You won!")).toBeInTheDocument();
  expect(queryByTestId("board")).not.toBeInTheDocument();
})

test("if clicking a cell works", () => {
  const { queryByTestId, debug } = render(<Board chanceLightStartsOn={1}/>);
  debug();
    
  const cell1_1 = queryByTestId("1-1");
  expect(cell1_1).toHaveClass("Cell-lit");

  fireEvent.click(cell1_1);
  //clicking cell turns cell off 
  expect(cell1_1).not.toHaveClass("Cell-lit");

  //clicking cell turns surrounding cells off 
  const cell0_1 = queryByTestId("0-1");
  const cell2_1 = queryByTestId("2-1");
  const cell1_0 = queryByTestId("1-0");
  const cell1_2 = queryByTestId("1-2");

  expect(cell0_1).not.toHaveClass("Cell-lit");
  expect(cell2_1).not.toHaveClass("Cell-lit");
  expect(cell1_0).not.toHaveClass("Cell-lit");
  expect(cell1_2).not.toHaveClass("Cell-lit");

  //clicking cell does not turn off other cells  
  const cell0_0 = queryByTestId("0-0");
  const cell0_2 = queryByTestId("0-2");
  const cell2_0 = queryByTestId("2-0");
  const cell2_2 = queryByTestId("2-2");

  expect(cell0_0).toHaveClass("Cell-lit");
  expect(cell0_2).toHaveClass("Cell-lit");
  expect(cell2_0).toHaveClass("Cell-lit");
  expect(cell2_2).toHaveClass("Cell-lit");

  debug();
})


// test("if works when you click on the right arrow", function() {
//   const { queryByTestId, queryByAltText } = render(<Carousel />);

//   // expect the first image to show, but not the second
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

//   // move forward in the carousel
//   const rightArrow = queryByTestId("right-arrow");
//   fireEvent.click(rightArrow);

//   // expect the second image to show, but not the first
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
// });


// test("if works when you click on the left arrow", function() {
//   const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

//   // move forward in the carousel so you are on the second slide
//   const rightArrow = queryByTestId("right-arrow");
//   fireEvent.click(rightArrow);

//   // expect the second image to show, but not the first
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

//   // move backward in the carousel
//   const leftArrow = queryByTestId("left-arrow");
//   fireEvent.click(leftArrow);

//   // // expect the first image to show, but not the second or third
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
//   expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
//   expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

// });

// test("if no left arrow on first card", function() {
//   const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

//   // expect to be on the first card
//   expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

//   // expect no left arrow
//   expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
// });

// test("if no right arrow on last card", function() {
//   const { queryByTestId, queryByAltText, debug } = render(<Carousel />);

//   const rightArrow = queryByTestId("right-arrow");
//   fireEvent.click(rightArrow);
//   fireEvent.click(rightArrow);
//   // expect to be on the third card
//   expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();

//   // expect no right arrow
//   expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
// });