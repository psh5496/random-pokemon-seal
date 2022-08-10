import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getRandomPokemon } from "../api";

const Home: NextPage = () => {
  const { data, isLoading, error, refetch } = useQuery(
    ["pokemon"],
    () => getRandomPokemon(),
    {
      staleTime: 3000,
    }
  );

  if (isLoading) return <>로딩 중...</>;

  if (error) return <>문제가 발생했습니다.</>;

  return (
    <div>
      <h1>{data.name}</h1>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
        width={300}
        height={300}
      />
      <button onClick={() => refetch()}>dsa</button>
    </div>
  );
};

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
