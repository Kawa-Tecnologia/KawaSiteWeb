import React from "react";
import { render, screen } from "@testing-library/react";
import RoutesApp from "../Routes";

jest.mock("../components/ThemeProvider", () => ({
  useTheme: () => ({
    darkMode: false 
  })
}));

test("renders correct component for '/' route", () => {
  render(
      <RoutesApp />
  );

  expect(screen.getByText(/Bem-vindo/i)).toBeInTheDocument();
});
