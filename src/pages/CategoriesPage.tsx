import * as React from 'react';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import axios from 'axios';
import { Card } from '../components/Card/Card';


export const CategoriesPage: React.FC = () => {
  const [sdata, setsData] = React.useState<any>(null);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + '/categories')
      .then(({ data }) => {
        setsData(data);
        console.log(data);
        
      })
  }, [])

  return (
		<>
			<CardsGrid>
				{sdata?.map((elem: any) => (
					<Card
            id={elem.id}
            title={elem.title}
            animation={elem.animation}
            key={elem.id}
            href={`/category/${elem.id}`}
          />
				))}
			</CardsGrid>
		</>
  );
}