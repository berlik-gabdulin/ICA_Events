import styled from '@emotion/styled';
import { Card, Link } from '@mui/material';
import Button from 'src/components/WebSite/components/Button';
import customTheme from 'src/theme/customTheme';

export const NewsItemWrapper = styled(Card)`
  padding: 0;
  background: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const NewsContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const NewsTitleLink = styled(Link)`
  cursor: pointer;
  font-weight: normal;
  color: ${customTheme.light[100]} !important;
  transition: all 0.3s ease-in-out;
  &:hover {
    text-decoration: none;
    color: ${customTheme.dark[100]} !important;
  }
  h3 {
    font-weight: 300;
    margin: 24px 0 0;
    font-size: 32px;
    line-height: 1.2;
    @media screen and (max-width: 768px) {
      font-size: 28px;
    }
    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  }
`;

export const NewsTitle = styled.h3`
  cursor: pointer;
  font-weight: normal;
  color: ${customTheme.light[100]} !important;
  transition: all 0.3s ease-in-out;
  font-weight: 300;
  margin: 0;
  font-size: 52px;
  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export const NewsItemDate = styled.span`
  display: block;
  font-size: 18px;
  color: #002333;
  margin: 16px 0 24px;
  opacity: 0.6;

  @media screen and (max-width: 768px) {
    margin: 16px 0;
    font-size: 24px;
  }
`;

export const NewsItemText = styled.p`
  margin: 40px 0;
  font-size: 24px;
  font-family: 'Gilroy';
  color: rgb(0, 0, 0);
  line-height: 1.417;
  max-height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 768px) {
    margin: 0;
    font-size: 16px;
  }
`;

export const NewsItemTextFull = styled.div`
  margin: 40px 0;
  font-size: 24px;
  font-family: 'Gilroy';
  color: rgb(0, 0, 0);
  line-height: 1.417;
  @media screen and (max-width: 768px) {
    margin: 0;
    font-size: 16px;
  }
`;

export const NewsButton = styled(Button)`
  margin-top: auto;
  display: inline-block;
  padding: 12px 10px 10px;
  height: 60px;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 40px;
  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
`;
