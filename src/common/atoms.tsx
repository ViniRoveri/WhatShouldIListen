import { atom } from "recoil";
import { tipoPesquisa } from "./types";

export const pesquisaHomeState = atom<tipoPesquisa>({
    key: 'pesquisaHomeState',
    default: {
        filtro: '',
        pesquisa: ''
    }
})

export const displayPopupState = atom<boolean>({
    key: 'displayPopup',
    default: false
})