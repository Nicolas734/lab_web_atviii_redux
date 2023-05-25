import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CityProps } from "../types";
import { AppThunk } from "./store";
import { listCities } from "../services/Weather";


const slice = createSlice({
    name:"weather",
    initialState:{
        city:{
            status: "empty",
            id:"",
            name:"",
            uf:""
        } as CityProps,
    },
    reducers:{
        setCity: (state, action: PayloadAction<CityProps>)=>{
             state.city = action.payload
        }
    }
});

export const loadCity =
    (name: string): AppThunk<void> =>
        async (dispatch, getState) => {
            const r = await listCities(name);
            dispatch(setCity({
                status: "loading",
                id:"",
                name:"",
                uf:""
            }))
            console.log(r)
            dispatch(setCity(r))
    };


export const {setCity} = slice.actions;

export default slice.reducer;