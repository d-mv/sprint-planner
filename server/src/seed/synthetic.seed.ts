import { faker } from '@faker-js/faker';
import dayjs, { Dayjs } from 'dayjs';
import { compose } from 'ramda';

import {
  AppCollection,
  AssignedWorkCollection,
  EngineerCollection,
  SprintCollection,
  WorkCollection,
} from '../entities';
import { incomingSprintToDbFormat } from '../entities/sprint/sprint.tools';
import { buildArray, capitalize } from '../tools';
import { clearDbs } from './clearDbs';
import { scenariosSeed } from './scenarios.seed';
import { generateEngineersDaysOff, binaryChoice } from './tools.seed';

const { lorem, name, random } = faker;

export async function syntheticSeed() {
  await clearDbs();

  // seed

  let endDate: Dayjs | undefined = undefined;

  for await (const _ of buildArray(2)) {
    const startDate: Dayjs = !endDate ? dayjs() : endDate;

    endDate = startDate.add(14, 'days');

    const sprint = {
      name: compose(capitalize, lorem.words)(3),
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      days: [],
      daysOff: [],
    };

    await SprintCollection.create(incomingSprintToDbFormat(sprint));
  }

  const engineerIds: string[] = [];

  for await (const _ of buildArray(5)) {
    const { _id } = await EngineerCollection.create({
      person: {
        firstName: name.firstName(),
        lastName: name.lastName(),
      },
      daysOff: generateEngineersDaysOff(dayjs()),
    });

    engineerIds.push(_id.toString());
  }

  const assignedEngineers = engineerIds.slice(0, 5);

  await AppCollection.create({ assignedEngineers });

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

  await scenariosSeed();
}