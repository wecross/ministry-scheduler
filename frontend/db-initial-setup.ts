import { PrismaClient } from "@prisma/client";
import initialData from "./prisma/initial-data";

const prisma = new PrismaClient();

async function main() {
  for await (let person of initialData.person) {
    await prisma.person.create({
      data: person,
    });
  }

  let importanceArray = [];
  for await (let importance of initialData.importance) {
    importanceArray.push(
      await prisma.importance.create({
        data: importance,
      }),
    );
  }

  const conducereDim = await prisma.ministryDayEntry.create({
    data: {
      description: "Conducere, duminica dimineata",
      label: "Conducere",
      importance: {
        connect: { id: importanceArray[1].id },
      },
    },
  });
  const conducereSeara = await prisma.ministryDayEntry.create({
    data: {
      description: "Conducere, duminica seara",
      label: "Conducere",
      importance: {
        connect: { id: importanceArray[1].id },
      },
    },
  });

  const rugaciune = await prisma.ministryDayEntry.create({
    data: {
      description: "Rugaciune, duminica dimineata",
      label: "Rugaciune",
      expectedDurationMinutes: 10,
      importance: {
        connect: { id: importanceArray[0].id },
      },
    },
  });

  const cina = await prisma.ministryDayEntry.create({
    data: {
      description: "Cina, duminica dimineata",
      label: "Cina",
      expectedDurationMinutes: 20,
      importance: {
        connect: { id: importanceArray[2].id },
      },
    },
  });

  const oraBiblica = await prisma.ministryDayEntry.create({
    data: {
      description: "Ora biblica, duminica dimineata",
      label: "Ora biblica",
      expectedDurationMinutes: 30,
      importance: {
        connect: { id: importanceArray[2].id },
      },
    },
  });

  const seara1 = await prisma.ministryDayEntry.create({
    data: {
      description: "Mesaj 1, duminica seara",
      label: "Mesaj 1",
      expectedDurationMinutes: 20,
      importance: {
        connect: { id: importanceArray[2].id },
      },
    },
  });

  const seara2 = await prisma.ministryDayEntry.create({
    data: {
      description: "Mesaj 2, duminica seara",
      label: "Mesaj 2",
      expectedDurationMinutes: 20,
      importance: {
        connect: { id: importanceArray[2].id },
      },
    },
  });

  const duminica = await prisma.ministryDayPattern.create({
    data: {
      name: "Duminica",
      entries: {
        connect: [
          { id: conducereDim.id },
          { id: rugaciune.id },
          { id: cina.id },
          { id: oraBiblica.id },
          { id: conducereSeara.id },
          { id: seara1.id },
          { id: seara2.id },
        ],
      },
    },
  });

  const conducereJoi = await prisma.ministryDayEntry.create({
    data: {
      description: "Conducere joi",
      label: "Conducere",
      importance: {
        connect: { id: importanceArray[1].id },
      },
    },
  });

  const joiRuga = await prisma.ministryDayEntry.create({
    data: {
      description: "Rugaciune joi",
      label: "Rugaciune",
      expectedDurationMinutes: 15,
      importance: {
        connect: { id: importanceArray[1].id },
      },
    },
  });
  const joiStudiu = await prisma.ministryDayEntry.create({
    data: {
      description: "Studiu joi",
      label: "Studiu",
      expectedDurationMinutes: 25,
      importance: {
        connect: { id: importanceArray[1].id },
      },
    },
  });

  const joi = await prisma.ministryDayPattern.create({
    data: {
      name: "Joi",
      entries: {
        connect: [
          { id: conducereJoi.id },
          { id: joiRuga.id },
          {
            id: joiStudiu.id,
          },
        ],
      },
    },
  });

  // await prisma.scheduledMinistryDay.create({
  // data: {

  // }
  // })
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
