const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let i = 0; i <= this.length -1; i++) {
        const resultado = callback(this[i], i)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}

async function main() {
    try {
        const results = await service.getPeople('a')
        //const names = []

        /*results.results.forEach(function (item) {
            names.push(item.name)
        })*/

        /*const names = results.results.map(function (person) {
            return person.name
        })*/

        //const names = results.results.map((person) => person.name)

        const names = results.results.meuMap(function (person, i) {
            return `[${i}] ${person.name}`
        })

        console.log(names)
    } catch (error) {
        console.error(error)
    }
}

main()