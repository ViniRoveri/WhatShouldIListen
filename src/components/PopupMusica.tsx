import { useEffect, useState } from "react"
import { checaFavorita, desfavoritaMusica, favoritaMusica } from "../common/functions"
import { tipoMusica } from "../common/types"
import {ReactComponent as Star} from '../img/Star.svg'

interface intProps{
    musica: tipoMusica
    display: boolean
    setDisplay: (novoDisplay: boolean) => void
    ehPaginaPesquisa?: boolean 
}

const PopupMusica = (props:intProps) => {
    const [ehFavorita,setEhFavorita] = useState<boolean>(false)

    useEffect(()=>{
        const ehFavoritaTemp = checaFavorita(props.musica)
        setEhFavorita(ehFavoritaTemp)

        if(props.musica._id === ''){
            props.setDisplay(false)
        }
    })

    return(
        <section className={`popup ${props.display ? '' : 'invisivel'}`} style={{top: props.ehPaginaPesquisa ? '0px' : '50px'}} data-testid="popupMusica">
            <div className="popup-conteudo animaElemento1">
                <Star className="popup-conteudo-star" style={{fill: ehFavorita ? '#eae6ff' : '#222126'}} onClick={()=>{
                    if(ehFavorita){
                        desfavoritaMusica(props.musica)
                        setEhFavorita(
                            checaFavorita(props.musica)
                        )
                    }else{
                        favoritaMusica(props.musica)
                        setEhFavorita(
                            checaFavorita(props.musica)
                        )
                    }
                }}/>
                <h2 className="popup-conteudo-titulo animaElemento2">{`${props.musica.artista} - ${props.musica.nome}`}</h2>
                <div className="animaElemento3">
                    <p className="popup-conteudo-texto">{`Genre: ${props.musica.genero}`}</p>
                    <p className="popup-conteudo-texto">{`Vibes: ${props.musica.vibes}`}</p>
                </div>
                <iframe className="popup-conteudo-video animaElemento4" src={props.musica.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <button type="button" className="popup-conteudo-botao animaElemento5" onClick={()=>props.setDisplay(false)}>Close</button>
            </div>
        </section>
    )
}

export default PopupMusica