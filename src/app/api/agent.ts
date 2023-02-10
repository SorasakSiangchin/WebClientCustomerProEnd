import { value } from './../../features/account/accountSlice';
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { PaginatedResponse } from "../models/Pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;

//ให้เครดิตความน่าเชื่อถือ ขออนุญาติเข้าถึง cookies
axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 100));

const responseBody = (response: AxiosResponse) => response.data; //ให้ส่งข้อมูลออกไป

// ส่ง token แบบ auto
axios.interceptors.request.use((config: any) => {
    const token = store.getState().account.token; //เรียกใช้ State โดยตรง
    // แนบ token ไปกับ Header
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(async response => {
    if (import.meta.env.NODE_ENV === 'development') await sleep();

    /* #region เมื่อมีการส่ง pagination มาจาก header */
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    /* #endregion */

    return response
}, async (error: AxiosError) => {
    const { status } = error.response!;
    const { message } = error!;
    switch (status) {
        case 400:
            toast.error(message);
            break;
        case 401:
            toast.error(message);
            break;
        case 403:
            toast.error(message);
            break;
        case 500:
            toast.error(message);
            break;
        default:
            break;
    };
    return Promise.reject(error.response) //ส่งไปให้ catch(error) นำไปใช้ได้เลย
});

const createFormData = (item: any) => {
    let formData = new FormData();
    for (const key in item) formData.append(key, item[key]);
    return formData;
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Product = {
    list: (params: any) => requests.post('products', params),
    getName: (nameProduct : any) => requests.get(`product/name?name=${nameProduct}`),
    getRares: () => requests.get('product/rare'),
    detail: (idProduct: string) => requests.get(`product/${idProduct}`),
    delete: (idProduct: string) => requests.delete(`product/${idProduct}`),
    create:(value: any) => requests.post("product", createFormData(value)),
    update:(value: any) => requests.put("product", createFormData(value)),
};

const CategoryProduct = {
    list: () => requests.get('category/products'),
};

const Account = {
    login: (value: any) => requests.post('login', createFormData(value)),
    register: (value: any) => requests.post('register', createFormData(value)),
    currentAccount: (idAccount : any) => requests.get(`account/${idAccount}`), // ข้อมูลคนปัจจุบัน
    update: (value: any) => requests.put("account", createFormData(value)),
    updatePassword: (value: any) => requests.put("account/password", createFormData(value)),
};

const Cart = {
    get: (accountId: string) => requests.get(`cart/${accountId}`),
    addItem: (value: any) => requests.post("cart/addItem", value),
    removeItem: (value: any) => requests.post("cart/removeItem", value),
};

const Order = {
    getIdAccount: (value: any) => requests.post(`/orders/accountId`,value),
}

const Role = {
    list: () => requests.get('roles'),
};

const WeightUnit = {
    list: () => requests.get('weightUnits'),
};

const LevelProduct = {
    list : () => requests.get('levelProducts'),
}

const DetailProduct = {
    getByIdProduct : (idProduct: any) => requests.get(`detailProduct/idProduct?idProduct=${idProduct}`),
    create : (value: any) => requests.post("detailProduct" , value),
    update : (value: any) => requests.put("detailProduct" , value),
}

const ImageProduct = {
    get: (idProduct: any) => requests.get(`imageproduct/${idProduct}`),
    create: (value: any) => requests.post("imageproduct" , createFormData(value)),
    delete: (idProduct: any) => requests.delete(`imageproduct/${idProduct}`)
};

const Address = {
    list: (value : any) => requests.get(`addresses?accountId=${value.accountId}&numRender=${value.numRender}`),
    create :  (value : any) => requests.post("address" , value) ,
    update :  (value : any) => requests.put("address" , value) ,
    updateStatus :  (value : any) => requests.put("address/status" , value) ,
    delete :  (id : any) => requests.delete(`address/${id}`) ,
}

const agent = {
    Product,
    Account,
    Role,
    CategoryProduct,
    Cart,
    ImageProduct ,
    Address ,
    Order ,
    WeightUnit  ,
    LevelProduct ,
    DetailProduct
};

export default agent;

