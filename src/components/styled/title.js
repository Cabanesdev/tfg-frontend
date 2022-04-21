import styled from 'styled-components';

const MainTitle = styled.h1`
  text-align: ${(props) => props.ta};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;

const SecondaryTitle = styled.h2`
  text-align: ${(props) => props.ta};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;

export { MainTitle, SecondaryTitle };