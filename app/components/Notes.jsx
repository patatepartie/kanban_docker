import React from 'react';

import Editable from './Editable.jsx';
import Note from './Note.jsx';

export default ({notes, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className="notes">{notes.map(note =>
      <Note className="note" id={note.id} key={note.id}
            onMove={({sourceId, targetId}) =>
              console.log(`source: ${sourceId}, target: ${targetId}`)
            }>
        <Editable
          editing={note.editing}
          value={note.task}
          onEdit={onEdit.bind(null, note.id)}
          onValueClick={onValueClick.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)}
        />
      </Note>
    )}</ul>
  );
}