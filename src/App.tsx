import React from "react";
import styled from "styled-components";
import CharactersList from "./components/CharactersList/CharactersList";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const App: React.FC = () => {
  return (
    <AppContainer>
      <CharactersList />
    </AppContainer>
  );
};

export default App;
