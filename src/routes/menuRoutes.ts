import { Router } from 'express';
import { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem, checkHealth } from '../controllers/menuController';

const router = Router();

// Create a new menu item
router.post('/', createMenuItem);

// Get all menu items
router.get('/get-items', getMenuItems);

// Update a menu item by ID
router.put('/update-item/:id', updateMenuItem);

// Delete a menu item by ID
router.delete('/remove-item/:id', deleteMenuItem);

// check health
router.get('/health', checkHealth);

export default router;
