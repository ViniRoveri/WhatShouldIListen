import { useEffect, useState } from "react"
import { axiosMusicas } from "../common/axiosInstances"
import { useDisplayPopup, useSetDisplayPopup } from "../common/hooks"
import { tipoMusica } from "../common/types"
import CardMusica from "../components/CardMusica"
import PopupRemover from "../components/PopupRemover"
import PopupMusica from "../components/PopupMusica"
import { ordenaMusicas } from "../common/functions"
import NumeroPagina from "../components/NumeroPagina"

const Favoritas = ()=>{
    const displayPopup = useDisplayPopup()
    const setDisplayPopup = useSetDisplayPopup()
    
    const [dadosApi,setDadosApi] = useState<tipoMusica[]>([])
    useEffect(()=>{
        axiosMusicas.get('')
        .then(res=>setDadosApi(res.data))

        window.scrollTo(0,0)
    },[])
    
    const [musicasFavoritas,setMusicasFavoritas] = useState<tipoMusica[]>([])
    const [musicasFavoritasFiltradas,setMusicasFavoritasFiltradas] = useState<tipoMusica[]>([])
    const [pesquisaFavoritas,setPesquisaFavoritas] = useState<string>('')
    const [displayPopupRemover,setDisplayPopupRemover] = useState(false)
    const [musicaSelecionada,setMusicaSelecionada] = useState<tipoMusica>({
        _id: '',
        nome: '',
        artista: '',
        genero: '',
        vibes: '',
        link: ''
    })
    const [elementoAviso,setElementoAviso] = useState(
    <p className="favoritas-lista-aviso">Loading songs<b className="animaReticencias"/></p>
    )
    const [contagemMusicas,setContagemMusicas] = useState<number>(0)
    const [numeroPagina,setNumeroPagina] = useState<number>(1)
    const [musicasPagina,setMusicasPagina] = useState<tipoMusica[]>([])
    const [arrayPaginas,setArrayPaginas] = useState<number[]>([])

    useEffect(()=>{
        const arrayIdFavoritasString = localStorage.getItem('Favoritas')
        const arrayIdFavoritas = JSON.parse(arrayIdFavoritasString ? arrayIdFavoritasString : '[]')

        const arrayFavoritas = dadosApi.filter(musica=> arrayIdFavoritas.includes(musica._id))

        setMusicasFavoritas(arrayFavoritas)
    },[dadosApi, displayPopup])

    useEffect(()=>{
        setContagemMusicas(musicasFavoritas.length)

        const regexPesquisa = new RegExp(pesquisaFavoritas, 'i')
        const musicasFiltradasTemp = [...musicasFavoritas].filter(
            musica=> regexPesquisa.test(musica.nome) 
            || regexPesquisa.test(musica.artista) 
            || regexPesquisa.test(musica.genero)
            || regexPesquisa.test(musica.vibes)
        )

        const musicasOrdenadas = ordenaMusicas(musicasFiltradasTemp)

        setMusicasFavoritasFiltradas(musicasOrdenadas)
    },[musicasFavoritas, pesquisaFavoritas])

    useEffect(()=>{
        if(musicasFavoritas.length === 0 || musicasFavoritasFiltradas.length === 0){
            setElementoAviso(
                <p className="favoritas-lista-aviso"  data-testid="avisoFavoritas">No favorite songs found<br/>:(</p>
            )
        }else{
            setElementoAviso(<></>)
        }
    },[musicasFavoritas,musicasFavoritasFiltradas])

    useEffect(()=>{
        if(contagemMusicas <= 50){setNumeroPagina(1)}

        let arrayPaginasTemp:number[] = []

        for(let i=1; i <= Math.floor(contagemMusicas / 50) + 1; i++){
            arrayPaginasTemp.push(i)
        }

        setArrayPaginas(arrayPaginasTemp)
    },[contagemMusicas])

    useEffect(()=>{
        const musicasPaginaTemp = [...musicasFavoritasFiltradas].splice(
            numeroPagina === 1 ? 0 : (numeroPagina - 1) * 50, 
            numeroPagina * 50
        )

        window.scrollTo({top: 0, behavior: 'smooth'})
        setMusicasPagina(musicasPaginaTemp)
    },[musicasFavoritasFiltradas,numeroPagina])
    
    return(
        <main className="favoritas">
            <div className="favoritas-textos">
            <h2 className="favoritas-textos-titulo animaElemento1">Favorite Songs</h2>
            <h3 className="favoritas-textos-subtitulo animaElemento2">When you save songs as favorites, you'll see them everytime you come here from this device!</h3>
            </div>

            <div className="favoritas-divisao animaElemento3"/>

            <div className={`favoritas-lista animaElemento1 ${displayPopup || displayPopupRemover ? 'invisivel' : ''}`}>
                {contagemMusicas > 0 ? 
                <input className="favoritas-lista-input" type="text" placeholder="Search for a favorite song..." value={pesquisaFavoritas} onChange={e=>setPesquisaFavoritas(e.target.value)} data-testid="inputFavoritas"/> 
                : <></>}

                {contagemMusicas > 0 ?
                <p className="favoritas-lista-contagem">{`Number of favorite songs: ${contagemMusicas}`}</p>
                : <></>}

                {musicasPagina.map(musica=>(
                    <div key={musica._id} style={{width: '100%'}} onClick={()=>{
                        setMusicaSelecionada(musica)
                        setDisplayPopup(true)
                    }}  data-testid="cardFavoritas">
                        <CardMusica musica={musica} key={musica._id}/>
                    </div>
                ))}

                {elementoAviso}

                {contagemMusicas > 50 ?
                <div className="favoritas-lista-paginas">
                    {arrayPaginas.map(numero=>(
                        <NumeroPagina key={numero} numero={numero} setNumeroPagina={setNumeroPagina} atual={numeroPagina === numero}/>
                    ))}
                </div>
                : <></>}
            </div>
            <PopupMusica musica={musicaSelecionada} display={displayPopup} setDisplay={setDisplayPopup}/>

            {musicasFavoritas.length > 0 ? <>
                <button type="button" className="favoritas-lista-botao animaElemento5" onClick={()=>setDisplayPopupRemover(true)}>Remove all favorite songs</button>
                <PopupRemover display={displayPopupRemover} setDisplay={setDisplayPopupRemover} setMusicasFavoritas={setMusicasFavoritas}/>
            </> : <></>}
        </main>
    )
}

export default Favoritas