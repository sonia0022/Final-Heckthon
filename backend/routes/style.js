// routes/hijabRoutes.js
import express from 'express';
import Hijab from '../models/hijabStyle.js'; // path model ka sahi rakhna

const router = express.Router();

// GET /api/hijabs - Get all hijabs
router.get('/', async (req, res) => {
  try {
    const hijabs = await Hijab.find({});
    res.status(200).json(hijabs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hijabs', error: error.message });
  }
});

// GET hijab by ID
router.get('/:id', async (req, res) => {
  try {
    const hijab = await Hijab.findById(req.params.id);
    if (!hijab) {
      return res.status(404).json({ message: 'Hijab not found' });
    }
    res.json(hijab);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;
