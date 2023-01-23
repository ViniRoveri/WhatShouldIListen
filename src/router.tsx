import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { RecoilRoot } from "recoil"
import Header from "./components/HeaderFooter"
import Favoritas from "./pages/Favoritas"
import Home from "./pages/Home"
import Pesquisa from "./pages/Pesquisa"

const AppRouter = ()=>{
    return(
        <Router>
            <RecoilRoot>
                <Routes>
                    <Route path="/" element={<Header/>}>
                        <Route index element={<Home/>}/>
                        <Route path="search" element={<Pesquisa/>}/>
                        <Route path="favorites" element={<Favoritas/>}/>
                    </Route>
                </Routes>
            </RecoilRoot>
        </Router>
    )
}

export default AppRouter