const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");
const Contact = require("../models/contactModal");
// importing all functions
const {
  getContact,
  createContact,
  updateContac,
  deleteContact,
  getContactId,
} = require("../controllers/contactController");

// using validate token
router.use(validateToken);

// get all contacts, create new contacts
router.route("/").get(getContact).post(createContact);
// get contact by id,delete save contact and uptade pre existing contact
router.route("/:id").get(getContactId).put(updateContac).delete(deleteContact);

// exoirting this routes
module.exports = router;
