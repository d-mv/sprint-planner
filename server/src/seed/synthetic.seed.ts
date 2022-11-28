import { faker } from '@faker-js/faker';
import { buildIntArray, capitalize, R, dayjs, DayJS } from '@mv-d/toolbelt';

import { AssignedWorkCollection, EngineerCollection, SprintCollection, WorkCollection } from '../entities';
import { incomingSprintToDbFormat } from '../entities/sprint/sprint.tools';
import { appSeed } from './app.seed';
import { clearDbs } from './clearDbs';
import { scenariosSeed } from './scenarios.seed';
import { generateEngineersDaysOff, binaryChoice } from './tools.seed';

const { lorem, name, random } = faker;

export async function syntheticSeed() {
  await clearDbs();

  // seed

  let endDate: DayJS.Dayjs | undefined = undefined;

  for await (const _ of buildIntArray(2)) {
    const startDate: DayJS.Dayjs = !endDate ? dayjs() : endDate;

    endDate = startDate.add(14, 'days');

    const sprint = {
      name: R.compose(capitalize, lorem.words)(3),
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      days: [],
      daysOff: [],
    };

    await SprintCollection.create(incomingSprintToDbFormat(sprint));
  }

  const engineerIds: string[] = [];

  for await (const _ of buildIntArray(5)) {
    const { _id } = await EngineerCollection.create({
      person: {
        firstName: name.firstName(),
        lastName: name.lastName(),
      },
      daysOff: generateEngineersDaysOff(dayjs()),
    });

    engineerIds.push(_id.toString());
  }

  await appSeed(engineerIds);

  const workIds: string[] = [];

  for await (const _ of buildIntArray(30)) {
    const { _id } = await WorkCollection.create({
      jiraTicket: `ECP-${random.numeric(5)}`,
      jiraEpic: binaryChoice(`ECP-${random.numeric(5)}`, ''),
      estimate: random.numeric(1),
      title: R.compose(capitalize, lorem.sentence)(),
    });

    workIds.push(_id.toString());
  }

  for await (const id of buildIntArray(5)) {
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

  await scenariosSeed();
}
