import { useEffect, useState } from "react"
import { usePesquisaHome } from "../common/hooks"
import Filtro from "../components/Filtro"
import ListaMusicas from "../components/ListaMusicas"
import { tipoMusica, tipoPesquisa } from "../common/types"
import { useNavigate } from "react-router-dom"
import { axiosMusicas } from "../common/axiosInstances"

const Pesquisa = () => {
    const pesquisaHome = usePesquisaHome()
    const navigate = useNavigate()
    const [dadosApi,setDadosApi] = useState<tipoMusica[]>([])

    useEffect(()=>{
        if(pesquisaHome.filtro === ''){navigate('/')}

        axiosMusicas.get('')
        .then(res=>setDadosApi(res.data))

        window.scrollTo(0,0)
    },[])

    const [filtrosPossiveis,setFiltrosPossiveis] = useState<string[]>(['Artist','Genre','Vibe'])
    const [pesquisa1,setPesquisa1] = useState<tipoPesquisa | undefined>(pesquisaHome)
    const [pesquisa2,setPesquisa2] = useState<tipoPesquisa | undefined>()
    const [pesquisa3,setPesquisa3] = useState<tipoPesquisa | undefined>()
    const [componenteFiltro1,setComponenteFiltro1] = useState<object | undefined>()
    const [componenteFiltro2,setComponenteFiltro2] = useState<object | undefined>()
    const [componenteFiltro3,setComponenteFiltro3] = useState<object | undefined>()
    const [excluiComponenteFiltro1,setExcluiComponenteFiltro1] = useState<boolean>(false)
    const [excluiComponenteFiltro2,setExcluiComponenteFiltro2] = useState<boolean>(false)
    const [excluiComponenteFiltro3,setExcluiComponenteFiltro3] = useState<boolean>(false)
    const [arrayComponentesFiltro,setArrayComponentesFiltro] = useState<(object | undefined)[]>([])

    function adicionaFiltro(){
        if(!componenteFiltro1){
            setComponenteFiltro1({
                key: new Date().getTime(),
                filtro: filtrosPossiveis[0],
                setPesquisa: setPesquisa1,
                excluiComponente: excluiComponenteFiltro1,
                setExcluiComponente: setExcluiComponenteFiltro1,
                filtroNaoAbrivel: false,
                pesquisaNaoAbrivel: false
            })
            setPesquisa1({
                filtro: filtrosPossiveis[0],
                pesquisa: ''
            })
            return
        }
        if(!componenteFiltro2){
            setComponenteFiltro2({
                key: new Date().getTime(),
                filtro: filtrosPossiveis[0],
                setPesquisa: setPesquisa2,
                excluiComponente: excluiComponenteFiltro2,
                setExcluiComponente: setExcluiComponenteFiltro2,
                filtroNaoAbrivel: false,
                pesquisaNaoAbrivel: false
            })
            setPesquisa2({
                filtro: filtrosPossiveis[0],
                pesquisa: ''
            })
            return
        }
        if(!componenteFiltro3){
            setComponenteFiltro3({
                key: new Date().getTime(),
                filtro: filtrosPossiveis[0],
                setPesquisa: setPesquisa3,
                excluiComponente: excluiComponenteFiltro3,
                setExcluiComponente: setExcluiComponenteFiltro3,
                filtroNaoAbrivel: false,
                pesquisaNaoAbrivel: false
            })
            setPesquisa3({
                filtro: filtrosPossiveis[0],
                pesquisa: ''
            })
            return
        }
    }

    useEffect(()=>{
        const indexExcluido = arrayComponentesFiltro.indexOf(componenteFiltro1)
        setArrayComponentesFiltro(arrayAntigo=>[...arrayAntigo].filter((componente,index)=>index !== indexExcluido))
        setComponenteFiltro1(undefined)
        setPesquisa1(undefined)
    },[excluiComponenteFiltro1])
    useEffect(()=>{
        const indexExcluido = arrayComponentesFiltro.indexOf(componenteFiltro2)
        setArrayComponentesFiltro(arrayAntigo=>[...arrayAntigo].filter((componente,index)=>index !== indexExcluido))
        setComponenteFiltro2(undefined)
        setPesquisa2(undefined)
    },[excluiComponenteFiltro2])
    useEffect(()=>{
        const indexExcluido = arrayComponentesFiltro.indexOf(componenteFiltro3)
        setArrayComponentesFiltro(arrayAntigo=>[...arrayAntigo].filter((componente,index)=>index !== indexExcluido))
        setComponenteFiltro3(undefined)
        setPesquisa3(undefined)
    },[excluiComponenteFiltro3])

    useEffect(()=>{
        let todosFiltros = ['Artist','Genre','Vibe']
        let filtrosUsados = [pesquisa1?.filtro,pesquisa2?.filtro,pesquisa3?.filtro]
        let possiveis = todosFiltros.filter(filtro=>!filtrosUsados.includes(filtro))
        setFiltrosPossiveis(possiveis)
    },[pesquisa1,pesquisa2,pesquisa3])

    useEffect(()=>{
        if(!arrayComponentesFiltro.includes(componenteFiltro1) && componenteFiltro1){
            setArrayComponentesFiltro(arrayAntigo=> [...arrayAntigo,componenteFiltro1])
        }
        if(!arrayComponentesFiltro.includes(componenteFiltro2) && componenteFiltro2){
            setArrayComponentesFiltro(arrayAntigo=> [...arrayAntigo,componenteFiltro2])
        }
        if(!arrayComponentesFiltro.includes(componenteFiltro3) && componenteFiltro3){
            setArrayComponentesFiltro(arrayAntigo=> [...arrayAntigo,componenteFiltro3])
        }
    },[componenteFiltro1,componenteFiltro2,componenteFiltro3])

    useEffect(()=>{
        setComponenteFiltro1({
            key: new Date().getTime(),
            filtro: pesquisaHome.filtro,
            pesquisa: pesquisaHome.pesquisa,
            setPesquisa: setPesquisa1,
            excluiComponente: excluiComponenteFiltro1,
            setExcluiComponente: setExcluiComponenteFiltro1,
            filtroNaoAbrivel: false,
            pesquisaNaoAbrivel: false
        })
    },[])

    return (
        <main className="pesquisa">
            <section className="pesquisa-filtros">
                {arrayComponentesFiltro.map((componente,index)=>{
                    let props:any = componente ? componente : {}
                    let filtroNaoAbrivel;
                    let pesquisaNaoAbrivel;
                    if(componente){
                        if(index === arrayComponentesFiltro.length - 1){
                            if(arrayComponentesFiltro.length < 3){
                                filtroNaoAbrivel = false
                                pesquisaNaoAbrivel = false
                            }else{
                                filtroNaoAbrivel = true
                                pesquisaNaoAbrivel = false
                            }
                            
                        }else{
                            filtroNaoAbrivel = true
                            pesquisaNaoAbrivel = true
                        }
                    }
                
                    return(
                        <Filtro key={props.key} dadosApi={dadosApi} ehPaginaHome={false} filtro={props.filtro} pesquisa={props.pesquisa || ''} filtrosPossiveis={filtrosPossiveis} setPesquisa={props.setPesquisa} excluiComponente={props.excluiComponente} setExcluiComponente={props.setExcluiComponente} filtroNaoAbrivel={filtroNaoAbrivel} pesquisaNaoAbrivel={pesquisaNaoAbrivel}/>
                    )
                })}

                <button type="button" className={`pesquisa-filtros-adicionar animaElemento2 ${arrayComponentesFiltro.length >= 3 ? 'invisivel' : ''}`} onClick={()=>adicionaFiltro()}>+ Add filter</button>
            </section>

            <div className="pesquisa-divisao animaElemento3"/>

            <ListaMusicas dadosApi={dadosApi} pesquisa1={pesquisa1} pesquisa2={pesquisa2} pesquisa3={pesquisa3}/>
        </main>
    )
}

export default Pesquisa