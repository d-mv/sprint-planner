import { QueryController } from '../../../controllers';
import { request, success } from '../../../entities';
import { buildRequest } from '../../test.tools';

const getAllResult = [{ id: 'hello' }];

const sprintCollectionMock = jest.fn().mockResolvedValue(getAllResult);

describe('entities::sprint::controller', () => {
  describe('getAll', () => {
    it('correctly returns all items', async () => {
      const req = buildRequest({ domain: 'sprint', action: 'getAll' }, { sprint: { find: sprintCollectionMock } });

      const result = await request(QueryController, req);

      expect(result).toStrictEqual(success(getAllResult));
    });
  });
});
