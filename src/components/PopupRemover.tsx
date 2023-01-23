import { tipoMusica } from "../common/types"

interface intProps{
    display: boolean
    setDisplay: React.Dispatch<React.SetStateAction<boolean>>
    setMusicasFavoritas: React.Dispatch<React.SetStateAction<tipoMusica[]>>
}

const PopupRemover = (props: intProps)=>{
    return(
        <section className={`popupRemover ${props.display ? '' : 'invisivel'}`}>
            <div className="popupRemover-conteudo animaElemento1">
                <h2 className="popupRemover-conteudo-titulo">Do you want to remove all favorite songs?</h2>
                <button type="button" className="popupRemover-conteudo-excluir" onClick={()=>{
                    localStorage.removeItem('Favoritas')
                    props.setMusicasFavoritas([])
                    props.setDisplay(false)
                }}>Remove</button>
                <button type="button" className="popupRemover-conteudo-voltar" onClick={()=>props.setDisplay(false)}>Close</button>
            </div>
        </section>
    )
}

export default PopupRemover