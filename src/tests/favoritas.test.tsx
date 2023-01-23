import { render, screen, cleanup } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { HashRouter as Router } from "react-router-dom"
import Favoritas from "../pages/Favoritas"

describe('Testes Página Pesquisa:',()=>{
    beforeEach(cleanup)

    function setup(){
        render(
            <Router>
                <RecoilRoot>
                    <Favoritas/>
                </RecoilRoot>
            </Router>
        )
    }

    test('Não Tem Músicas Nem Input, E Tem Aviso',()=>{
        setup()

        const inputFavoritas = screen.queryByTestId('inputFavoritas')
        const cardFavoritas = screen.queryByTestId('cardFavoritas')
        const avisoFavoritas = screen.queryByTestId('avisoFavoritas')

        expect(inputFavoritas).not.toBeInTheDocument()
        expect(cardFavoritas).not.toBeInTheDocument()
        expect(avisoFavoritas).toBeInTheDocument()
    })
})