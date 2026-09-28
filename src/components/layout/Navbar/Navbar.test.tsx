import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { Navbar } from ".";

// Mock lucide-react icons (SVGs can cause issues in tests)
jest.mock("lucide-react", () => ({
  Lock: () => <svg data-testid="lock-icon" />,
  Menu: () => <svg data-testid="menu-icon" />,
  X: () => <svg data-testid="x-icon" />,
}));

// Helper to render with ThemeProvider since Navbar depends on ThemeContext
const renderWithProviders = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe("Navbar Component (Comprehensive)", () => {
  it("renders the Theme button", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole("button", { name: /Theme/i })).toBeInTheDocument();
  });

  it("toggles the Theme dropdown menu when Theme button is clicked", () => {
    renderWithProviders(<Navbar />);
    const themeBtn = screen.getByRole("button", { name: /Theme/i });

    // Before click → dropdown should not exist
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // After first click → dropdown should appear
    fireEvent.click(themeBtn);
    expect(screen.getByRole("list")).toBeInTheDocument();

    // After second click → dropdown should disappear
    fireEvent.click(themeBtn);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("renders desktop navigation links (Home, Projects, Skills, Contact)", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("opens and closes the mobile menu when the hamburger button is clicked", () => {
    renderWithProviders(<Navbar />);
    const menuBtn = screen.getByRole("button", { hidden: true });

    // Open mobile menu
    fireEvent.click(menuBtn);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();

    // Close mobile menu
    fireEvent.click(menuBtn);
    const dropdown = screen.queryByRole("list", { hidden: true });
    expect(dropdown).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a mobile link is clicked", () => {
    renderWithProviders(<Navbar />);
    const menuBtn = screen.getByRole("button", { hidden: true });

    // Open mobile menu
    fireEvent.click(menuBtn);
    const mobileHomeLink = screen.getAllByText("Home")[0]; // The first 'Home' link (mobile dropdown)

    // Click on link → should close the mobile menu
    fireEvent.click(mobileHomeLink);
    const dropdown = screen.queryByRole("list", { hidden: true });
    expect(dropdown).not.toBeInTheDocument();
  });
});
