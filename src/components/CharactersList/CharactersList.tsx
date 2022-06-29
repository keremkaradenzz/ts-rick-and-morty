import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetByCharacters } from "../../hooks/useGetByCharacters";
import Character from "../Character/Character";
import styled from "styled-components";
import FilterModal from "../FilterModal/FilterModal";

const CharactersContainer = styled.div`
  flex-wrap: wrap;
  flex-direction: row;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharactersList: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const {
    characters,
    count,
    currentPage,
    nextPage,
    getCharacters,
    getMoreCharacters,
  } = useGetByCharacters();

  useEffect(() => {
    getCharacters({ variables: { page: 1, character: "" } });
  }, [getCharacters]);

  const onLoadMore = (character = "") => {
    getMoreCharacters(currentPage + 1, character);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.name);
    getCharacters({ variables: { page: 1, character: event.target.name } });
    setModalIsOpen(false);
  };

  const handleClick = () => {
    setValue("");
    getCharacters({ variables: { page: 1, character: "" } });
    setModalIsOpen(false);
  };
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{ margin: '30px', display: "flex", justifyContent:'center' }}
        onClick={() => setModalIsOpen((prevState) => !prevState)}
        data-testid='modal-test-button'
      >
        Filter Character &nbsp;&nbsp;
        {value?.length  ? value : ' All'}
      </div>
      <InfiniteScroll
        dataLength={count}
        next={onLoadMore}
        hasMore={true}
        loader={nextPage !== null ? <h6>Loading...</h6> : <></>}
      >
        <CharactersContainer>
          {characters?.map((character, index) => (
            <Character key={index} {...character} />
          ))}
        </CharactersContainer>
      </InfiniteScroll>
      {modalIsOpen && (
        <FilterModal
          modalIsOpen={modalIsOpen}
          handleClick={handleClick}
          closeModal={closeModal}
          value={value}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default CharactersList;
