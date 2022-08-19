import styled from "styled-components";

export const Container = styled.div`
  padding: 80px 60px;
  background-color: #292935;

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  /* background: red; */
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-right: 20px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const ImgDiv = styled.img`
  width: auto;
  @media screen and (max-width: 1100px) {
    width: 150px;
  }
  @media screen and (max-width: 479px) {
    width: 180px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const Link = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    color: #ff9c00;
    transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
