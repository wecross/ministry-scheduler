# Migration `20200505183655`

This migration has been generated at 5/5/2020, 6:36:55 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."new_Person" (
"active" BOOLEAN NOT NULL DEFAULT true ,"email" TEXT NOT NULL  ,"firstName" TEXT NOT NULL  ,"id" TEXT NOT NULL  ,"lastName" TEXT NOT NULL  ,"phone" TEXT   ,"scheduledMinistryDayId" TEXT   ,
    PRIMARY KEY ("id"),FOREIGN KEY ("scheduledMinistryDayId") REFERENCES "ScheduledMinistryDay"("date") ON DELETE SET NULL ON UPDATE CASCADE)

INSERT INTO "quaint"."new_Person" ("active", "email", "firstName", "id", "lastName", "phone", "scheduledMinistryDayId") SELECT "active", "email", "firstName", "id", "lastName", "phone", "scheduledMinistryDayId" FROM "quaint"."Person"

PRAGMA foreign_keys=off;
DROP TABLE "quaint"."Person";;
PRAGMA foreign_keys=on

ALTER TABLE "quaint"."new_Person" RENAME TO "Person";

CREATE UNIQUE INDEX "quaint"."name_unique" ON "Person"("firstName","lastName")

ALTER TABLE "quaint"."MinistryDayEntry" ADD COLUMN "label" TEXT   ;

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200505181817-initial-schema..20200505183655
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = env("DB_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -78,8 +78,9 @@
 // can have a description an expected duration and optionally an importance
 model MinistryDayEntry {
   id                      String                @default(uuid()) @id
   description             String
+  label                   String?
   expectedDurationMinutes Int?
   importance              Importance            @relation(fields: [importanceId], references: [id])
   importanceId            String
   // added by prisma
```


