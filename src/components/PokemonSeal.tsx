import styled from "@emotion/styled";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { COLOR_BY_POKE_TYPE } from "../constants";
import { fillZero, translateName } from "../util/func";

const PokemonSeal = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<any>(["pokemon"]);

  return (
    <PokemonCard>
      <PokeInfoContainer>
        <PokemonNumber type={data.types[0].type.name}>
          {fillZero(String(data.id), 3)}
        </PokemonNumber>
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
  );
};

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

const PokemonNumber = styled.p<{ type: string }>`
  width: 55px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props) => COLOR_BY_POKE_TYPE[props.type]};
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

export default PokemonSeal;
