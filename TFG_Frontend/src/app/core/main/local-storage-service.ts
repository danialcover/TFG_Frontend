import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() {
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
