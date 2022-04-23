import { CardContainer } from './styled/div'

function Card({children}) {
  return (
    <CardContainer>
      {children}
    </CardContainer>
  );
}

export default Card
