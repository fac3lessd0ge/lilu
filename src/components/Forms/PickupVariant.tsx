import * as React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import * as Utils from './utils';
import * as S from './FormsStyles';

export const PickupVariant = () => {
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

const onSubmit =(data: any) => {
  console.log(data)
};
  
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
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