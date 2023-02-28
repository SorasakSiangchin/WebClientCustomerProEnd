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
    getName: (nameProduct: any) => requests.get(`product/name?name=${nameProduct}`),
    getRares: () => requests.get('product/rare'),
    getByIdAccount: (idAccount: any) => requests.get(`product/accountId?accountId=${idAccount}`),
    detail: (idProduct: string) => requests.get(`product/${idProduct}`),
    delete: (idProduct: string) => requests.delete(`product/${idProduct}`),
    create: (value: any) => requests.post("product", createFormData(value)),
    update: (value: any) => requests.put("product", createFormData(value)),
};

const CategoryProduct = {
    list: () => requests.get('category/products'),
};

const Account = {
    login: (value: any) => requests.post('login', createFormData(value)),
    register: (value: any) => requests.post('register', createFormData(value)),
    currentAccount: (value: any) => requests.get(`account/${value.accountId}?statusLogin=${value.statusLogin ? value.statusLogin : ""}`), // ข้อมูลคนปัจจุบัน
    update: (value: any) => requests.put("account", createFormData(value))
    ,
    updatePassword: (value: any) => requests.put("account/password", createFormData(value)),
    googleLogin: (value: any) => requests.post("googleLogin", value),
    list: () => requests.get('account'),
};

const Cart = {
    get: (accountId: string) => requests.get(`cart/${accountId}`),
    addItem: (value: any) => requests.post("cart/addItem", value),
    removeItem: (value: any) => requests.post("cart/removeItem", value),
};

const Order = {
    getIdAccount: (value: any) => requests.post(`/orders/accountId`, value),
    create: (value: any) => requests.post(`order`, value),
    update: (value: any) => requests.put(`order`, value),
    getByIdAccount: (accountId: any) => requests.get(`orders/accountId?accountId=${accountId}`),
    detail: (idOrder: any) => requests.get(`order/${idOrder}`),
    list: (params: any) => requests.post('orders', params),
};

const StatusDelivery = {
    list: () => requests.get('statusDeliverys'),
}

const Role = {
    list: () => requests.get('roles'),
};

const WeightUnit = {
    list: () => requests.get('weightUnits'),
};

const LevelProduct = {
    list: () => requests.get('levelProducts'),
}

const DetailProduct = {
    getByIdProduct: (idProduct: any) => requests.get(`detailProduct/idProduct?idProduct=${idProduct}`),
    create: (value: any) => requests.post("detailProduct", value),
    update: (value: any) => requests.put("detailProduct", value),
    delete: (idProduct: any) => requests.delete(`detailProduct/${idProduct}`)
}

const ImageProduct = {
    get: (idProduct: any) => requests.get(`imageproduct/${idProduct}`),
    create: (value: any) => requests.post("imageproduct", createFormData(value)),
    delete: (idProduct: any) => requests.delete(`imageproduct/${idProduct}`)
};

const Address = {
    list: (value: any) => requests.get(`addresses?accountId=${value.accountId}&numRender=${value.numRender}`),
    create: (value: any) => requests.post("address", value),
    update: (value: any) => requests.put("address", value),
    updateStatus: (value: any) => requests.put("address/status", value),
    delete: (id: any) => requests.delete(`address/${id}`),
}

const EvidenceMoneyTransfer = {
    create: (value: any) => requests.post("evidenceMoneyTransfer", createFormData(value)),
    get: (orderId: any) => requests.get(`evidenceMoneyTransfer/orderId?orderId=${orderId}`),
    getCancel: (orderId: any) => requests.get(`evidenceMoneyTransfer/cancel?orderId=${orderId}`),
    update: (value: any) => requests.put("evidenceMoneyTransfer", value),
}

const Report = {
    getProductStatistics: (value: any) => requests.post("report/productStatistics", createFormData(value)),
    getSalesStatistics: (value: any) => requests.post("report/salesStatistics", createFormData(value)),
}

const Delivery = {
    getByIdOrder: (orderId: any) => requests.get(`delivery/orderId?orderId=${orderId}`),
    create: (value: any) => requests.post("delivery", value),
    update: (value: any) => requests.put("delivery", value)
}

const agent = {
    Product,
    Account,
    Role,
    CategoryProduct,
    Cart,
    ImageProduct,
    Address,
    Order,
    WeightUnit,
    LevelProduct,
    DetailProduct,
    EvidenceMoneyTransfer,
    Report,
    Delivery,
    StatusDelivery
};

export default agent;

