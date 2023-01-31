var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/signup',upload.single('profile') ,userController.SignUp);

router.post('/login', userController.Login);

router.get('/users', userController.secure, userController.allUsers);

router.get('/getuser', userController.secure, userController.user);

module.exports = router;
