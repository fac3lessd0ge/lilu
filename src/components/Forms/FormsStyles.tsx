import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const ErrorMessage = styled.p`
  color: #d41f46;
  margin: 0;
  padding: 5px;
  font-weight: 700;
  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TextInput = styled.input.attrs({ type: 'text' })`
  font-size: 16px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #ccc3;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  font-size: 14px;
  outline: none;
  font-weight: 600;
`;

export const Label = styled.label`
  padding-left: 5px;
  font-weight: 600;
`;

export const SubmitButton = styled.input.attrs({ type: 'submit', value: 'Продолжить' })`
  background-color: var(--buttonColor);
  border: none;
  padding: 10px 15px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  transition: all 0.1s ease;

  &:active {
    transform: translateY(3px);
  }

  &:disabled {
    background-color: #ccc;
    transform: none;
  }

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const TelephoneInputMask = styled(InputMask)`
  font-size: 16px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  border: 2px solid #ccc3;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 15px;
  font-size: 14px;
  outline: none;
  font-weight: 600;
`;

export const SuggestionsList = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  gap: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

export const Suggestion = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: rgb(245, 245, 245);
  cursor: pointer;
  font-weight: 700;

  &:active {
    background-color: #f1f1f1;
  }
`;