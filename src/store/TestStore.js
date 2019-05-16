import { observable, computed, action } from 'mobx';

class TestStore {
    @observable number = 0;

    @action addNumber() {
        this.number ++;
    }
}

export default new TestStore();