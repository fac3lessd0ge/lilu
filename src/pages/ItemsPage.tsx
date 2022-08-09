import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card/Card';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';

export const ItemsPage : React.FC = () => {
  const { id } = useParams();
  const [items, setItems] = React.useState<any[] | null>(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(process.env.REACT_APP_BASE_URL + `/items/${id}`);
      return data;
    }

    fetchData().then(data => setItems(data.items));
  }, [])
  
  return (
    <>
      <CardsGrid>
        {items?.map((elem: any) => (
          <Card
            id={elem.id}
            title={elem.title}
            animation={elem?.animation}
            imgUrl={elem.image}
            key={elem.id}
            href={`/item/${elem.id}`}
            price={elem.price}
          />
        ))}
      </CardsGrid>
    </>
  )
}