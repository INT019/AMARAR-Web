import express from "express";
import mysql from "mysql";
import cors from "cors";

import multer from "multer";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// for access images to display
app.use("/backend/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// for image and file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "mainImage") {
      cb(null, "uploads/images/Obituary/mainImage");
    } else if (file.fieldname === "otherImages") {
      cb(null, "uploads/images/Obituary/otherImages");
    } else if (file.fieldname === "certificate") {
      cb(null, "uploads/docs/Obituary");
    } else if (file.fieldname === "r_mainImage") {
      cb(null, "uploads/images/remembrance/r_mainImage");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
  // host: 'localhost',
  // user: 'int019aadhira_amarar_admin',
  // password: 'amarar_admin01',
  // database: 'int019aadhira_amarar'

  host: "localhost",
  user: "root",
  password: "",
  database: "amarar",
});

//for display data on donations page
app.get("/viewdonation", (req, res) => {
  const q = "SELECT * FROM amarar.donations";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
});

// for post donations input data by donation form
app.post("/donations", (req, res) => {
  console.log("Received donation request:", req.body);
  const q =
    "INSERT INTO donations (username, email, type, comment) VALUES (?, ?, ?, ? )";
  const values = [
    req.body.username,
    req.body.email,
    req.body.type,
    req.body.comment,
    req.body.date,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json(err);
    }
    console.log("Insert successful");
    return res.status(200).json({ message: "Insert successful" });
  });
});

app.get("/donation/:id", (req, res) => {
  const sql = "SELECT * FROM donations WHERE ID = ?";

  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// for display data on obituary user dashboard page
app.get("/ob-fun", (req, res) => {
  const sql = "SELECT * FROM obituary WHERE o_ID = ?";

  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

//obituary
app.get(
  [
    "/read/:id",
    "/readDescription/:id",
    "/readPhotos/:id",
    "/readShare/:id",
    "/readTribute/:id",
  ],
  (req, res) => {
    const sql = "SELECT * FROM obituary WHERE o_ID = ?";

    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    });
  }
);

// for display data on remembrance user dashboard page
app.get("/re-fun", (req, res) => {
  const sql = "SELECT * FROM remembrance";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// for obituary form
app.post(
  "/obituary",
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "otherImages", maxCount: 5 },
    { name: "certificate", maxCount: 1 },
  ]),
  (req, res) => {
    console.log(req.files);
    // const mainImage = req.file.filename;
    // const certificate = req.file.filename;

    const otherImagesArray = req.files["otherImages"];
    const otherImages = otherImagesArray
      ? Array.isArray(otherImagesArray)
        ? otherImagesArray.map((file) => file.filename)
        : [otherImagesArray.filename]
      : [];

    // const mainImage = req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '';
    // const certificate = req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '';

    const sql =
      "INSERT INTO obituary (`fName`, `lName`, `dob`, `dod`, `country`, `city`, `religion`, `mainImage`, `otherImages`, `certificate`, `title`, `donation`, `description`, `userName`, `userEmail`, `contactNo`, `nic`, `createdTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

    const values = [
      req.body.fname,
      req.body.lname,
      req.body.dob,
      req.body.dod,
      req.body.country,
      req.body.city,
      req.body.religion,
      req.files["mainImage"] ? req.files["mainImage"][0].filename : "",
      // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].buffer : '',
      JSON.stringify(otherImages),
      //JSON.stringify( req.files[ 'otherImages' ] ? req.files[ 'otherImages' ].map( file => file.filename ) : [] ),
      req.files["certificate"] ? req.files["certificate"][0].filename : "",
      // req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].buffer : '',
      req.body.title,
      req.body.donation,
      req.body.description,
      req.body.name,
      req.body.email,
      req.body.contactNo,
      req.body.nic,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.json(err);
      }

      return res.json(result);
    });
  }
);

// for remembrance form
app.post("/remembrance", upload.single("r_mainImage"), (req, res) => {
  console.log(req.file);

  const sql =
    "INSERT INTO remembrance (`fName`, `lName`, `dob`, `dod`, `country`, `city`, `religion`, `r_mainImage`, `title`, `description`, `userName`, `userEmail`, `contactNo`, `nic`, `createdTime`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";

  const values = [
    req.body.fname,
    req.body.lname,
    req.body.dob,
    req.body.dod,
    req.body.country,
    req.body.city,
    req.body.religion,
    req.file ? req.file.filename : "",
    //req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '',
    // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].buffer : '',
    req.body.title,
    req.body.description,
    req.body.name,
    req.body.email,
    req.body.contactNo,
    req.body.nic,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.json(err);
    }

    return res.json(result);
  });
});

// for display data on obituary view post page

// --- Description
app.get(
  [
    "/read/:id",
    "/readPhotos/:id",
    //'/readShare/:id',

    "/readTribute/:id",
  ],
  (req, res) => {
    const sql = "SELECT * FROM obituary WHERE o_ID = ?";

    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    });
  }
);

app.get("/viewobituary", (req, res) => {
  const q = "SELECT * FROM amarar.obituary";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
});

app.get("/viewremembrance", (req, res) => {
  const q = "SELECT * FROM amarar.remembrance";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
});

//Admin login
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM admin WHERE Username = ? AND Password = ? ";

  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json("Login failed");
    if (data.length > 0) {
      return res.json("Login Successfull");
    } else {
      return res.json("No record");
    }
  });
});

// --- Donation (Kavishka)
app.get("/readDonation/:id", (req, res) => {
  const q = "SELECT * FROM donations";
  db.query(q, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
});

// for display data on remembrance view post page

// --- Description
app.get(
  ["/read-remembrance/:id", "/readTribute-remembrance/:id"],
  (req, res) => {
    const sql = "SELECT * FROM remembrance WHERE r_ID = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    });
  }
);

// for edit obituary form
app.put(
  "/edit/:id",
  // upload.fields( [
  //     { name: 'mainImage', maxCount: 1 },
  //     { name: 'otherImages', maxCount: 5 },
  //     { name: 'certificate', maxCount: 1 } ] ),
  (req, res) => {
    console.log(req.files);

    // const otherImagesArray = req.files[ 'otherImages' ];
    // const otherImages = otherImagesArray ? ( Array.isArray( otherImagesArray ) ? otherImagesArray.map( file => file.filename ) : [ otherImagesArray.filename ] ) : [];

    const sql =
      "UPDATE obituary SET `fName` =?, `lName` =?, `dob` =?, `dod` =?, `country` =?, `city` =?, `religion` =?, `title` =?, `donation` =?, `description` =?, `editedTime` =NOW() WHERE ID = ?";

    const id = req.params.id;
    db.query(
      sql,
      [
        req.body.fname,
        req.body.lname,
        req.body.dob,
        req.body.dod,
        req.body.country,
        req.body.city,
        req.body.religion,
        // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '',
        // JSON.stringify( otherImages ),
        // req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '',
        req.body.title,
        req.body.donation,
        req.body.description,
        // req.body.name,
        // req.body.email,
        // req.body.contactNo,
        // req.body.nic,
        id,
      ],
      (err, result) => {
        if (err) return res.json({ Message: "Error inside server" });
        return res.json(result);
      }
    );
  }
);

// for edit remembrance form
app.put("/edit-remembrance/:id", (req, res) => {
  console.log(req.file);

  const sql =
    "UPDATE remembrance SET `fName` =?, `lName` =?, `dob` =?, `dod` =?, `country` =?, `city` =?, `religion` =?, `title` =?, `description` =?, `editedTime` =NOW() WHERE r_ID = ?";

  const id = req.params.id;
  db.query(
    sql,
    [
      req.body.fname,
      req.body.lname,
      req.body.dob,
      req.body.dod,
      req.body.country,
      req.body.city,
      req.body.religion,
      // req.files[ 'mainImage' ] ? req.files[ 'mainImage' ][ 0 ].filename : '',
      // JSON.stringify( otherImages ),
      // req.files[ 'certificate' ] ? req.files[ 'certificate' ][ 0 ].filename : '',
      req.body.title,
      req.body.description,
      // req.body.name,
      // req.body.email,
      // req.body.contactNo,
      // req.body.nic,
      id,
    ],
    (err, result) => {
      if (err) return res.json({ Message: "Error inside server" });
      return res.json(result);
    }
  );
});

// for delete obituary post
app.delete("/delete-obituary/:id", (req, res) => {
  const sql = "DELETE FROM obituary WHERE o_ID = ?";

  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

// for delete remembrance post
app.delete("/delete-remembrance/:id", (req, res) => {
  const sql = "DELETE FROM remembrance WHERE r_ID = ?";

  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });
    return res.json(result);
  });
});

app.listen(8081, () => {
  console.log("listening on 8081");
});
