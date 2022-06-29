import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 13px;
  font-size: 19px;
  &:last-child {
    margin-bottom: 10px;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin: 0;
    transform: translateY(-0.075em);
    background: #c4c4c4;
    display: grid;
    place-content: center;
  }
  input::before {
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
  }
  input[type="radio"]:checked::before {
    transform: scale(1);
    background-color: #0057ff;
  }
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
    padding: 0,
    overflow: "hidden",
  },
};

interface IModalProps {
  modalIsOpen: boolean;
  closeModal(): void;
  handleChange(event: React.ChangeEvent): any;
  value: string;
  handleClick(): void;
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
        style={{ borderBottom: "0.5px solid #808080", paddingBottom: 5 }}
      >
        <div
          style={{
            paddingTop: 13,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginLeft: 16,
            marginRight: 16,
          }}
        >
          <strong>Filter</strong>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              marginBottom: 2,
            }}
            data-testid={"close-modal-button"}
            onClick={closeModal}
          >
            x
          </button>
        </div>
      </InputContainer>

      <InputContainer style={{ marginLeft: 16 }}>
        <label>Rick</label>
        <input
          style={{ marginRight: 32 }}
          type="radio"
          checked={value === FilterData.RICK}
          name={FilterData.RICK}
          value={value}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer style={{ marginLeft: 16 }}>
        <label>Morty</label>
        <input
          style={{ marginRight: 32 }}
          type="radio"
          checked={value === FilterData.MORTY}
          name={FilterData.MORTY}
          value={value}
          onChange={handleChange}
        />
      </InputContainer>
      <InputContainer style={{ marginLeft: 8}}>
        <button
          style={{ border: "none", background: "transparent", color:'#060606' }}
          onClick={handleClick}
        >
          Clear
        </button>
      </InputContainer>
    </Modal>
  );
};

export default FilterModal;
