const mongoose =  require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        default: 'Untitled',
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: '_Blank'
    },
    tag: {
        type: String,
        default: 'NO Tag'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('notes', NotesSchema);