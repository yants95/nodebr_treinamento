const { getPeople } = require('./service')

Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial != undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length -1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }

    return valorFinal
}

async function main() {
    try {
        const { results } = await getPeople('a')
        const pesos = results.map(item => parseInt(item.height))
        console.log('pesos ', pesos);
        /*const total = pesos.reduce((anterior, proximo) => {
            return anterior + proximo
        }, 0)*/
        const minhaLista = [
            ['Yan', 'Thais'],
            ['Laravel Brasil', 'NodeBR']
        ]

        const total = minhaLista.meuReduce((anterior, proximo) => {
            return anterior.concat(proximo)
        }, [])
        .join(', ')

        console.log('Total ', total);
    } catch (error) {
        console.error(error)
    }
}

main()