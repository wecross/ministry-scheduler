# Migration `20200505181817-initial-schema`

This migration has been generated at 5/5/2020, 6:18:17 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."MonthlySchedule" (
"date" TEXT NOT NULL  ,
    PRIMARY KEY ("date"))

CREATE TABLE "quaint"."MonthlyAvailability" (
"date" TEXT NOT NULL  ,"dayEntryId" TEXT   ,"entryAvailable" BOOLEAN   ,"fullAvailability" BOOLEAN  DEFAULT true ,"id" TEXT NOT NULL  ,"ministryDayPatternId" TEXT   ,"personId" TEXT   ,
    PRIMARY KEY ("id"),FOREIGN KEY ("dayEntryId") REFERENCES "MinistryDayEntry"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE,
FOREIGN KEY ("ministryDayPatternId") REFERENCES "MinistryDayPattern"("id") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE TABLE "quaint"."ScheduledMinistryDay" (
"date" TEXT NOT NULL  ,"monthlyScheduleId" TEXT   ,"patternId" TEXT NOT NULL  ,
    PRIMARY KEY ("date"),FOREIGN KEY ("patternId") REFERENCES "MinistryDayPattern"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("monthlyScheduleId") REFERENCES "MonthlySchedule"("date") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE TABLE "quaint"."MinistryDayPattern" (
"id" TEXT NOT NULL  ,"name" TEXT NOT NULL  ,
    PRIMARY KEY ("id"))

CREATE TABLE "quaint"."Importance" (
"id" TEXT NOT NULL  ,"name" TEXT NOT NULL  ,"scale" INTEGER NOT NULL  ,
    PRIMARY KEY ("id"))

CREATE TABLE "quaint"."MinistryDayEntry" (
"description" TEXT NOT NULL  ,"expectedDurationMinutes" INTEGER   ,"id" TEXT NOT NULL  ,"importanceId" TEXT NOT NULL  ,"ministryDayPatternId" TEXT   ,
    PRIMARY KEY ("id"),FOREIGN KEY ("importanceId") REFERENCES "Importance"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("ministryDayPatternId") REFERENCES "MinistryDayPattern"("id") ON DELETE SET NULL ON UPDATE CASCADE)

ALTER TABLE "quaint"."Person" ADD COLUMN "scheduledMinistryDayId" TEXT   ;

CREATE UNIQUE INDEX "quaint"."name_unique" ON "Person"("firstName","lastName")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200505181817-initial-schema
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,90 @@
+datasource db {
+  provider = "sqlite"
+  url      = env("DB_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+  output   = "./client"
+}
+
+model Person {
+  id                     String                @default(uuid()) @id
+  firstName              String
+  lastName               String
+  email                  String
+  phone                  String?
+  active                 Boolean               @default(true)
+  scheduledMinistryDay   ScheduledMinistryDay? @relation(fields: [scheduledMinistryDayId], references: [date])
+  scheduledMinistryDayId String?
+  // added by prisma
+  monthlyAvailability    MonthlyAvailability[]
+
+  @@unique([firstName, lastName], name: "name_unique")
+}
+
+model MonthlySchedule {
+  date String                 @id
+  days ScheduledMinistryDay[]
+}
+
+model MonthlyAvailability {
+  id                   String              @default(uuid()) @id
+  date                 String
+  // if full availability is checked, it means the person is available for the full day found in date
+  fullAvailability     Boolean?            @default(true)
+  dayEntry             MinistryDayEntry?   @relation(fields: [dayEntryId], references: [id])
+  dayEntryId           String?
+  person               Person?             @relation(fields: [personId], references: [id])
+  personId             String?
+  entryAvailable       Boolean?
+  MinistryDayPattern   MinistryDayPattern? @relation(fields: [ministryDayPatternId], references: [id])
+  ministryDayPatternId String?
+}
+
+model ScheduledMinistryDay {
+  // will be like: 2020-05-02
+  date              String             @id
+  pattern           MinistryDayPattern @relation(fields: [patternId], references: [id])
+  patternId         String
+  persons           Person[]
+  // added by prisma
+  monthlySchedule   MonthlySchedule?   @relation(fields: [monthlyScheduleId], references: [date])
+  monthlyScheduleId String?
+}
+
+// this can be for example a Sunday
+// or a Thursday
+model MinistryDayPattern {
+  id                   String                 @default(uuid()) @id
+  // name could be "regular Sunday"
+  name                 String
+  entries              MinistryDayEntry[]
+  // added by prisma
+  scheduledMinistryDay ScheduledMinistryDay[]
+  monthlyAvailability  MonthlyAvailability[]
+}
+
+model Importance {
+  id               String             @default(uuid()) @id
+  name             String
+  scale            Int
+  // added by prisma
+  // for now one way relationship is not possible in prisma, so have to do put this here as well
+  MinistryDayEntry MinistryDayEntry[]
+}
+
+// this is a single service that is done in a certain day: eg: "Bible hour teaching"
+// can have a description an expected duration and optionally an importance
+model MinistryDayEntry {
+  id                      String                @default(uuid()) @id
+  description             String
+  expectedDurationMinutes Int?
+  importance              Importance            @relation(fields: [importanceId], references: [id])
+  importanceId            String
+  // added by prisma
+  // this should not be here, but prisma cannot have one-sided relations for now, so keep it here
+  ministryDayPattern      MinistryDayPattern?   @relation(fields: [ministryDayPatternId], references: [id])
+  ministryDayPatternId    String?
+  MonthlyAvailability     MonthlyAvailability[]
+}
```


