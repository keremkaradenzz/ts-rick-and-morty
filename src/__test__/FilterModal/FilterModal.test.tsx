import CharactersList from "../../components/CharactersList/CharactersList";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CHARACTERS } from "../../graphql/queries/queries";
import { screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom/client";

let container: any;
const mocks: any = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: {
        page: 1,
        character: "",
      },
    },
    result: {
      data: {
        characters: {
          info: {
            count: 107,
            prev: null,
            next: 2,
            pages: 6,
          },
          results: [
            {
              id: 1,
              name: "Rick Sanchez",
              species: "Human",
              image: "",
              type: "",
              location: {
                name: "Citadel of Ricks",
              },
            },
            {
              id: 2,
              name: "Morty Sanchez",
              species: "Human",
              image: "",
              type: "",
              location: {
                name: "Citadel of Ricks",
              },
            },
          ],
        },
      },
    },
  },
];

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Test Characters List page", () => {
  it("should render a character page and open modal", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CharactersList />
        </MockedProvider>
      );
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    const buttonElement = screen.getByTestId("modal-test-button");
    buttonElement.click();
    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).not.toBeNull();
    });
  });

  it("should render a character page and opening modal then close modal", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CharactersList />
        </MockedProvider>
      );
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    const buttonElement = screen.getByTestId("modal-test-button");
    buttonElement.click();
    await waitFor(async () => {
      screen.getByRole("dialog");
      const closeBtn = screen.getByTestId("close-modal-button");
      closeBtn.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      expect(closeBtn).not.toBeVisible();
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act
  });
});
