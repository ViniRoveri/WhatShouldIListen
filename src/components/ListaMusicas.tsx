import { memo, useEffect, useState } from "react"
import { ordenaMusicas } from "../common/functions"
import { useDisplayPopup, useSetDisplayPopup } from "../common/hooks"
import { tipoMusica, tipoPesquisa } from "../common/types"
import CardMusica from "./CardMusica"
import NumeroPagina from "./NumeroPagina"
import PopupMusica from "./PopupMusica"

interface intProps{
    dadosApi: tipoMusica[]
    pesquisa1: tipoPesquisa | undefined
    pesquisa2: tipoPesquisa | undefined
    pesquisa3: tipoPesquisa | undefined
}

const ListaMusicas = (props:intProps)=>{
    const displayPopup = useDisplayPopup()
    const setDisplayPopup = useSetDisplayPopup()

    const [contagemMusicas,setContagemMusicas] = useState<number>(0)
    const [numeroPagina,setNumeroPagina] = useState<number>(1)
    const [musicasPagina,setMusicasPagina] = useState<tipoMusica[]>([])
    const [arrayPaginas,setArrayPaginas] = useState<number[]>([])
    const [musicasFiltradas,setMusicasFiltradas] = useState<tipoMusica[]>([])
    const [musicaSelecionada,setMusicaSelecionada] = useState<tipoMusica>({
        _id: '',
        nome: '',
        artista: '',
        genero: '',
        vibes: '',
        link: ''
    })
    const [elementoAviso,setElementoAviso] = useState(
    <p className="lista-aviso">Loading Songs<b className="animaReticencias"/></p>
    )

    useEffect(()=>{
        let musicasFiltradasTemp = props.dadosApi

        if(props.pesquisa1){
            const pesquisa = props.pesquisa1.pesquisa
            const regexPesquisa = new RegExp(pesquisa,'i')

            musicasFiltradasTemp = [...props.dadosApi].filter(musica=>{
                if(props.pesquisa1?.filtro === 'Artist'){return regexPesquisa.test(musica.artista)}
                if(props.pesquisa1?.filtro === 'Genre'){if(pesquisa !== ''){return pesquisa === musica.genero}else{return true}}
                if(props.pesquisa1?.filtro === 'Vibe'){return regexPesquisa.test(musica.vibes)}
            })
        }
        if(props.pesquisa2){
            const pesquisa = props.pesquisa2.pesquisa
            const regexPesquisa = new RegExp(pesquisa,'i')

            musicasFiltradasTemp = [...musicasFiltradasTemp].filter(musica=>{
                if(props.pesquisa2?.filtro === 'Artist'){return regexPesquisa.test(musica.artista)}
                if(props.pesquisa2?.filtro === 'Genre'){if(pesquisa !== ''){return pesquisa === musica.genero}else{return true}}
                if(props.pesquisa2?.filtro === 'Vibe'){return regexPesquisa.test(musica.vibes)}
            })
        }
        if(props.pesquisa3){
            const pesquisa = props.pesquisa3.pesquisa
            const regexPesquisa = new RegExp(pesquisa,'i')

            musicasFiltradasTemp = [...musicasFiltradasTemp].filter(musica=>{
                if(props.pesquisa3?.filtro === 'Artist'){return regexPesquisa.test(musica.artista)}
                if(props.pesquisa3?.filtro === 'Genre'){if(pesquisa !== ''){return pesquisa === musica.genero}else{return true}}
                if(props.pesquisa3?.filtro === 'Vibe'){return regexPesquisa.test(musica.vibes)}
            })
        }

        const musicasOrdenadas = ordenaMusicas(musicasFiltradasTemp)

        setMusicasFiltradas(musicasOrdenadas)
        setContagemMusicas(musicasOrdenadas.length)
    },[props.dadosApi,props.pesquisa1,props.pesquisa2,props.pesquisa3])

    useEffect(()=>{
        if(props.dadosApi.length === 0 || musicasFiltradas.length === 0){
            setElementoAviso(
                <p className="lista-aviso" data-testid="avisoLista">Nenhuma música encontrada<br/>:(</p>
            )
        }else{
            setElementoAviso(<></>)
        }
    },[props.dadosApi,musicasFiltradas])

    useEffect(()=>{
        if(contagemMusicas <= 50){setNumeroPagina(1)}

        let arrayPaginasTemp:number[] = []

        for(let i=1; i <= Math.ceil(contagemMusicas / 50); i++){
            arrayPaginasTemp.push(i)
        }

        setArrayPaginas(arrayPaginasTemp)
    },[contagemMusicas])

    useEffect(()=>{
        const musicasPaginaTemp = [...musicasFiltradas].splice(
            (numeroPagina - 1) * 50, 
            50
        )
        
        window.scrollTo({top: 0, behavior: 'smooth'})
        setMusicasPagina(musicasPaginaTemp)
    },[musicasFiltradas,numeroPagina])

    return(
        <>
        <section className={`lista animaElemento1 ${displayPopup ? 'invisivel' : ''}`}>
            {contagemMusicas > 0 ?
            <p className="lista-contagem">{`Number of songs: ${contagemMusicas}`}</p>
            : <></>}

            {musicasPagina.map(musica=>(
                <div key={musica._id} style={{width: '100%'}} onClick={()=>{
                    setMusicaSelecionada(musica)
                    setDisplayPopup(true)
                }} data-testid="cardMusica">
                    <CardMusica musica={musica}/>
                </div>
            ))}
            
            {elementoAviso}

            {contagemMusicas > 50 ?
            <div className="lista-paginas">
                {arrayPaginas.map(numero=>(
                    <NumeroPagina key={numero} numero={numero} setNumeroPagina={setNumeroPagina} atual={numeroPagina === numero}/>
                ))}
            </div>
            : <></>}
        </section>
        <PopupMusica musica={musicaSelecionada} display={displayPopup} setDisplay={setDisplayPopup} ehPaginaPesquisa={true}/>
        </>
    )
}

export default memo(ListaMusicas)