const express = require('express');
const router = express.Router();

// GET all tags
router.get('/', (req, res) => {
  res.json({
    message: "GET all tags"
  });
});

// GET one tag
router.get('/:tagId', (req, res) => {
  res.json({
    message: "GET one tag"
  });
});

// POST a new tag
router.post('/', (req, res) => {
  res.json({
    message: "POST a new tag"
  });
});

// PATCH a tag
router.patch('/:tagId', (req, res) => {
  res.json({
    message: "PATCH a tag"
  });
});

// DELETE a tag
router.delete('/:tagId', (req, res) => {
  res.json({
    message: "DELETE tag"
  });
});

module.exports = router;