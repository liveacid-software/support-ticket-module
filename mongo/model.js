const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const SupportTicketSchema = mongoose.Schema(
    {
        submittedBy: { type: ObjectId, ref: 'User' },
        subject: String,
        body: String
        priority: 
    },
    {
		timestamps: true,
	}
);

const SupportTicket = mongoose.model('SupportTicket', SupportTicketSchema);

module.exports = SupportTicket;