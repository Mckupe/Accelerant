import { autorun, makeAutoObservable, toJS} from "mobx";

function autoSave(store: any, save: any) {
    let firstRun = true;
    autorun(() => {
      const json = JSON.stringify(toJS(store.token));
      if (!firstRun) {
        save(json);
      }
      firstRun = false;
    });
  }

class tokenDataStore {

    token = this.resetToken();

    resetToken() {
        return ('');
    }

    constructor() {
        makeAutoObservable(this);
        this.load();
        autoSave(this, this.save.bind(this));
    }

    addtoken(token: string) {
        this.token = token;
    }

    load() {
        const data = localStorage.getItem('store');
        if (data) {
            this.token = data.replace(/['"]+/g, '');
        }
        
    }

    save(json: any) {
        localStorage.setItem('store', json);
    }
}

export const tokenStore = new tokenDataStore();