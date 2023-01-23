import { useRecoilValue, useSetRecoilState } from "recoil"
import { displayPopupState, pesquisaHomeState } from "./atoms"

export const useDisplayPopup = ()=>{
    const display = useRecoilValue(displayPopupState)

    return display
}

export const useLimparPesquisaHome = ()=>{
    const setPesquisas = useSetRecoilState(pesquisaHomeState)

    return ()=>setPesquisas({
        filtro: '',
        pesquisa: ''
    })
}

export const usePesquisaHome = ()=>{
    const pesquisas = useRecoilValue(pesquisaHomeState)

    return pesquisas
}

export const useSetDisplayPopup = ()=>{
    const setDisplay = useSetRecoilState(displayPopupState)

    return (novoDisplay:boolean)=>{
        setDisplay(novoDisplay)
    }
}

export const useSetPesquisaHome = ()=>{
    const setPesquisaHome = useSetRecoilState(pesquisaHomeState)

    return (filtro:string,pesquisa:string)=>{
        const pesquisaHome = {
            filtro: filtro,
            pesquisa: pesquisa
        }

        return setPesquisaHome(pesquisaHome)
    }
}

