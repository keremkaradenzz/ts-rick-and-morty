import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query ($page: Int!, $character: String!) {
    characters(page: $page, filter: { name: $character }) {
      info {
        next
        pages
        prev
        count
      }
      results {
        id
        name
        image
        location {
          name
        }
      }
    }
  }
`;
