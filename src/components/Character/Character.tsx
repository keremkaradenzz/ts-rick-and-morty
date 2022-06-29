import React from "react";
import { Character as ICharacter } from "../../types/ICharacter";
import styled from "styled-components";

const CharacterContainer = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 10px 10px 10px 10px;
  height: 168px;
  max-width: calc(168px + 362px);
  -webkit-box-shadow: 6px 5px 10px 4px rgba(222, 222, 222, 0.65);
  -moz-box-shadow: 6px 5px 10px 4px rgba(222, 222, 222, 0.65);
  box-shadow: 6px 5px 10px 4px rgba(222, 222, 222, 0.65);
  margin-bottom: 48px;
  margin-left: 80px;
`;

const ImageContainer = styled.div`
  width: 168px;
`;
const DetailContainer = styled.div`
  width: 362px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px;
`;

const Character: React.FC<ICharacter> = ({ id, name, image, location }) => {
  return (
    <CharacterContainer>
      <ImageContainer>
        <img
          style={{ borderRadius: "10px 0 0 10px" }}
          src={image}
          alt={name}
          width={168}
          height={168}
        />
      </ImageContainer>
      <DetailContainer>
        <div>
          <strong>#id : </strong> {id}
        </div>
        <div>
          <div>
            <strong>Name : </strong>
            {name}
          </div>
          <div>
            <strong>Location :</strong> {location.name}
          </div>
        </div>
      </DetailContainer>
    </CharacterContainer>
  );
};

export default Character;
