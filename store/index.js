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

  deselectNote() {
    this.selectedNoteId = null;
    this.selectedNoteText = null;
  }

  hasSelected(id, text) {
    return id == this.selectedNoteId && text == this.selectedNoteText;
  }
}

export default new NoteStore();