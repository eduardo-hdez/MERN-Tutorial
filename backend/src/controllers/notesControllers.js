import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(notes); // return all notes to the client
  } catch (error) {
    console.log("Error in getAllNotes controller", error); // log the error
    res.status(500).json({ message: "Internal server error" }); // return 500 error to the client
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error); // log the error
    res.status(500).json({ message: "Internal server error" }); // return 500 error to the client
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json({ savedNote, message: "Note created successfully" });
  } catch (error) {
    console.error("Error in createNote controller", error); // log the error
    res.status(500).json({ message: "Internal server error" }); // return 500 error to the client
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ updatedNote, message: "Note updated successfully" });
  } catch (error) {
    console.error("Error in updateNote controller", error); // log the error
    res.status(500).json({ message: "Internal server error" }); // return 500 error to the client
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error); // log the error
    res.status(500).json({ message: "Internal server error" }); // return 500 error to the client
  }
}
