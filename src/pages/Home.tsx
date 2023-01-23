import { useEffect, useState } from "react"
import { axiosMusicas } from "../common/axiosInstances"
import { useLimparPesquisaHome } from "../common/hooks"
import { tipoMusica } from "../common/types"
import BotaoRandom from "../components/BotaoRandom"
import Disco from "../components/Disco"
import Filtro from "../components/Filtro"

const Home = ()=>{
    const limparPesquisaHome = useLimparPesquisaHome()
    const [dadosApi,setDadosApi] = useState<tipoMusica[]>([])
    useEffect(()=>{
        axiosMusicas.get('')
        .then(res=>setDadosApi(res.data))

        limparPesquisaHome()

        window.scrollTo(0,0)
    },[])

    return(
        <main className="home">
            <section className="home-disco">
                <Disco/>
            </section>
            
            <section className="home-conteudo">
                <h1 className="home-conteudo-titulo">
                    <div className="animaTitulo1">What</div>
                    <div className="animaTitulo2">Should</div>
                    <div className="animaTitulo3">I</div>
                    <div className="animaTitulo4">Listen</div>
                </h1>

                <section className="home-conteudo-filtro">
                    <h2 className="home-conteudo-filtro-titulo animaElementoHome1">Start now by choosing a filter:</h2>
                    <Filtro dadosApi={dadosApi} ehPaginaHome={true}/>
                </section>

                <BotaoRandom className="animaElementoHome3" dadosApi={dadosApi}>Or go to a random song!</BotaoRandom>
            </section>
        </main>
    )
}

export default Home