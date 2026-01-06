var multer  = require('multer')
const path = require('path');


var storage = multer.diskStorage({

    fileFilter: function (req, file, cb) {
        if (path.extension(file.originalname) !== '.pdf') {
          return cb(new Error('Only pdfs are allowed'))
        }
    
        cb(null, true)
      },




    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = ''; // set default extension (if any)
        if (file.originalname.split(".").length>1) // checking if there is an extension or not.
            ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
})
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {

      
        cb(null, true);


            // if (file.mimetype == "application/pdf") {
            //     cb(null, true);
            // } else {
            //     console.log('salah file')
            //     return cb(new Error('Only .pdf format allowed!'));
            // }


   




      }

});

module.exports = upload;