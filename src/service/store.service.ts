import { DocumentDefinition } from 'mongoose';
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
}

const storeService = new StoreService();

export default storeService;
