interface intProps{
    numero: number
    atual: boolean
    setNumeroPagina:React.Dispatch<React.SetStateAction<number>>
}

const NumeroPagina = (props: intProps)=>{
    return(
        <p className={props.atual ? 'numeroPaginaAtual' : 'numeroPagina'} onClick={()=>{props.setNumeroPagina(props.numero)}}>
            {props.numero}
        </p>
    )
}

export default NumeroPagina