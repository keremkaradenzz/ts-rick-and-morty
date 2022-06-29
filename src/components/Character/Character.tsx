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
  margin-left: 40px;
  margin-right: 40px;
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

const TextDiv = styled.div`
  margin-top: 16px;
  margin-left: 16px;
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
        <TextDiv>
          <strong>#id : </strong>
          <span style={{ color: "#808080" }}>{id}</span>
        </TextDiv>
        <TextDiv>
          <div>
            <strong>Name : </strong>
            <span style={{ color: "#808080" }}>{name}</span>
          </div>
          <div style={{ marginTop: 11, marginBottom: 19 }}>
            <strong>Location :</strong>{" "}
            <span style={{ color: "#808080" }}>{location.name}</span>
          </div>
        </TextDiv>
      </DetailContainer>
    </CharacterContainer>
  );
};

export default Character;
