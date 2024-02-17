import React from "react";
import { render, screen } from "@testing-library/react";
import RoutesApp from "../Routes";

// eslint-disable-next-line no-undef
jest.mock("../components/ThemeProvider", () => ({
  useTheme: () => ({
    darkMode: false 
  })
}));

// eslint-disable-next-line no-undef
test("renders correct component for '/' route", () => {
  render(
      <RoutesApp />
  );

  // eslint-disable-next-line no-undef
  expect(screen.getByText(/Bem-vindo/i)).toBeInTheDocument();
});
