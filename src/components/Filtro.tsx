import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetPesquisaHome,  } from "../common/hooks"
import { tipoMusica, tipoPesquisa } from "../common/types"
import {ReactComponent as ArrowDown} from '../img/Arrows/Arrow-Down.svg'
import {ReactComponent as ArrowUp} from '../img/Arrows/Arrow-Up.svg'
import {ReactComponent as Lupa} from '../img/Lupa.svg'
import {ReactComponent as Lixeira} from '../img/Lixeira.svg'

interface intProps{
    dadosApi: tipoMusica[]
    ehPaginaHome: boolean
    filtro?: string,
    pesquisa?: string,
    setPesquisa?: React.Dispatch<React.SetStateAction<tipoPesquisa | undefined>>
    excluiComponente?: boolean
    setExcluiComponente?: React.Dispatch<React.SetStateAction<boolean>>
    filtrosPossiveis?: string[]
    filtroNaoAbrivel?: boolean
    pesquisaNaoAbrivel?: boolean
}

const Filtro = (props:intProps) => {
    const navigate = useNavigate()
    const setPesquisaHome = useSetPesquisaHome()

    const [listaGeneros,setListaGeneros] = useState<Array<string>>([])
    const [listaVibes,setListaVibes] = useState<Array<string>>([])
    const [filtroSelecionado,setFiltroSelecionado] = useState(props.filtro || 'Artist')
    const [filtrosAberto,setFiltrosAberto] = useState(false)
    const [inputFiltro,setInputFiltro] = useState(props.pesquisa && props.filtro==='Artist' ? props.pesquisa : '')
    const [filtroInputSelecionado,setFiltroInputSelecionado] = useState(props.pesquisa && props.filtro!=='Artist' ? props.pesquisa : '')
    const [filtrosInputAberto,setFiltrosInputAberto] = useState(false)
    const [arrayFiltrosPossiveis,setArrayFiltrosPossiveis] = useState(props.filtrosPossiveis)

    function handleSubmit(){
        if (inputFiltro === '' && filtroInputSelecionado === '') {
            return
        } else {
            if (filtroSelecionado === 'Artist') {
                setPesquisaHome(filtroSelecionado, inputFiltro)
            } else {
                setPesquisaHome(filtroSelecionado, filtroInputSelecionado)
            }

            navigate('/search')
        }
    }

    useEffect(()=>{
        let listaGenerosTemp:string[] = []
        props.dadosApi.forEach((musica:tipoMusica)=>{
            if(!listaGenerosTemp.includes(musica.genero)){
                listaGenerosTemp.push(musica.genero)
            }
        })
        setListaGeneros(listaGenerosTemp)
        
        let listaVibesTemp:string[] = []
        props.dadosApi.forEach((musica:tipoMusica)=>{
            musica.vibes.split(', ').forEach(vibe=>{
                if(!listaVibesTemp.includes(vibe)){listaVibesTemp.push(vibe)}
            })                
        })
        setListaVibes(listaVibesTemp)
    },[props.dadosApi])

    useEffect(()=>{
        if(props.setPesquisa){
            props.setPesquisa({
                filtro: filtroSelecionado,
                pesquisa: filtroSelecionado === 'Artist' ? inputFiltro : filtroInputSelecionado
            })
        }
    },[filtroSelecionado,inputFiltro,filtroInputSelecionado])

    useEffect(()=>{
        if(props.filtrosPossiveis && props.filtro){
            let filtrosPossiveisTemp = props.filtrosPossiveis.includes(filtroSelecionado) ? [...props.filtrosPossiveis] : [...props.filtrosPossiveis, filtroSelecionado]

            setArrayFiltrosPossiveis(filtrosPossiveisTemp)
        }
    },[props.filtrosPossiveis,filtroSelecionado])

    return (
        <form className={`filtro ${props.ehPaginaHome ? 'animaElementoHome2' : 'animaElemento1'}`} onSubmit={e=>{
            e.preventDefault()
            handleSubmit()
        }}>
            <section className="filtro-filtros">
                <p className={`filtro-filtros-selecionado ${filtrosAberto && !props.filtroNaoAbrivel ? 'filtro-selecionado-aberto' : 'filtro-selecionado-fechado'}`} onClick={() => {
                    if(!props.filtroNaoAbrivel){
                        setFiltrosAberto(!filtrosAberto)
                    }
                }} style={!props.filtroNaoAbrivel ? {cursor:'pointer'} : {cursor:'default'}} data-testid="filtroSelecionado">{filtroSelecionado}</p>

                {filtrosAberto && !props.filtroNaoAbrivel ?
                    <ArrowUp className={`filtro-filtros-arrow ${!props.filtroNaoAbrivel ? '' : 'invisivel'}`} data-testid="setaCima" onClick={() => setFiltrosAberto(!filtrosAberto)} /> 
                    :
                    <ArrowDown className={`filtro-filtros-arrow ${!props.filtroNaoAbrivel ? '' : 'invisivel'}`} data-testid="setaBaixo" onClick={() => setFiltrosAberto(!filtrosAberto)} />
                }

                <div className={`filtro-filtros-opcoes ${filtrosAberto && !props.filtroNaoAbrivel ? '' : 'invisivel'}`} onClick={() => setFiltrosAberto(false)} data-testid="opcoesFiltro">
                    {arrayFiltrosPossiveis && arrayFiltrosPossiveis.length > 0 ? 
                    arrayFiltrosPossiveis.sort().map(filtro=>(
                        <p className="filtro-filtros-opcao" onClick={() => {
                            if(filtroSelecionado !== filtro){
                                if(filtro === 'Artist'){setInputFiltro('')}
                                else{setFiltroInputSelecionado('')}
                            }
                            setFiltroSelecionado(filtro)
                            setFiltrosInputAberto(false)
                        }} key={filtro}>{filtro}</p>
                    ))
                    :
                    <>
                    <p className="filtro-filtros-opcao" onClick={() => {
                        if (filtroSelecionado !== 'Artist') { setInputFiltro('') }
                        setFiltroSelecionado('Artist')
                        setFiltrosInputAberto(false)
                    }}>Artist</p>
                    <p className="filtro-filtros-opcao" onClick={() => {
                        if (filtroSelecionado !== 'Genre') { setFiltroInputSelecionado('') }
                        setFiltroSelecionado('Genre')
                    }}>Genre</p>
                    <p className="filtro-filtros-opcao" onClick={() => {
                        if (filtroSelecionado !== 'Vibe') { setFiltroInputSelecionado('') }
                        setFiltroSelecionado('Vibe')
                    }}>Vibe</p>
                    </>
                    }
                </div>
            </section>

            <section className="filtro-pesquisa">
                <input className={`filtro-pesquisa-input ${filtroSelecionado === 'Artist' ? '' : 'invisivel'}`} type='text' placeholder="Search for an artist..." value={inputFiltro} onChange={e => setInputFiltro(e.target.value)}/>

                <p className={`filtro-pesquisa-selecionado ${filtroSelecionado !== 'Artist' ? '' : 'invisivel'}`} onClick={() => {
                    if(!props.pesquisaNaoAbrivel){
                        setFiltrosInputAberto(!filtrosInputAberto)
                    }
                }} style={!props.pesquisaNaoAbrivel ? {cursor:'pointer'} : {cursor:'default'}}>{filtroInputSelecionado}</p>

                {filtrosInputAberto && !props.pesquisaNaoAbrivel ?
                    <ArrowUp className={`filtro-pesquisa-arrow ${filtroSelecionado !== 'Artist' ? '' : 'invisivel'} ${props.pesquisaNaoAbrivel || filtroInputSelecionado ? 'invisivel' : ''}`} onClick={() => setFiltrosInputAberto(!filtrosInputAberto)}/> :
                    <ArrowDown className={`filtro-pesquisa-arrow ${filtroSelecionado !== 'Artist' ? '' : 'invisivel'} ${props.pesquisaNaoAbrivel || filtroInputSelecionado ? 'invisivel' : ''}`} onClick={() => setFiltrosInputAberto(!filtrosInputAberto)}/>
                }

                <div className={`filtro-pesquisa-opcoes ${filtroSelecionado === 'Genre' && filtrosInputAberto && !props.pesquisaNaoAbrivel ? '' : 'invisivel'}`}>
                    {listaGeneros.sort().map(genero => (
                        <p className="filtro-pesquisa-opcao" key={genero} onClick={() => {
                            setFiltroInputSelecionado(genero)
                            setFiltrosInputAberto(false)
                        }}>{genero}</p>
                    ))}
                </div>

                <div className={`filtro-pesquisa-opcoes ${filtroSelecionado === 'Vibe' && filtrosInputAberto && !props.pesquisaNaoAbrivel ? '' : 'invisivel'}`}>
                    {listaVibes.sort().map(vibe => (
                        <p className="filtro-pesquisa-opcao" key={vibe} onClick={() => {
                            setFiltroInputSelecionado(vibe)
                            setFiltrosInputAberto(false)
                        }}>{vibe}</p>
                    ))}
                </div>

            </section>


            <button type={props.ehPaginaHome ? 'submit' : 'button'} className="filtro-botao" onClick={()=>{
                if(props.setExcluiComponente){
                    props.setExcluiComponente(!props.excluiComponente)
                }
            }}>
                {props.ehPaginaHome ? 
                    <Lupa className="filtro-botao-icon"/>
                    :
                    <Lixeira className="filtro-botao-icon"/>
                }
            </button>
        </form>
    )
}

export default Filtro