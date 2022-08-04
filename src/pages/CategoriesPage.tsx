import * as React from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie-player';
import { CardsGrid } from '../components/CardsGrid/CardsGrid';
import axios from 'axios';

const TestCard = styled.div`
  background-color: #EDE1ED;
  min-height: 170px;
  min-width: 140px;
  max-width: 250px;
  height: 100%;
  width: 100%;
  border-radius: 10px;
`;

const StyledCardTitle = styled.h2`
  width: 100%;
  text-align: center;
`;

export const CategoriesPage: React.FC = () => {
  const [sdata, setsData] = React.useState<any>(null);
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + '/categories')
      .then(({ data }) => {
        setsData(data);
        console.log(data);
        
      })
      .then(() => console.log(sdata))
  }, [])

  return (
		<>
			<CardsGrid>
				{sdata?.map((elem: any) => (
					<TestCard key={elem.id}>
						<Lottie
              loop
							animationData={elem.animation}
							play
							style={{ width: '100%', maxHeight: 150, height: 150 }}
						/>
            <StyledCardTitle>{elem.title}</StyledCardTitle>
					</TestCard>
				))}
			</CardsGrid>
		</>
  );
}