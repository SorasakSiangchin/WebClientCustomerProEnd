import { Address, CreateAddress } from './../../app/models/Address';
import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from '../../app/api/agent';
import { Result } from '../../app/models/Interfaces/IResponse';
import { RootState } from '../../app/store/configureStore';
import { convertToAddressInformations } from '../../app/util/util';

interface AddressState {
    address: Address[] | null;
    addressLoaded: boolean;

};

const initialState: AddressState = {
    address: null,
    addressLoaded: false
};

export const fetchAddressesAsync = createAsyncThunk<Address[], { accountId: any, numRender?: any }>("address/fetchAddressesAsync",
    async ({ accountId, numRender = 0 }, thunkAPI) => {
        try {
            const { result }: Result = await agent.Address.list({ accountId, numRender });
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const createAddressesAsync = createAsyncThunk<any, CreateAddress>("address/createAddressesAsync",
    async (createAddress, thunkAPI) => {
        const data = convertToAddressInformations(createAddress);
        try {
            return await agent.Address.create(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

export const updateAddressesAsync = createAsyncThunk<any, CreateAddress>("address/updateAddressesAsync",
    async (createAddress, thunkAPI) => {
        const data = convertToAddressInformations(createAddress);
        try {
            return await agent.Address.update(data);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

    
const addressAdapter = createEntityAdapter<Address>(); // สรา้งตัวแปรแบบ Adapter

export const addressSlice = createSlice({
    name: "address",
    initialState: addressAdapter.getInitialState(initialState),
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAddressesAsync.fulfilled, (state, action) => {
            addressAdapter.setAll(state, action.payload); // set products
            state.addressLoaded = true;
        });
        builder.addMatcher(isAnyOf(createAddressesAsync.fulfilled , updateAddressesAsync.fulfilled), (state) => {
            state.addressLoaded = false;
        });
    }
});



export const { setAddress } = addressSlice.actions;

export const addressSelectors = addressAdapter.getSelectors((state: RootState) => state.address);

