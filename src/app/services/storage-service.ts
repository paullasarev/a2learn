import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  private storage: Storage = window.localStorage;

  constructor() {
  }

  public removeItem(key) {
    this.storage.removeItem(key);
  }

  public setItem(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public getItem(key) {
    let item = this.storage.getItem(key);
    if (!item) {
      return null;
    }
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

}
