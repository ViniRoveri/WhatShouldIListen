import { useState } from "react"
import { useDisplayPopup, useSetDisplayPopup } from "../common/hooks"
import { tipoMusica } from "../common/types"
import PopupMusica from "../components/PopupMusica"

interface intProps{
    children: string
    dadosApi: tipoMusica[]
    className?: string
}

const BotaoRandom = (props: intProps)=>{
    const displayPopup = useDisplayPopup()
    const setDisplayPopup = useSetDisplayPopup()

    const [musicaAleatoria,setMusicaAleatoria] = useState<tipoMusica>({
        _id: '',
        nome: '',
        artista: '',
        genero: '',
        vibes: '',
        link: ''
    })

    function selecionaMusicaAleatoria(){
        const indexAleatorio = Math.floor(Math.random() * props.dadosApi.length)

        setMusicaAleatoria(props.dadosApi[indexAleatorio])
        setDisplayPopup(true)
    }

    return(
        <>
        <button type="button" className={`botao-random ${props.className ? props.className : ''}`} onClick={()=>selecionaMusicaAleatoria()}>{props.children}</button>
        <PopupMusica musica={musicaAleatoria} display={displayPopup} setDisplay={setDisplayPopup}/>
        </>
    )
}

export default BotaoRandom