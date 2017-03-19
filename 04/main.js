const COLORS = ['#ffffff', '#80d8ff', '#ffff8d', '#ff8a80', '#ccff90', '#cfd8dc', '#ffd180'];

const ColorPicker = React.createClass({
  handleClick(color) {
    this.props.onChange(color);
  },

  render() {

    return (
      <div className='ColorPicker'>
        {
          COLORS.map(color =>
            <div
              key={color}
              className={ `ColorPicker__swatch ${this.props.value === color ? "selected" : ""} ` }
              style={{ backgroundColor: color }}
              onClick={this.handleClick.bind(this, color)}
            />
          )
        }
      </div>
    )
  }
})

const Note = React.createClass({
  handleDelete() {
    this.props.onDelete(this.props.id);
  },

  render() {
    const {
      color,
      children,
      onDelete
    } = this.props;

    return (
      <div className="note" style={{ backgroundColor: color }}>
        <span className="note__delete-icon" onClick={this.handleDelete}> × </span>
        {children}
      </div>
    );
  }
});

const NoteEditor = React.createClass({
  getInitialState() {

    return {
      text: ''
    };
  },

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    });
  },

  handleColorChange(color) {
    this.setState({ color });
  },

  handleNoteAdd() {
    const newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now()
    };

    this.props.onNoteAdd(newNote);

    this.resetState();
  },

  resetState() {
    this.setState({
      text: ''
    });
  },

  render() {

    return (
      <div className="editor">
        <textarea
          rows={5}
          placeholder="Enter your note here..."
          className="editor__textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />

        <ColorPicker
          value={this.state.color}
          onChange={this.handleColorChange}
        />

        <button className="editor__button" onClick={this.handleNoteAdd}>Add</button>
        </div>
    );
  }
});

const NotesGrid = React.createClass({
  componentDidMount() {
    const grid = this.grid;

    this.msnry = new Masonry(grid, {
      columnWidth: 240,
      gutter: 10,
      isFitWidth: true
    });
  },

  componentDidUpdate(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
        this.msnry.reloadItems();
        this.msnry.layout();
    }
  },

  render() {
    const {
      notes,
      onNoteDelete
    } = this.props;

    return (
      <div className="grid" ref={c => this.grid = c}>
        {
          notes.map(note =>
            <Note
              key={note.id}
              id={note.id}
              color={note.color}
              onDelete={onNoteDelete}
            >
              {note.text}
            </Note>
          )
        }
      </div>
    );
  }
});

const NotesApp = React.createClass({
  getInitialState() {

    return {
      notes: []
    };
  },

  componentDidMount() {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));

    if (savedNotes) {
      this.setState({ notes: savedNotes });
    }
  },

  componentDidUpdate() {
    const notes = JSON.stringify(this.state.notes);

      localStorage.setItem('notes', notes);
    },

  handleNoteDelete(noteId) {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  },

  handleNoteAdd(newNote) {
    this.setState({
      notes: [newNote, ...this.state.notes]
    });
  },

  render() {

    return (
      <div className="app">
        <h2 className="app__header">NotesApp</h2>

        <NoteEditor onNoteAdd={this.handleNoteAdd} />

        <NotesGrid
          notes={this.state.notes}
          onNoteDelete={this.handleNoteDelete}
        />
      </div>
    );
  }
});

ReactDOM.render(
    <NotesApp />,
    document.getElementById('root')
);
