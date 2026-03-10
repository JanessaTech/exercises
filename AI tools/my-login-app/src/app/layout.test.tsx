import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";

test("exports metadata", () => {
  expect(metadata.title).toBeTruthy();
  expect(metadata.description).toBeTruthy();
});

test("renders children inside the layout body", () => {
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

  render(
    <RootLayout>
      <div>Child content</div>
    </RootLayout>
  );

  expect(screen.getByText("Child content")).toBeInTheDocument();

  consoleError.mockRestore();
});

