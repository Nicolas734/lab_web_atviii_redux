import styled from "styled-components";
import { useState } from "react";
import { Input, City, Forecast } from "../components";
import { CityProps, WeatherForecastProps } from "../types";
import { loadCity } from "../features/slice";
import { AppDispatch, RootState } from "../features/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Main() {
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState("São José dos Campos");
  const city: CityProps = useSelector( (state:RootState) => state.city);
  // const city: CityProps = {
  //   status: "done",
  //   id: "4963",
  //   name: "São José dos Campos",
  //   uf: "SP",
  // };
  const forecasts:WeatherForecastProps = {
    status: "done",
    updated: "22/05/2023",
    forecasts: [
      { date: "23/05/2023", max: "26", min: "14", iuv: "5.0" },
      { date: "24/05/2023", max: "26", min: "14", iuv: "5.0" },
      { date: "25/05/2023", max: "26", min: "15", iuv: "5.0" },
      { date: "26/05/2023", max: "26", min: "15", iuv: "5.0" },
    ],
  };

  return (
    <WrapperSld>
      <TitleSld>Previsão do Tempo</TitleSld>
      <Input
        value={input}
        set={setInput}
        operation={() => dispatch(loadCity(replace(input)))}
      />
      {city && <City {...city} />}
      {forecasts && <Forecast {...forecasts} />}
    </WrapperSld>
  );
}

function replace(text: string) {
  return text
    .toLowerCase()
    .replaceAll(/ã|á|à|â/g, "a")
    .replaceAll("ç", "c")
    .replaceAll(/é|è|ê/g, "e")
    .replaceAll(/í|ì|î/g, "i")
    .replaceAll(/õ|ô|ó/g, "o")
    .replaceAll(/ú|ü/g, "u");
}

const WrapperSld = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  background-color: #8fbc8f;
  width: 400px;
`;

const TitleSld = styled.h3`
  padding: 10px 0px;
  margin: 10px 0px 0px 0px;
  text-align: center;
  box-sizing: border-box;
`;
