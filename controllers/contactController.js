const Contact = require("../models/contactModal");
const asyncHandler = require("express-async-handler");
//@desc get all constact
// @route get /api/contact
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user._id });
  console.log("The request body is", req.body);
  res.status(200).json(contact);
});

//@desc create constact
// @route put /api/contact
// @access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all feilds required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user._id,
  });
  res.status(201).json(contact);
});

//@desc get constact by id
// @route get /api/contact/id
// @access private
const getContactId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.json(contact);
});

//@desc update constact
// @route put /api/contact/id
// @access private
const updateContac = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() != req.user._id) {
    res.status(403);
    throw new Error(
      "User dont have a permission to update other user contacts "
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc delete constact
// @route deelete /api/contact
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() != req.user._id) {
    res.status(403);
    throw new Error(
      "User dont have a permission to update other user contacts "
    );
  }
  await Contact.deleteOne({ _id: req.params._id });
  res.json({ msg: `delete Contact for ${req.params.id}` });
});

// @exporting all functions
module.exports = {
  getContact,
  createContact,
  getContactId,
  updateContac,
  deleteContact,
};
