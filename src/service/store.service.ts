import { DocumentDefinition, FilterQuery } from 'mongoose';
import StoreModal from '../models/store.model';
import { IStore } from '../models/interfaces/store.interfaces';

/**
 * Store service class handles queries
 */
export class StoreService {
  /**
   * @param {object} input store body
   * @returns {Promise<Response>}
   */
  createStore = async (
    input: DocumentDefinition<Omit<IStore, 'createdAt' | 'updatedAt'>>
  ) => {
    try {
      const store = await StoreModal.create(input);
      return store.toJSON();
    } catch (e: any) {
      throw new Error(e);
    }
  };

  findStoreById = async (query: FilterQuery<IStore>) => {
    return StoreModal.findById(query).exec();
  };

  findStores = async ({
    limit,
    offset,
    condition,
  }: {
    limit: number;
    offset: number;
    condition: object;
  }) => {
    return StoreModal.find(condition).limit(limit).skip(offset);
  };

  updateStore = async (_id: string, data: object) => {
    return StoreModal.findByIdAndUpdate(
      { _id },
      { $set: { ...data } },
      { new: true, runValidators: true }
    );
  };
}

const storeService = new StoreService();

export default storeService;
