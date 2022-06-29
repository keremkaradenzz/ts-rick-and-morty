import Character from "../../components/Character/Character";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Test Characters List page", () => {
  it("should render a character page and show data list", async () => {
    let mockData: any = {
      id: 1,
      name: "Rick Sanchez",
      species: "Human",
      image: "",
      type: "",
      location: {
        name: "Citadel of Ricks",
      },
      status: "",
      gender: "",
      origin: "",
      episode: "",
    };
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(<Character {...mockData} />);
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    const linkElement = screen.getByText(/Rick Sanchez/i);
    expect(linkElement).toBeInTheDocument();
  });
});
