import { makeAutoObservable } from "mobx";

class NoteStore {
  selectedNoteId = null;
  selectedNoteText = '';

  constructor() {
    makeAutoObservable(this);
  }

  selectNote(id, text) {
    this.selectedNoteId = id;
    this.selectedNoteText = text;
  }

  deselectNote() {
    this.selectedNoteId = null;
    this.selectedNoteText = '';
  }

  hasSelected(id, text) {
    return id == this.selectedNoteId && text == this.selectedNoteText;
  }
}

export default new NoteStore();