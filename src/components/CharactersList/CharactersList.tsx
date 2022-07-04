import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetByCharacters } from "../../hooks/useGetByCharacters";
import Character from "../Character/Character";
import styled from "styled-components";
import FilterModal from "../FilterModal/FilterModal";

const CharactersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 50%;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 16px;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  flex-basis: 20%;
  margin-left: 20px;
  margin-top: 155px;
  margin-bottom: 50px;
  font-weight: 600;
  margin-bottom: 48px;
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
    getCharacters({ variables: { page: 1, character: value } });
  }, [getCharacters, value]);

  const onLoadMore = () => {
    getMoreCharacters(currentPage + 1, value);
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
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <FilterDiv>
          <div
            onClick={() => setModalIsOpen((prevState) => !prevState)}
            data-testid="modal-test-button"
          >
            Filter Character &nbsp;&nbsp;
            {value?.length ? value : " All"}
          </div>
        </FilterDiv>
      </div>
      <InfiniteScroll
        dataLength={count}
        next={onLoadMore}
        hasMore={true}
        loader={nextPage !== null ? <h6>Loading...</h6> : <></>}
      >
        <Container>
          {characters?.map((character, index) => (
            <CharactersContainer>
              <Character key={index} {...character} />
            </CharactersContainer>
          ))}
        </Container>
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
