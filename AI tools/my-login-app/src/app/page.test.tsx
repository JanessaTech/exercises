import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./page";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

beforeEach(() => {
  pushMock.mockClear();
});

test("shows email validation error for invalid email", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(screen.getByLabelText("Email"), "not-an-email");
  await user.type(screen.getByLabelText("Password"), "secret");
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(
    await screen.findByText("Please enter a valid email address.")
  ).toBeInTheDocument();
  expect(pushMock).not.toHaveBeenCalled();
});

test("shows password validation error for empty password", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(screen.getByLabelText("Email"), "user@example.com");
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(
    await screen.findByText("Password cannot be empty.")
  ).toBeInTheDocument();
  expect(pushMock).not.toHaveBeenCalled();
});

test("toggles password visibility button", async () => {
  const user = userEvent.setup();
  render(<Home />);

  const password = screen.getByLabelText("Password") as HTMLInputElement;
  expect(password.type).toBe("password");

  await user.click(screen.getByRole("button", { name: "Show password" }));
  expect(password.type).toBe("text");
  expect(
    screen.getByRole("button", { name: "Hide password" })
  ).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Hide password" }));
  expect(password.type).toBe("password");
  expect(
    screen.getByRole("button", { name: "Show password" })
  ).toBeInTheDocument();
});

test("navigates to welcome page with encoded email on valid submit", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(screen.getByLabelText("Email"), "a+b@test.com");
  await user.type(screen.getByLabelText("Password"), "secret");
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  expect(pushMock).toHaveBeenCalledTimes(1);
  expect(pushMock).toHaveBeenCalledWith("/welcome?email=a%2Bb%40test.com");
  expect(
    screen.queryByText("Please enter a valid email address.")
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText("Password cannot be empty.")
  ).not.toBeInTheDocument();
});

