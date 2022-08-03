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

export const CategoriesPage: React.FC = () => {
  const [sdata, setsData] = React.useState<any>(null);
  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + '/categories')
      .then(({ data }) => {
        setsData(data[0].animation);
        console.log(data);
        
      })
      .then(() => console.log(sdata))
  }, [])

  return (
		<>
			<CardsGrid>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((elem) => (
					<TestCard key={elem}>
						<Lottie
              speed={0.5}
              onLoopComplete={() => setPlay(false)}
              onClick={() => setPlay(() => !play)}
							animationData={sdata}
							play={play}
							style={{ width: 64, height: 64 }}
						/>
					</TestCard>
				))}
			</CardsGrid>
		</>
  );
}