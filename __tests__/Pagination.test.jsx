import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

// We group related tests together in a 'describe' block.
describe("Pagination Component", () => {
  // Test 1: The component should render the correct page info.
  it("renders correctly with page numbers", () => {
    // A 'mock function' lets us track if a function is called.
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        page={3}
        pageSize={10}
        totalItems={100} // This should result in 10 total pages
        onPageChange={mockOnPageChange}
      />
    );

    // Check if the page info text is on the screen
    expect(screen.getByText("Page 3 of 10")).toBeInTheDocument();
  });

  // Test 2: 'Previous' button should be disabled on page 1.
  //   it('disables the "Previous" button on the first page', () => {
  //     const mockOnPageChange = jest.fn();

  //     render(
  //       <Pagination
  //         page={1}
  //         pageSize={10}
  //         totalItems={100}
  //         onPageChange={mockOnPageChange}
  //       />
  //     );

  //     // Find the 'Previous' button and check if it's disabled
  //     const prevButton = screen.getByText("Previous");
  //     expect(prevButton).toBeInTheDocument();
  //     expect(prevButton).toBeDisabled();
  //   });

  // Test 3: 'Next' button should be disabled on the last page.
  //   it('disables the "Next" button on the last page', () => {
  //     const mockOnPageChange = jest.fn();

  //     render(
  //       <Pagination
  //         page={10}
  //         pageSize={10}
  //         totalItems={100}
  //         onPageChange={mockOnPageChange}
  //       />
  //     );

  //     // Find the 'Next' button and check if it's disabled
  //     const nextButton = screen.getByText("Next");
  //     expect(nextButton).toBeInTheDocument();
  //     expect(nextButton).toBeDisabled();
  //   });

  //   // Test 4: 'Next' button should call onPageChange with the correct page.
  //   it('calls onPageChange with the next page number when "Next" is clicked', () => {
  //     const mockOnPageChange = jest.fn();

  //     render(
  //       <Pagination
  //         page={5}
  //         pageSize={10}
  //         totalItems={100}
  //         onPageChange={mockOnPageChange}
  //       />
  //     );

  //     // Find the 'Next' button
  //     const nextButton = screen.getByText("Next");

  //     // Simulate a user click
  //     fireEvent.click(nextButton);

  //     // Check if our mock function was called, and called with the right argument (page 6)
  //     expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  //     expect(mockOnPageChange).toHaveBeenCalledWith(6);
  //   });

  //   // Test 5: 'Previous' button should call onPageChange with the correct page.
  //   it('calls onPageChange with the previous page number when "Previous" is clicked', () => {
  //     const mockOnPageChange = jest.fn();

  //     render(
  //       <Pagination
  //         page={5}
  //         pageSize={10}
  //         totalItems={100}
  //         onPageChange={mockOnPageChange}
  //       />
  //     );

  //     // Find the 'Previous' button
  //     const prevButton = screen.getByText("Previous");

  //     // Simulate a user click
  //     fireEvent.click(prevButton);

  //     // Check if our mock function was called, and called with the right argument (page 4)
  //     expect(mockOnPageChange).toHaveBeenCalledTimes(1);
  //     expect(mockOnPageChange).toHaveBeenCalledWith(4);
  //   });
});
