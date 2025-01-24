import { makeAutoObservable } from "mobx";

class NoteStore {
  selectedNoteId = null;
  selectedNoteText = '';

  constructor() {
    makeAutoObservable(this);
  }

  select(id, text) {
    this.selectedNoteId = id;
    this.selectedNoteText = text;
  }

  deselect() {
    this.selectedNoteId = null;
    this.selectedNoteText = '';
  }

  same(note) {
    return note.id === this.selectedNoteId;
  }
}

export default new NoteStore();