import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.notes = [];

    this.exportPublicMethods({
      getNotesByIds: this.getNotesByIds.bind(this),
      deleteNotesWithIds: this.deleteNotesWithIds.bind(this)
    });
  }

  create(note) {
    const notes = this.notes;

    note.id = uuid.v4();

    this.setState({
      notes: notes.concat(note)
    });

    return note;
  }

  update(updatedNote) {
    const notes = this.notes.map(note => {
      if (note.id === updatedNote.id) {
        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    this.setState({notes});
  }

  delete(id) {
    this.setState({
      notes: this.notes.filter(note => note.id !== id)
    });
  }

  getNotesByIds(ids) {
    return (ids || []).reduce(
      (notes, id) => notes.concat(this.notes.filter(note => note.id === id))
      , []);
  }

  deleteNotesWithIds(ids) {
    const notes = this.notes.filter(note => {
      return !(ids || []).includes(note.id);
    });
    
    this.setState({notes});
  }
}

export default alt.createStore(NoteStore, 'NoteStore');