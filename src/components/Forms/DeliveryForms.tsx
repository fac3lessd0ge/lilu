import * as React from 'react';
import styled from 'styled-components';
import { FieldError, useForm } from 'react-hook-form';
import { useGetSuggestedAddressesMutation } from '../../redux/api/address';

const StyledErrorMessage = styled.p`
  color: #d41f46;
  margin: 0;
  padding: 5px;
  font-weight: 700;
  &::before {
    display: inline;
    content: "⚠ ";
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledTextInput = styled.input.attrs({ type: 'text' })`
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

const StyledLabel = styled.label`
  padding-left: 5px;
  font-weight: 600;
`;

const StyledSubmitButton = styled.input.attrs({ type: 'submit' })`
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;


const StyledSuggestionsList = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  gap: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
`;

const StyledSuggestion = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: rgb(245, 245, 245);
  cursor: pointer;
  font-weight: 700;

  &:active {
    background-color: #f1f1f1;
  }
`;


export const DeliveryForms: React.FC = () => {
  const [ getSuggestions, { data }] = useGetSuggestedAddressesMutation()
  
  const { 
          register,
          setValue,
          handleSubmit, 
          formState: {
            errors,
            isValid 
          } 
        } = useForm({
    mode: 'onBlur'
  });

  const [suggestionsList, setSuggestionsList] = React.useState<any | null>(null);
  
  React.useEffect(() => {
    if (!data) return
    setSuggestionsList(data?.map((elem: any, id: number) => elem.value))
  }, [data]);


  const onSubmit =(data: any) => {
    console.log(data)
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) getSuggestions(e.target.value)
    else setSuggestionsList(null)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>

      <StyledInputWrapper>
        <StyledLabel>ФИО *</StyledLabel>
        <StyledTextInput placeholder="Введите ваше ФИО" {...register("name", {
          required: "Поле обязательно к заполнению"
        })} 
        />
        <div>{errors?.name && (<StyledErrorMessage>{errors?.name?.message as FieldError["message"]}</StyledErrorMessage>)}</div>
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledLabel>Aдрес *</StyledLabel>
        <StyledTextInput placeholder="Введите ваш адрес" {...register("address", {
          required: "Поле обязательно к заполнению",
          onChange: addressChangeHandler
        })} 
        />
        {!!suggestionsList &&  <StyledSuggestionsList>{suggestionsList.map(
            (elem: string, id: number) => 
              <StyledSuggestion
                onClick={(e) => {setValue('address', elem); setSuggestionsList(null)}}
              >{elem}</StyledSuggestion>
          )}
        </StyledSuggestionsList>}
        <div>{errors?.address && (<StyledErrorMessage>{errors?.address?.message as FieldError["message"]}</StyledErrorMessage>)}</div>
      </StyledInputWrapper>

      <StyledInputWrapper>
        <StyledLabel>Электронная почта *</StyledLabel>
        <StyledTextInput placeholder="Введите вашу почту" {...register("email", {
          required: "Поле обязательно к заполнению",
          pattern: {value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Введите корректный e-mail'}
        })} 
        />
        <div>{errors?.email && (<StyledErrorMessage>{errors?.email?.message as FieldError["message"]}</StyledErrorMessage>)}</div>
      </StyledInputWrapper>

      <StyledSubmitButton disabled={!isValid} />
    </StyledForm>
  )
}