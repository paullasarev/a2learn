import { StorageService } from "../../app/services/storage-service";

export class FakeStorageService {
  public values = {};

  public removeItem(key) {
    delete this.values[key];
  }

  public setItem(key, value) {
    this.values[key] = value;
  }

  public getItem(key) {
    return this.values[key];
  }

}
