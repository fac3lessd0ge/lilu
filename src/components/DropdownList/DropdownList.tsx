import * as React from 'react';
import styled from 'styled-components';

const StyledVariantsList = styled.ul`
  box-shadow: 0px 2px 10px #0007;
  border-radius: 5px;
  list-style: none;
  width: 100%;
  text-align: center;
  padding-left: 0;
  position: absolute;
  background-color: #fff;
  padding: 5px;
`;

const ListThumbnail = styled.span`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &:hover {
    span {
      border: 2px solid black;
    }
  }
`;

const ChosenText = styled.span`
  font-weight: 700;
  background-color: #eee;
  border-radius: 10px;
  padding: 2px 10px;
  line-height: 2;
  border: 2px solid white;
  transition: border 0.1s ease-in;

  &::after {
    content: ' \u25bc';
    font-size: 14px;
  }
`;

const StyledListItem = styled.li`
  line-height: 2;
  border-radius: 2.5px;
  font-weight: 700;

  &:hover {
    background-color: #ccca;
  }
`;

const ListContainer = styled.div`
  position: relative;
  min-width: 230px;
`;

interface IDropDownList {
  variants: string[],
  additionalThumbnailString?: string
  onSelect?: React.Dispatch<React.SetStateAction<number>> | Function
}

export const DropDownList : React.FC<IDropDownList> = (
    {
      variants, 
      onSelect,
      additionalThumbnailString
    }
  ) => {
  const [selected, setSelected] = React.useState(0);
  const [popupVisible, setPopupVisible] = React.useState<boolean>(false);
  const variantRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const handler = (e: Event) => {
      if (
        variantRef.current &&
        !e.composedPath().includes(variantRef.current)
      ) {
        setPopupVisible(false);
      }
    };

    document.body.addEventListener('click', handler);

    return () => {
      document.body.removeEventListener('click', handler);
    };
  }, []);

  return (
    <ListContainer ref={variantRef}>
      <ListThumbnail
        onClick={() => setPopupVisible(true)}
      >
        Выбор типа {additionalThumbnailString}: <ChosenText>{variants[selected]}</ChosenText>
      </ListThumbnail>
      {popupVisible && <StyledVariantsList>
        {variants.map((elem, id) => {
          return (
            <StyledListItem
              key={elem} 
              onClick={() => {setSelected(id); setPopupVisible(false); (onSelect && onSelect(id));}}
            >
              {elem}
            </StyledListItem>
          )
        })}
      </StyledVariantsList>}
    </ListContainer>
  )
}