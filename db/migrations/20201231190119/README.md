# Migration `20201231190119`

This migration has been generated at 1/1/2021, 4:01:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user'
)

CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expiresAt" DATETIME,
    "handle" TEXT NOT NULL,
    "userId" INTEGER,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
)

CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameGroupId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "headCount" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("gameGroupId") REFERENCES "GameGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "GameGroup" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,

    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE TABLE "Rule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "gameGroupId" INTEGER NOT NULL,
    "topAward" TEXT NOT NULL,
    "rankingAward" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "chip" INTEGER NOT NULL,
    "round" TEXT NOT NULL,

    FOREIGN KEY ("gameGroupId") REFERENCES "GameGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")

CREATE UNIQUE INDEX "Session.handle_unique" ON "Session"("handle")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201230135319-initial-migration..20201231190119
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -20,8 +20,10 @@
   email          String    @unique
   hashedPassword String?
   role           String    @default("user")
   sessions       Session[]
+  games          Game[]
+  gameGroups     GameGroup[]
 }
 model Session {
   id                 Int       @default(autoincrement()) @id
@@ -35,4 +37,38 @@
   antiCSRFToken      String?
   publicData         String?
   privateData        String?
 }
+
+model Game {
+  id          Int       @default(autoincrement()) @id
+  createdAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
+  user        User      @relation(fields: [userId], references: [id])
+  userId      Int
+  gameGroup   GameGroup @relation(fields: [gameGroupId], references: [id])
+  gameGroupId Int
+  rank        Int
+  headCount   Int
+  score       Int
+}
+
+model GameGroup {
+  id        Int      @default(autoincrement()) @id
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+  user      User     @relation(fields: [userId], references: [id])
+  userId    Int
+}
+
+model Rule {
+  id           Int       @default(autoincrement()) @id
+  createdAt    DateTime  @default(now())
+  updatedAt    DateTime  @updatedAt
+  gameGroup    GameGroup @relation(fields: [gameGroupId], references: [id])
+  gameGroupId  Int
+  topAward     String
+  rankingAward String
+  rate         Int
+  chip         Int
+  round        String
+}
```


