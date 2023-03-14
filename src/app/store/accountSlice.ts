import { Result } from './../../app/models/Interfaces/IResponse';
import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Account, AccountParams, GoogleLoginRequest } from "../../app/models/Account";
import { Role } from "../../app/models/Role";
import { Login, Register } from '../../app/models/Interfaces/IAccount';
import { setCart } from '../../app/store/cartSlice';
import { RootState } from './configureStore';
import { MetaData } from '../models/Pagination';

export const value = { stats: true, firstName: "", lastName: "", email: "", password: "", phoneNumber: "", roleID: "", formFiles: File };

interface AccountState {
    account: Account | null;
    accounts: Account[] | null;
    accountsLoaded: boolean;
    roleData: Role[] | null;
    token: string | null;
    tokenExpirationDate: Date | null;
    statusLogin: string | null;
    metaData: MetaData | null;
    accountParams: AccountParams;
};

const initParams = (): AccountParams => {
    return {
        pageNumber: 1,
        pageSize: 10,
        searchEmail: "",
        searchName: "",
        searchPhoneNumber: "",
        status: ""
    }
};

export interface setUp {
    account: Account;
    token: string;
    expirationDate?: Date;
};

export const loadAccountStorage = () => JSON.parse(localStorage.getItem('account')!);

export const statusLogin = () => localStorage.getItem("statusLogin");

export const loginAccount = createAsyncThunk<any, Login>(
    'account/loginAccount',
    async (data, thunkAPI) => {
        try {
            const result = await agent.Account.login(data);
            const { ...payload } = result;
            if (payload.result) {
                const token = payload.result.token;
                const account = payload.result.account;
                const cart = payload.result.cart;
                thunkAPI.dispatch(setCart(cart));
                thunkAPI.dispatch(setTing({ account: account, token: token } as setUp));
            }
            return payload;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const googleLoginAccount = createAsyncThunk<any, GoogleLoginRequest>(
    'account/googleLoginAccount',
    async (data, thunkAPI) => {
        try {
            const result = await agent.Account.googleLogin(data);
            const { ...payload } = result;
            if (payload.result) {
                const token = payload.result.token;
                const account = payload.result.account;
                const cart = payload.result.cart;
                thunkAPI.dispatch(setCart(cart));
                thunkAPI.dispatch(setTing({ account: account, token: token } as setUp));
            }
            return payload;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const registerAccount = createAsyncThunk<any, Register>(
    'account/registerAccount',
    async (data, thunkAPI) => {
        try {
            const result = await agent.Account.register(data);
            const { ...payload } = result;
            return payload;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updateAccountAsync = createAsyncThunk("account/updateAccountAsync",
    async (_, thunkAPI) => {
        try {
            const { result }: Result = await agent.Role.list();
            thunkAPI.dispatch(setRoleData(result));
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchRolesAsync = createAsyncThunk(
    'account/fetchRoles',
    async (_, thunkAPI) => {
        try {
            const { result }: Result = await agent.Role.list();
            thunkAPI.dispatch(setRoleData(result));
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchCurrentAccount = createAsyncThunk<Account>(
    'account/fetchCurrentAccount',
    async (_, thunkAPI) => {
        const account = loadAccountStorage();
        thunkAPI.dispatch(setAccount(account));
        const status = statusLogin();
        try {
            const { result } = await agent.Account.currentAccount(account.account.id);
            localStorage.setItem('account', JSON.stringify({ ...account, account: result }));
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        };
    },
    {
        condition: () => {
            if (!localStorage.getItem('account')) return false;
        }
    }
);

export const fetchAccountsAsync = createAsyncThunk<Result, void, { state: RootState }>(
    'account/fetchAccountsAsync',
    async (_, thunkAPI) => {
        const params = thunkAPI.getState().account.accountParams;
        try {
            const { items, metaData } = await agent.Account.list(params);
            thunkAPI.dispatch(setMetaData(metaData));
            return items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        };
    },
    {
        condition: () => {
            // ถ้าเป็นจริงจะไปทำที่ backEnd
            if (!localStorage.getItem('account')) return false;
        }
    }
);

export const fetchAccountAsync = createAsyncThunk<Result, any>(
    'account/fetchAccountAsync',
    async (accountId, thunkAPI) => {
        try {
            const result: Result = await agent.Account.currentAccount(accountId);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        };
    }
);

const accountAdapter = createEntityAdapter<Account>();

export const accountSlice = createSlice({
    name: "account",
    initialState: accountAdapter.getInitialState<AccountState>({
        account: null,
        roleData: null,
        token: null,
        tokenExpirationDate: null,
        statusLogin: null,
        accounts: null,
        accountsLoaded: false,
        accountParams: initParams(),
        metaData: null
    }),
    reducers: {
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setParams: (state, action) => {
            state.accountsLoaded = false;
            state.accountParams = { ...state.accountParams, ...action.payload };
        },
        setRoleData: (state, action) => {
            state.roleData = action.payload;
        },
        setAccount: (state, action) => {
            state.account = action.payload.account;
            if (action.payload.token) state.token = action.payload.token;
        },
        setTing: (state, action) => {
            const { account, token, expirationDate } = action.payload;
            // const tokenExpirationDate =
            //     expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
            // state.tokenExpirationDate = tokenExpirationDate;
            localStorage.setItem(
                "account",
                JSON.stringify({
                    account: account,
                    token: token,
                    // expiration: formatDate(tokenExpirationDate), // toISOString สามารถแปลงกลับมาเป็นวันที่ได้
                })
            );
        },
        logout: (state) => {
            state.token = null;
            state.tokenExpirationDate = null;
            state.account = null;
            localStorage.removeItem("account");
        },
        setStatusLogin: () => {
            localStorage.setItem("statusLogin", "google");
        },
        reSetStatusLogin: () => {
            localStorage.removeItem("statusLogin");
        },
        resetParams: (state) => {
            state.accountsLoaded = false;
            state.accountParams = initParams()
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchAccountsAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                accountAdapter.setAll(state, result); // set products
                state.accountsLoaded = true;
            };
        });
        builder.addCase(fetchAccountAsync.fulfilled, (state, action) => {
            const { isSuccess, result, statusCode } = action.payload;
            if (isSuccess === true && statusCode === 200) {
                accountAdapter.upsertOne(state, result);
                console.log(result)
            };
        });
        builder.addMatcher(isAnyOf(loginAccount.fulfilled, googleLoginAccount.fulfilled), (state, action) => {
            if (action.payload.result) {
                state.account = action.payload.result.account;
                state.token = action.payload.result.token;
            };
        });
    })
});

export const { resetParams, setMetaData, setParams, setRoleData, logout, setAccount, setStatusLogin, reSetStatusLogin, setTing } = accountSlice.actions;

export const accountSelectors = accountAdapter.getSelectors((state: RootState) => state.account); 