const mongoose = require('mongoose');

const InternSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    domain: { 
        type: String, 
        enum: [
            'Web Development', 'Teaching', 'Photography', 
            'Telecalling', 'Fundraising', 'Social Media Marketing', 
            'Talent Acquisition', 'Graphic Design', 
            'Video Editing', 'Content Writing', 'NGO Management'
        ],
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    linkedInProfile: { type: String },
    gitHubId: { type: String },
     
    
    date: { type: Date, default: Date.now },
   
});

module.exports = mongoose.model('Intern', InternSchema);
