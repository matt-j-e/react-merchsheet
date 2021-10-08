import Styled from "styled-components";

export const ToursWrapper = Styled.section`
  padding: 2rem;
`;

export const Heading = Styled.h2`
  font-weight: 100;
  font-size: 3rem;
  color: var(--lightgrey);
  border-bottom: 1px solid var(--lightgrey);
`;

export const ToursList = Styled.ul`
  list-style-type: none;
  padding: 2rem 0;
  margin: 0;
  font-size: 1.2rem;

  li {
    padding: 0.3rem 0;

    a {
      color: inherit;
      text-decoration: none;
    }
  }
`;