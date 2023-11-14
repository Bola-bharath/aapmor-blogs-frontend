import { render, screen } from "@testing-library/react";
import Test from "./testing";

describe("testing email input field", () => {
  test("test input placeholder", () => {
    const { getByPlaceholderText } = render(<Test />);
    const emailValidation =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const inputElement = getByPlaceholderText("enter email");
    console.log(inputElement.value);
    expect(inputElement.value).toMatch(emailValidation);
  });
});
