import Head from "next/head";
import Slider from "../components/Slider/Slider";
import data from '../mockData';
import { GetStaticProps } from 'next';

export type Card = {
  id: number,
  types: string,
  img: string,
  title: string,
  date: string
};

export const getStaticProps: GetStaticProps = (context) => {
  const cardList = data as Card[];
  return {
    props: {cardList},
  }
};

const Index = ({cardList}: {cardList: Card[]}) => {
    return (
      <>
        <Head>
          <meta name="title" content="Тестовое задание"/>
        </Head>
        <div className="text">
          <h1>Полезные материалы</h1>
          <p>Собрали для вас полезные исследования схемы кормления и другие материалы, которые пригодятся для лучших результатов на вашем хозяйстве</p>
        </div>
        <Slider cardList={cardList}/>
      </>
    );
  };
  export default Index;