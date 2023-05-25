import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityProps, ForecastProps, WeatherForecastProps } from "../types";
import { AppThunk } from "./store";
import { listCities, weatherForest } from "../services/Weather";


const slice = createSlice({
    name:"weather",
    initialState:{
        city:{
            status: "empty",
            id:"",
            name:"",
            uf:""
        } as CityProps,
        forecasts:{
            status: "empty",
            updated: "",
            forecasts: [] as ForecastProps[]
        } as WeatherForecastProps ,
    },
    reducers:{
        setCity: (state, action: PayloadAction<CityProps>)=>{
            state.city = action.payload
        },
        setForecast: (state, action:  PayloadAction<WeatherForecastProps>) => {
            state.forecasts = action.payload;
        }
    }
});

export const loadCity =
    (name: string): AppThunk<void> =>
        async (dispatch, getState) => {
            const res = await listCities(name);
            dispatch(setCity({
                status: "loading",
                id:"",
                name:"",
                uf:""
            }))
            console.log(res)
            laodForecast('1')
            dispatch(setCity(res))
            dispatch(setForecast({
                    status: "loading",
                    updated: "",
                    forecasts: []
                }))
            const previsions = await weatherForest(res.id);
            console.log(previsions)
            laodForecast('1')
            dispatch(setForecast(previsions))
    };


const laodForecast = (id: string): AppThunk<void> => 
    async (dispatch, getStat) => {
        const previsions = await weatherForest(id);
        dispatch(setForecast({
                status: "loading",
                updated: "",
                forecasts: []
            }))
        dispatch(setForecast(previsions))

    }



export const {setCity} = slice.actions;
export const {setForecast} = slice.actions;

export default slice.reducer;