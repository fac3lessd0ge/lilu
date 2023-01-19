import * as React from 'react';
import { useForm, FieldError } from 'react-hook-form';
import { useGetSuggestedAddressesMutation } from '../../redux/api/address';
import * as Utils from './utils';
import * as S from './FormsStyles';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectOrderInfo } from '../../redux/selectors';
import {
  setAddress,
  setEmail,
  setFormIsValid,
  setName,
  setPostCode,
  setTelephone,
} from '../../redux/slices/orderInfoSlice';

export const PostVariant = () => {
  const [getSuggestions, { data }] = useGetSuggestedAddressesMutation();
  const [suggestionsList, setSuggestionsList] = React.useState<string[] | null>(
    null
  );

  const { email, telephone, address, name, postCode } =
    useAppSelector(selectOrderInfo);
  const dispatch = useAppDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email,
      telephone,
      address,
      name,
      postCode,
    },
  });

  React.useEffect(() => {
    if (!data) return;
    setSuggestionsList(data?.map((elem: any, id: number) => elem.value));
  }, [data]);

  React.useEffect(() => {
    dispatch(setFormIsValid(isValid));
  }, [isValid]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const addressChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) getSuggestions(e.target.value);
    else setSuggestionsList(null);

    dispatch(setAddress(e.target.value));
  };

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value));
  };

  const postCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPostCode(e.target.value));
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const telephoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTelephone(e.target.value));
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputWrapper>
        <S.Label>Ваше имя и фамилия *</S.Label>
        <S.TextInput
          placeholder="Введите ваше имя и фамилию"
          {...register('name', {
            required: 'Поле обязательно к заполнению',
            onChange: nameChangeHandler,
          })}
        />
        <div>
          {errors?.name && (
            <S.ErrorMessage>
              {errors?.name?.message as FieldError['message']}
            </S.ErrorMessage>
          )}
        </div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Почтовый индекс *</S.Label>
        <S.TextInput
          placeholder="Индекс"
          {...register('postCode', {
            required: 'Поле обязательно к заполнению',
            onChange: postCodeChangeHandler,
            pattern: {
              value: Utils.postCodePattern,
              message: 'Введите корректный индекс',
            },
          })}
        />
        <div>
          {errors?.postCode && (
            <S.ErrorMessage>
              {errors?.postCode?.message as FieldError['message']}
            </S.ErrorMessage>
          )}
        </div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Aдрес *</S.Label>
        <S.TextInput
          placeholder="Введите ваш адрес"
          {...register('address', {
            required: 'Поле обязательно к заполнению',
            onChange: addressChangeHandler,
          })}
        />
        {!!suggestionsList && (
          <S.SuggestionsList>
            {suggestionsList.map((elem: string) => (
              <S.Suggestion
                key={elem}
                onClick={(e) => {
                  setValue('address', elem);
                  setSuggestionsList(null);
                  dispatch(setAddress(elem));
                }}
              >
                {elem}
              </S.Suggestion>
            ))}
          </S.SuggestionsList>
        )}
        <div>
          {errors?.address && (
            <S.ErrorMessage>
              {errors?.address?.message as FieldError['message']}
            </S.ErrorMessage>
          )}
        </div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Номер телефона *</S.Label>
        <S.TelephoneInputMask
          placeholder="Введите ваш номер телефона"
          mask="+7 (999) 999-99-99"
          value={telephone}
          {...register('telephone', {
            onChange: telephoneChangeHandler,
            required: 'Поле обязательно к заполнению',
            pattern: {
              value: Utils.phonePattern,
              message: 'Введите корректный номер телефона',
            },
          })}
        />
        <div>
          {errors?.telephone && (
            <S.ErrorMessage>
              {errors?.telephone?.message as FieldError['message']}
            </S.ErrorMessage>
          )}
        </div>
      </S.InputWrapper>

      <S.InputWrapper>
        <S.Label>Электронная почта *</S.Label>
        <S.TextInput
          placeholder="Введите вашу почту"
          {...register('email', {
            required: 'Поле обязательно к заполнению',
            onChange: emailChangeHandler,
            pattern: {
              value: Utils.emailPattern,
              message: 'Введите корректный e-mail',
            },
          })}
        />
        <div>
          {errors?.email && (
            <S.ErrorMessage>
              {errors?.email?.message as FieldError['message']}
            </S.ErrorMessage>
          )}
        </div>
      </S.InputWrapper>
    </S.Form>
  );
};
