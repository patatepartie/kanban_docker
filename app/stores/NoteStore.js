import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
  constructor() {
    this.bindActions(NoteActions);

    this.lanes = [];
  }

  create(note) {
    const notes = this.lanes;

    note.id = uuid.v4();

    this.setState({
      lanes: notes.concat(note)
    })
  }

  update(updatedNote) {
    const notes = this.lanes.map(note => {
      if (note.id === updatedNote.id) {
        return Object.assign({}, note, updatedNote);
      }

      return note;
    });

    this.setState({lanes});
  }

  delete(id) {
    this.setState({
      lanes: this.lanes.filter(note => note.id !== id)
    });
  }
}

export default alt.createStore(NoteStore, 'NoteStore');