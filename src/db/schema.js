import { boolean } from "drizzle-orm/gel-core";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "crypto"

export const user = sqliteTable('user',{
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    email: text().notNull().unique(),
    lastName: text("last_name",{length: 30}).notNull(),
    name: text({length: 30}).notNull(),
    password: text({length: 255}).notNull(),
    isAdmin: boolean("is_admin" ).notNull(),
    createdAt: integer('created_at',{mode:'timestamp'}).$defaultFn(() => new Date()),
})

export const collection = sqliteTable('collection',{
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    title: text({length: 30}).notNull(),
    description: text({length : 255}),
    visibility: boolean().notNull(),
    createdBy: text("created_by").references(() => user.id).notNull()

})

export const flashcard =sqliteTable('flashcard',{
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    front: text({length: 255}).notNull(),
    back: text({length: 255}).notNull(),
    urlFront: text('url_front',{length: 255}),
    urlBack: text('url_back',{length: 255}),
    collectionId: text('collecton_id').references(() => collection.id,{onDelete: 'cascade'}).notNull()
}) 

export const review = sqliteTable('review',{
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    userId: text('user_id').references(() => user.id,{onDelete:'cascade'}).notNull(),
    flashcardId: text('flashcard_id').references(() => flashcard.id,{onDelete: "cascade"}).notNull(),
    level: text({enum: ['1','2','3','4','5']}).notNull().default('1'),
    lastReview: integer('last_review',{mode: "timestamp"}).$defaultFn(() => new Date())
})