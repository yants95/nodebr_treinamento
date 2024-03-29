// npm i pg-hstore pg sequelize


// async function main() {
//     const Herois = driver.define('herois', {
//         id: {
//             type: Sequelize.INTEGER,
//             required: true,
//             primaryKey: true,
//             autoIncrement: true
//         },
//         nome: {
//             type: Sequelize.STRING,
//             required: true
//         },
//         poder: {
//             type: Sequelize.STRING,
//             required: true
//         }
//     }, {
//         tableName: 'TB_HEROIS',
//         freezeTableName: false,
//         timestamps: false
//     })

//     await Herois.sync()

//     const result = await Herois.findAll({ 
//         raw: true,
//         attributes: ['nome']
//     })
//     console.log(result)
// }

const Sequelize = require('sequelize')


async function main() {
    const Herois = driver.define('herois', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps: false
    })

    await Herois.sync()

    const result = Herois.findAll({
        raw: true
    });
    console.log(result)
}

main()