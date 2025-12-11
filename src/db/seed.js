import { db } from './database.js'
import { user, collection, flashcard, review } from './schema.js'
import bcrypt from 'bcrypt';

const seed = async () =>{
    console.log("starting database seeding...")

    try{
        await db.delete(review)
        await db.delete(flashcard)
        await db.delete(collection)
        await db.delete(user)

        const hashedPassword1 = await bcrypt.hash("passwd",12)
        const hashedPassword2 = await bcrypt.hash("123passwd",12)
        const hashedPassword3 = await bcrypt.hash("passwd123",12)
        const seedUser = [
            {
                email: "dupond@mail.ext",
                lastName: "Dupond",
                name: "Francis",
                isAdmin: false,
                password: hashedPassword1,
            },
            {
                email: "glouglou@mai.ext",
                lastName : "Glouglou",
                name : "Christopher",
                isAdmin: false,
                password: hashedPassword2,
            },
            {
                email: "molfaisse@mai.ext",
                lastName : "del molfaisse",
                name : "Sylas",
                isAdmin: true,
                password: hashedPassword3,
            },
        ]
        const ids = await db.insert(user).values(seedUser).returning()

        const seedCollection = [
            {
                title: "le savoir des ponts et constructions autres",
                description: "questions pour confirmer ses connaissances sur les infrastructures routières de type pont et les autres trucs",
                visibility: true,
                createdBy: ids[0].id

            },
            {
                title: "Pokémon de la 7e génération",
                description: "Quiz sur les Pokémon de la 7e génération (SM USUM & LGPE)",
                visibility: false,
                createdBy: ids[1].id

            },
            {
                title: "Quiz avancé NodeJS",
                description: "questions pour réviser avant l'examen NodeJS",
                visibility: true,
                createdBy: ids[2].id

            }
        ]

        const collections_id = await db.insert(collection).values(seedCollection).returning()

        const seedFlashcard = [
            {
                front : "Quel architecte a conçu le pont de Normandie ?",
                back : "Michel Virlogeux",
                urlBack : "https://fr.wikipedia.org/wiki/Michel_Virlogeux",
                collectionId : collections_id[0].id

            },
            {
                front : "Quel Pokémon remplace le fabuleux Arceus en 7G ?",
                back : "Silvallié",
                collectionId : collections_id[1].id
            },
            {
                front : "Quelle commande permet d'installer les dépendances précisées dans le fichier package.json ?",
                back : "npm install",
                collectionId : collections_id[2].id
            },
            {
                front : "que contient le fichier .env ?",
                back : "les variables d'environnement et les secrets.",
                collectionId : collections_id[2].id

            }
        ]

        const flashcards_id = await db.insert(flashcard).values(seedFlashcard).returning()

        const seedReview = [
            {
                userId : ids[0].id,
                flashcardId : flashcards_id[0].id,
                level : "3",
                lastReview : new Date(2025,12,8)
            },
            {
                userId : ids[1].id,
                flashcardId : flashcards_id[1].id,
                level : "5",
                lastReview : new Date(2025,12,4)
            },
            {
                userId : ids[0].id,
                flashcardId : flashcards_id[2].id,
                level : "1",
                lastReview : new Date(2025,12,11)
            },
            {
                userId : ids[1].id,
                flashcardId : flashcards_id[3].id,
                level : "2",
                lastReview : new Date(2025,12,11)
            }
        ]

        await db.insert(review).values(seedReview)


    } catch (error) {
        console.error(error)
    }
}

seed()