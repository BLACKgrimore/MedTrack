import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    console.log("This is the log kept by tech head1;:")
    cb(null, "./public/temp")
    console.log("This is the log kept by tech head2;:")
    // console.log(req)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)  // Ensure unique file name
  }
})

export const upload = multer({ storage: storage })