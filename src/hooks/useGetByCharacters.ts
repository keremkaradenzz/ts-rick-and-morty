import { useLazyQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries/queries";
import { Character } from "../types/ICharacter";

export interface GetCharactersQueryResponse {
  characters: {
    results: Character[];
    info: {
      count: number;
      pages: number;
      prev: number | null;
      next: number | null;
    };
  };
}

interface ICharacterProps {
  characters: Character[] | undefined;
  count: number;
  currentPage: number;
  nextPage: number | null;
  getCharacters: (payload: {
    variables: { page: number; character: string };
  }) => any;
  getMoreCharacters: (page: number, character: string) => any;
}

export const useGetByCharacters = (): ICharacterProps => {
  const [getCharacters, { data, fetchMore }] =
    useLazyQuery<GetCharactersQueryResponse>(GET_CHARACTERS);
  const nextPage = data?.characters?.info?.next ?? 0;
  const prevPage = data?.characters?.info?.prev ?? 0;
  const currentPage = prevPage ? prevPage + 1 : 1;
  const getMoreCharacters = (page: number, character: string) => {
    fetchMore({
      variables: { page, character },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          characters: {
            __typename: "Characters",
            info: { ...fetchMoreResult.characters.info },
            results: [
              ...prev.characters.results,
              ...fetchMoreResult.characters.results,
            ],
          },
        };
      },
    });
  };

  return {
    characters: data?.characters?.results,
    nextPage,
    currentPage,
    getCharacters,
    getMoreCharacters,
    count: data?.characters?.results?.length ?? 0,
  };
};
