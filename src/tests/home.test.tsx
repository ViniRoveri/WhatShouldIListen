import { render, fireEvent, screen, cleanup } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Home from "../pages/Home"
import { HashRouter as Router } from "react-router-dom"

describe('Testes Página Home:',()=>{
    beforeEach(cleanup)

    function setup(){
        render(
            <Router>
                <RecoilRoot>
                    <Home/>
                </RecoilRoot>
            </Router>
        )
    }

    test('Filtros Abrindo No Clique',()=>{
        setup()

        const filtroSelecionado = screen.getByTestId('filtroSelecionado')
        const opcoesFiltro = screen.queryByTestId('opcoesFiltro')

        fireEvent.click(filtroSelecionado)

        expect(opcoesFiltro).not.toHaveClass('invisivel')
    })
    
    test('Filtros Fechando No Clique',()=>{
        setup()

        const filtroSelecionado = screen.getByTestId('filtroSelecionado')
        const opcoesFiltro = screen.queryByTestId('opcoesFiltro')

        fireEvent.click(filtroSelecionado)
        fireEvent.click(filtroSelecionado)

        expect(opcoesFiltro).toHaveClass('invisivel')
    })
    
    test('Seta Pra Baixo Funcionando',()=>{
        setup()

        const setaBaixo = screen.getByTestId('setaBaixo')
        
        fireEvent.click(setaBaixo)

        const setaCima = screen.queryByTestId('setaCima')

        expect(setaBaixo).not.toBeInTheDocument
        expect(setaCima).toBeInTheDocument()
    })
    
    test('Seta Pra Cima Funcionando',()=>{
        setup()

        const setaBaixo = screen.getByTestId('setaBaixo')
              
        fireEvent.click(setaBaixo)

        const setaCima = screen.getByTestId('setaCima')  

        fireEvent.click(setaCima)

        expect(setaCima).not.toBeInTheDocument()
        expect(setaBaixo).toBeInTheDocument
    })
})