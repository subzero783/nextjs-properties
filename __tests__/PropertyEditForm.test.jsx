import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PropertyEditForm from "@/components/PropertyEditForm";

// Mock react-toastify to prevent errors during testing
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "123" }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("PropertyEditForm", () => {
  // This is a "smoke test". It just checks if the component renders
  // without crashing. It's a good first test to write.
  it('renders the form and the "Edit Property" heading', async () => {
    // We mock the fetch function to prevent real network calls
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          Promise.resolve({
            type: "Apartment",
            name: "Test Property",
            location: {},
            rates: {},
            seller_info: {},
            amenities: [],
          }),
      })
    );

    render(<PropertyEditForm />);

    // 'findBy' is used when we need to wait for something to appear
    // (like after our fetch and loading state have finished)
    const heading = await screen.findByRole("heading", {
      name: /edit property/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
