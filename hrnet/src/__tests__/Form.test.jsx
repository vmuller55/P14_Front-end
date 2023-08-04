import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Form from "../components/form/Form";
import { addEmployee } from "../redux/reducer";
import { useDispatch } from "react-redux";

// Mock the useDispatch hook
jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
  }));

// Mock the addEmployee action
jest.mock("../redux/reducer", () => ({
  addEmployee: jest.fn(),
}));

const mockSetIsFormVisible = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialValue) => [initialValue, mockSetIsFormVisible],
}));

describe("Form Component", () => {
    it("renders without crashing", () => {
      render(<Form />);
    });
  
    it("should update formValues state when input fields are changed", () => {
      render(<Form />);
      const inputFirstName = screen.getByLabelText("First Name");
      fireEvent.change(inputFirstName, { target: { value: "John" } });
  
      const inputLastName = screen.getByLabelText("Last Name");
      fireEvent.change(inputLastName, { target: { value: "Doe" } });
  
      const inputStreet = screen.getByLabelText("Street");
      fireEvent.change(inputStreet, { target: { value: "123 Main St" } });
  
      const inputCity = screen.getByLabelText("City");
      fireEvent.change(inputCity, { target: { value: "New York" } });
  
      const inputCode = screen.getByLabelText("Zip Code");
      fireEvent.change(inputCode, { target: { value: "12345" } });
    });

    it("should not call saveEmployee when the Save button is clicked and the form is invalid", () => {
      render(<Form />);
      const saveButton = screen.getByText("Save");
      fireEvent.click(saveButton);
  
      expect(addEmployee).not.toHaveBeenCalled();
    });
    
    it("should call dispatch and setIsFormVisible when the Save button is clicked and the form is valid", () => {
        // Mock the dispatch function
        const mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
    
        render(<Form />);
        const saveButton = screen.getByText("Save");
    
        // Mock form values to be valid
        const formValues = {
          firstName: "John",
          lastName: "Doe",
          birth: new Date(),
          start: new Date(),
          street: "123 Main St",
          city: "New York",
          code: "12345",
          selectedStateOption: "California",
          selectedDepartmentOption: "Marketing",
        };
    
        // Set form values by changing the inputs
    fireEvent.change(screen.getByLabelText("First Name"), {
        target: { value: formValues.firstName },
      });
      fireEvent.change(screen.getByLabelText("Last Name"), {
        target: { value: formValues.lastName },
      });
      fireEvent.change(screen.getByLabelText("Date of Birth"), {
        target: { value: formValues.birth },
      });
      fireEvent.change(screen.getByLabelText("Start Date"), {
        target: { value: formValues.start },
      });
      fireEvent.change(screen.getByLabelText("Street"), {
        target: { value: formValues.street },
      });
      fireEvent.change(screen.getByLabelText("City"), {
        target: { value: formValues.city },
      });
      fireEvent.change(screen.getByLabelText("State"), {
        target: { value: formValues.selectedStateOption },
      });
      fireEvent.change(screen.getByLabelText("Zip Code"), {
        target: { value: formValues.code },
      });
      fireEvent.change(screen.getByLabelText("Department"), {
        target: { value: formValues.selectedDepartmentOption },
      });

        // Trigger click event to call saveEmployee
        fireEvent.click(saveButton);
    
        // Verify that setIsFormVisible was called with the correct value
        expect(mockSetIsFormVisible).toHaveBeenCalledWith(false);
      });

    // Add more tests as needed for other scenarios and edge cases
  });
