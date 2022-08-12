import styled from "@emotion/styled";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import { getRandomPokemon } from "../api";
import PokemonSeal from "../components/PokemonSeal";

const Home: NextPage = () => {
  const { data, status, refetch } = useQuery(
    ["pokemon"],
    () => getRandomPokemon(),
    {
      staleTime: 3000,
    }
  );

  if (status === "loading") return <>로딩 중...</>;

  if (status === "error") return <>문제가 발생했습니다.</>;

  return (
    <Wrapper>
      <PokemonSeal />
      <button onClick={() => refetch()}>reload</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 100px;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["pokemon"], () => getRandomPokemon());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
