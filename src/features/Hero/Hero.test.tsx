import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/context/ThemeContext";
import Hero from "./Hero";

// برای mock کردن Next.js Image (چون jest با Image مشکل داره)
jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt} />;
});

// برای جلوگیری از ارور WeatherModal (اگر خیلی پیچیده‌ست می‌تونی mock ساده بنویسی)
jest.mock("@/features/Weather/WeatherModal", () => {
  return function MockWeatherModal({ onClose }: { onClose: () => void }) {
    return (
      <div data-testid="weather-modal">
        Weather Modal
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe("Hero Component", () => {
  it("renders the main heading", () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    expect(screen.getByText(/Hi, I’m Parham/i)).toBeInTheDocument();
  });

  it("renders the job title", () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    expect(screen.getByText(/Front-end Developer/i)).toBeInTheDocument();
  });

  it("renders both buttons", () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    expect(screen.getByText(/View My Work/i)).toBeInTheDocument();
    expect(screen.getByText(/Get in Touch/i)).toBeInTheDocument();
  });

  it("renders the hero image", () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    const heroImage = screen.getByAltText("Hero");
    expect(heroImage).toBeInTheDocument();
  });

  it("opens WeatherModal when clicking the cloud image", () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    const cloudImage = screen.getByAltText("cloud");
    fireEvent.click(cloudImage);

    expect(screen.getByTestId("weather-modal")).toBeInTheDocument();
  });

  it("closes WeatherModal when close button is clicked", () => {
    render(
      <ThemeProvider>
        <Hero />
      </ThemeProvider>
    );
    const cloudImage = screen.getByAltText("cloud");
    fireEvent.click(cloudImage);

    const closeBtn = screen.getByText("Close");
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId("weather-modal")).not.toBeInTheDocument();
  });
});
