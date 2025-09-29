import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import Hero from "./Hero";

// ✅ next/image باید default mock بشه
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// ✅ WeatherModal هم default export داره، پس اینجوری mock کن
jest.mock("@/features/Weather/WeatherModal", () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="weather-modal">
      Weather Modal
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

describe("Hero Component", () => {
  it("renders the main heading", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText(/Hi, I’m Parham/i)).toBeInTheDocument();
  });

  it("renders the job title", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText(/Front-end Developer/i)).toBeInTheDocument();
  });

  it("renders both buttons", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    renderWithProviders(<Hero />);
    expect(screen.getByAltText("Hero")).toBeInTheDocument();
  });

  it("opens WeatherModal when clicking the cloud image", () => {
    renderWithProviders(<Hero />);
    fireEvent.click(screen.getByAltText("cloud"));
    expect(screen.getByTestId("weather-modal")).toBeInTheDocument();
  });

  it("closes WeatherModal on close button", () => {
    renderWithProviders(<Hero />);
    fireEvent.click(screen.getByAltText("cloud"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("weather-modal")).not.toBeInTheDocument();
  });
});
