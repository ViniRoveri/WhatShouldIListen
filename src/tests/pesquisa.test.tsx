import { render, screen, cleanup } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { HashRouter as Router } from "react-router-dom"
import Pesquisa from "../pages/Pesquisa"
import ListaMusicas from "../components/ListaMusicas"

describe('Testes Página Pesquisa:',()=>{
    beforeEach(cleanup)

    function setup(){
        render(
            <Router>
                <RecoilRoot>
                    <Pesquisa/>
                </RecoilRoot>
            </Router>
        )
    }

    test('Existe Aviso Se Não Há Músicas',()=>{
        render(
            <Router>
                <RecoilRoot>
                    <ListaMusicas dadosApi={[]} pesquisa1={undefined} pesquisa2={undefined} pesquisa3={undefined}/>
                </RecoilRoot>
            </Router>
        )

        const cardMusica = screen.queryByTestId('cardMusica')
        const avisoLista = screen.queryByTestId('avisoLista')

        expect(cardMusica).not.toBeInTheDocument()
        expect(avisoLista).toBeInTheDocument()
    })
    
    test('Não Existe Aviso Se Há Músicas',()=>{
        render(
            <Router>
                <RecoilRoot>
                    <ListaMusicas dadosApi={[{
                        _id: '',
                        nome: '',
                        artista: '',
                        genero: '',
                        vibes: '',
                        link: ''
                    }]} pesquisa1={undefined} pesquisa2={undefined} pesquisa3={undefined}/>
                </RecoilRoot>
            </Router>
        )

        const cardMusica = screen.queryByTestId('cardMusica')
        const avisoLista = screen.queryByTestId('avisoLista')

        expect(cardMusica).toBeInTheDocument()
        expect(avisoLista).not.toBeInTheDocument()
    })
})