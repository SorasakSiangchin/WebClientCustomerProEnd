import { Product } from './../models/Product';
import { persist, devtools } from 'zustand/middleware';
import create from 'zustand';

interface Types {
    infoFavorite: Product[];
    addFavorite: (info: Product) => void;
    resetSearch: (info: Product) => void;
    checkFavorite:  (id: any) => boolean;
    resetFavorite: () => void;
    removeFavorite:(idProducts: any) => void;
};

let store: any = (set: any) => {
    return {
        infoFavorite: [],
        addFavorite: (info: Product) => {
            set((state: any) => ({ infoFavorite: [...state.infoFavorite, info] }));
        },
        removeFavorite: (idProducts: any) => {
            for (const idProduct of idProducts) {
                set((state: any) => {
                const result = state.infoFavorite.filter((product: Product) => product.id !== idProduct) ;
                return { infoFavorite: [...result] }
            });
            }
        },
        checkFavorite: (id: any) => {
            let status = false;
            set((state: any) => {
                const result = state.infoFavorite.filter((product: Product) => product.id === id) ;
                if(result.length !== 0 ) status = true;
                return state;
            });
            return status;
        },
        resetFavorite: () => {
            set(() => ({ infoFavorite: [] }));
        }
    }
};

store = devtools(persist(store, { name: "favorite" }));

const useFavorite = create<Types>(store);


export default useFavorite;


