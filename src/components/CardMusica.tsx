import { useEffect, useState } from "react"
import { checaFavorita } from "../common/functions"
import { tipoMusica } from "../common/types"
import {ReactComponent as Star} from '../img/Star.svg'

interface intProps{
    musica: tipoMusica
}

const CardMusica = (props:intProps)=>{
    const [ehFavorita,setEhFavorita] = useState(false)

    useEffect(()=>{
        setEhFavorita(
            checaFavorita(props.musica)
        )
    })

    return(
        <div className="card">
            {ehFavorita ? <div className="card-favorita"><Star className="card-favorita-icone"/></div> : <></>}
            <h2 className="card-titulo">{`${props.musica.artista} - ${props.musica.nome}`}</h2>
            <p className="card-texto">{`Genre: ${props.musica.genero}`}</p>
            <p className="card-texto">{`Vibes: ${props.musica.vibes}`}</p>
        </div>
    )
}

export default CardMusica