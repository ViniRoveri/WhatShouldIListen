import { tipoMusica } from "./types"

export function checaFavorita(musica: tipoMusica){
    const arrayFavoritasString = localStorage.getItem('Favoritas')
    const arrayFavoritas:string[] = JSON.parse(arrayFavoritasString ? arrayFavoritasString : '[]')

    const checaFavorita:boolean = arrayFavoritas.includes(musica._id)

    return checaFavorita
}

export function desfavoritaMusica(musica: tipoMusica){
    const arrayFavoritasString = localStorage.getItem('Favoritas')
    const arrayFavoritas = JSON.parse(arrayFavoritasString ? arrayFavoritasString : '[]')
    const indexMusica = arrayFavoritas.indexOf(musica._id)
    arrayFavoritas.splice(indexMusica,1)
    localStorage.setItem('Favoritas', JSON.stringify(arrayFavoritas))
}

export function favoritaMusica(musica: tipoMusica){
    if(localStorage.getItem('Favoritas')){
        const arrayAntigoString = localStorage.getItem('Favoritas')
        const arrayAntigo = JSON.parse(arrayAntigoString ? arrayAntigoString : '[]')

        const arrayNovoString = JSON.stringify([...arrayAntigo, musica._id])

        localStorage.setItem('Favoritas', arrayNovoString)
    }else{
        const arrayNovoString = JSON.stringify([musica._id])

        localStorage.setItem('Favoritas', arrayNovoString)
    }
}

export function ordenaMusicas(arrayMusicas: tipoMusica[]){
    const musicasOrdenadas = [...arrayMusicas].sort((a,b)=>{
        if(a.artista > b.artista){return 1}

        if(a.artista === b.artista){
            if(a.nome > b.nome){return 1}
            if(a.nome < b.nome){return -1}
        }

        if(a.artista < b.artista){return -1}

        return -1
    })

    return musicasOrdenadas
}