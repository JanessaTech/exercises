import { render, screen } from "@testing-library/react";
import WelcomePage from "./page";

test("renders success headline and no email badge when email is empty", async () => {
  render(<WelcomePage searchParams={{}} />);

  expect(
    screen.getByRole("heading", { name: /signed in successfully/i })
  ).toBeInTheDocument();

  expect(screen.queryByText(/@/)).not.toBeInTheDocument();
});

test("renders email badge when email provided", async () => {
  render(<WelcomePage searchParams={{ email: "user@example.com" }} />);

  expect(
    screen.getByRole("heading", { name: /signed in successfully/i })
  ).toBeInTheDocument();
  expect(screen.getByText("user@example.com")).toBeInTheDocument();
});

