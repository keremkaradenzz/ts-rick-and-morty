import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const customStyles: any = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "327px",
  },
};

interface IModalProps {
  modalIsOpen: boolean;
  closeModal(): void;
  handleChange(event: React.ChangeEvent): any;
  value: string;
  handleClick():void;
}

// Data filter
enum FilterData {
  RICK = "rick",
  MORTY = "morty",
}

const FilterModal: React.FC<IModalProps> = ({
  modalIsOpen,
  closeModal,
  handleChange,
  value,
  handleClick,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <InputContainer
        style={{ borderBottom: "1px solid black", paddingBottom: 10 }}
      >
        <strong>Filter</strong>
        <button data-testid={'close-modal-button'} onClick={closeModal}>x</button>
      </InputContainer>

      <InputContainer>
        <label>Rick</label>
        <input
          type="radio"
          checked={value === FilterData.RICK}
          name={FilterData.RICK}
          value={value}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <label>Morty</label>
        <input
          type="radio"
          checked={value === FilterData.MORTY}
          name={FilterData.MORTY}
          value={value}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer>
        <button onClick={handleClick}>Clear</button>
      </InputContainer>
    </Modal>
  );
};

export default FilterModal;
