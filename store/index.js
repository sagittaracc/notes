import { makeAutoObservable } from "mobx";

class NoteStore {
  selectedNoteId = null;
  selectedNoteText = null;

  constructor() {
    makeAutoObservable(this);
  }

  selectNote(id, text) {
    this.selectedNoteId = id;
    this.selectedNoteText = text;
  }
}

export default new NoteStore();