import { faker } from '@faker-js/faker';
import dayjs, { Dayjs } from 'dayjs';
import { compose } from 'ramda';
import { AssignedWorkCollection, EngineerCollection, SprintCollection, WorkCollection } from './entities';
import { buildArray, capitalize } from './tools';

const { lorem, name, random } = faker;

function binaryChoice<T>(opt1: T, opt2: T): T {
  const choice = Math.random() > 0.5;

  return choice ? opt1 : opt2;
}

function generateDaysOff(start: Dayjs): Date[] {
  const choice = binaryChoice(2, 4);

  return [start.add(choice, 'days').toDate()];
}

export async function seed() {
  // clear dbs
  await SprintCollection.deleteMany();
  await EngineerCollection.deleteMany();
  await WorkCollection.deleteMany();
  await AssignedWorkCollection.deleteMany();

  // seed

  let endDate: Dayjs | undefined = undefined;

  for await (const _ of buildArray(2)) {
    const startDate: Dayjs = !endDate ? dayjs() : endDate;

    endDate = startDate.add(14, 'days');

    await SprintCollection.create({
      name: compose(capitalize, lorem.words)(3),
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      daysOff: generateDaysOff(startDate),
    });
  }

  const engineerIds: string[] = [];

  for await (const _ of buildArray(5)) {
    const { _id } = await EngineerCollection.create({
      person: {
        firstName: name.firstName(),
        lastName: name.lastName(),
      },
      daysOff: generateDaysOff(dayjs()),
    });

    engineerIds.push(_id.toString());
  }

  const workIds: string[] = [];

  for await (const _ of buildArray(30)) {
    const { _id } = await WorkCollection.create({
      jiraTicket: `ECP-${random.numeric(5)}`,
      jiraEpic: binaryChoice(`ECP-${random.numeric(5)}`, ''),
      estimate: random.numeric(1),
      title: compose(capitalize, lorem.sentence)(),
    });

    workIds.push(_id.toString());
  }

  for await (const id of buildArray(5)) {
    const engineerId = engineerIds[id];

    const workId = workIds[id];

    await AssignedWorkCollection.create({
      workId,
      engineerId,
      startDate: dayjs().add(id, 'days'),
    });

    if (binaryChoice(1, 2) === 2)
      await AssignedWorkCollection.create({
        workId: workIds[id + 5],
        engineerId,
        startDate: dayjs().add(id, 'days'),
      });
  }
}
