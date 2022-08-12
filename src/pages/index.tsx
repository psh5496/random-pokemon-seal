import styled from "@emotion/styled";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getRandomPokemon } from "../api";
import { fillZero, translateName } from "../util/func";

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
    <Wrapper>
      <PokemonCard>
        <PokeInfoContainer>
          <PokemonNumber>{fillZero(String(data.id), 3)}</PokemonNumber>
          <PokemonName>{translateName(data.id, "ko")}</PokemonName>
        </PokeInfoContainer>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          width={270}
          height={270}
        />
        <LogoContainer>
          <div>
            <Image src={"/images/sticker_logo.png"} width={100} height={30} />
          </div>
        </LogoContainer>
      </PokemonCard>
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

const PokemonCard = styled.div`
  width: 300px;
  height: 390px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

const PokeInfoContainer = styled.div`
  width: fit-content;
  display: flex;
  gap: 8px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  & > p {
    font-size: 20px;
  }
`;

const PokemonNumber = styled.p`
  width: 55px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #d9d9d9;
`;

const PokemonName = styled.p`
  padding-right: 15px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  & > div {
    width: 100px;
    height: 30px;
    border-radius: 20px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  }
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
