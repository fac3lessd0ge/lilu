import * as React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { useGetSuggestedAddressesMutation } from '../../redux/api/address';
import * as Utils from './utils';
import * as S from './FormsStyles';


export const PostVariant = () => {
  const [ getSuggestions, { data }] = useGetSuggestedAddressesMutation()
  const [suggestionsList, setSuggestionsList] = React.useState<any | null>(null);
  
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
    <S.Form onSubmit={handleSubmit(onSubmit)}>

      <S.InputWrapper>
        <S.Label>ФИО *</S.Label>
        <S.TextInput placeholder="Введите ваше ФИО" {...register("name", {
          required: "Поле обязательно к заполнению"
        })} 
        />
        <div>{errors?.name && (<S.ErrorMessage>{errors?.name?.message as FieldError["message"]}</S.ErrorMessage>)}</div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Aдрес *</S.Label>
        <S.TextInput placeholder="Введите ваш адрес" {...register("address", {
          required: "Поле обязательно к заполнению",
          onChange: addressChangeHandler
        })} 
        />
        {!!suggestionsList &&  <S.SuggestionsList>{suggestionsList.map(
            (elem: string, id: number) => 
              <S.Suggestion
                onClick={(e) => {setValue('address', elem); setSuggestionsList(null)}}
              >{elem}</S.Suggestion>
          )}
        </S.SuggestionsList>}
        <div>{errors?.address && (<S.ErrorMessage>{errors?.address?.message as FieldError["message"]}</S.ErrorMessage>)}</div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Номер телефона *</S.Label>
        <S.TelephoneInputMask 
          placeholder='Введите ваш номер телефона'
          mask="+7 (999) 999-99-99" 
          {...register('telephone', {
            required: "Поле обязательно к заполнению",
            pattern: { value: Utils.phonePattern, message: "Введите корректный номер телефона"}
          })}
        />
        <div>{errors?.telephone && (<S.ErrorMessage>{errors?.telephone?.message as FieldError["message"]}</S.ErrorMessage>)}</div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Электронная почта *</S.Label>
        <S.TextInput placeholder="Введите вашу почту" {...register("email", {
          required: "Поле обязательно к заполнению",
          pattern: {value: Utils.emailPattern, message: 'Введите корректный e-mail'}
        })} 
        />
        <div>{errors?.email && (<S.ErrorMessage>{errors?.email?.message as FieldError["message"]}</S.ErrorMessage>)}</div>
      </S.InputWrapper>

      <S.SubmitButton disabled={!isValid} />
    </S.Form>
  )
}