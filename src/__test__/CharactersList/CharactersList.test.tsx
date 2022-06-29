import CharactersList from "../../components/CharactersList/CharactersList";
import { MockedProvider } from "@apollo/client/testing";
import { GET_CHARACTERS } from "../../graphql/queries/queries";
import { screen } from "@testing-library/react";
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
  it("should render a character page", () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CharactersList />
        </MockedProvider>
      );
    });

    const linkElement = screen.getByText(/Filter/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("should request graphql and show loading text", () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CharactersList />
        </MockedProvider>
      );
    });

    const linkElement = screen.getByText(/Loading/i);
    expect(linkElement).toBeInTheDocument();
  });
  it("should render a character page and show data list", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      ReactDOM.createRoot(container).render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CharactersList />
        </MockedProvider>
      );
    });

    await new Promise((resolve) => setTimeout(resolve, 500));
    const linkElement = screen.getByText(/Rick Sanchez/i);
    expect(linkElement).toBeInTheDocument();
  });
});
