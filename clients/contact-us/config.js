var contact = require("./controllers/contact");
module.exports = function(app){
    app.get('/contact-us', contact.ContactController);
    app.post('/enquiry', contact.EnquiryController);
    app.post('/subscription', contact.SubScriptController);
}