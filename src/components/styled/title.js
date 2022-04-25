import styled, { css }from 'styled-components';

const MainTitle = styled.h1`
  text-align: ${(props) => props.ta};
  margin: ${(props) => props.m};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
  
  ${({post}) => 
    post && css`
      &:hover {
        color: var(--primary-color)
      }
    `
  }
`;

const SecondaryTitle = styled.h2`
  text-align: ${(props) => props.ta};
  margin: ${(props) => props.m};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;


const ThirdlyTitle = styled.h3`
  text-align: ${(props) => props.ta};
  margin: ${(props) => props.m};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;

const ForthlyTitle = styled.h4`
  text-align: ${(props) => props.ta};
  margin: ${(props) => props.m};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;

const FifthlyTitle = styled.h5`
  text-align: ${(props) => props.ta};
  margin: ${(props) => props.m};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;


const SixthlyTitle = styled.h6`
  text-align: ${(props) => props.ta};
  margin: ${(props) => props.m};
  color: ${(props) => props.c};
  font-size: ${(props) => props.fs};
  font-weight: ${(props) => props.fw};
`;

export { MainTitle, SecondaryTitle, ThirdlyTitle, ForthlyTitle, FifthlyTitle, SixthlyTitle };
