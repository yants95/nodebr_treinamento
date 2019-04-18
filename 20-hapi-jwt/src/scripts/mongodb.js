// // docker ps
// // docker exec -it c044eb99ffa2 \
// //     mongo -u yansoares -p senhaadmin --authenticationDatabase herois

// //databases
// show dbs

// //mudando contexto para uma database específica
// use herois

// //mostrar tables (collections)
// show collections

// db.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01'
// })

// db.herois.find()
// db.herois.find().pretty()

// for (let i = 0; i < 10000; i++) {
//     db.herois.insert({
//         nome: `Clone-${i}`,
//         poder: 'Velocidade',
//         dataNascimento: '1998-01-01'
//     })
// }

// db.herois.count()
// db.herois.findOne()
// db.herois.find().limit(1000).sort({nome: -1})
// db.herois.find({}, {poder: 1, _id: 0})

// //create
// db.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01'
// })

// //read
// db.herois.find()

// //update
// db.herois.update({_id: ObjectId("5c675b62ff148677f61f3707")},
//                 {nome: 'Mulher Maravilha'})

// db.herois.update({_id: ObjectId("5c675be6ff148677f61f3aef")}, 
//                         { $set: {nome: 'Lanterna Verde'} })

// db.herois.update({ poder: 'Velocidade' },
//                 { $set: {poder: 'super força'} })


// //delete
// db.herois.remove({})
// db.herois.remove({nome: 'Mulher maravilha'})

                    