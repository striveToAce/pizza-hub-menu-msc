import { Router } from 'express';
import { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } from '../controllers/menuController';

const router = Router();

// Create a new menu item
router.post('/', createMenuItem);

// Get all menu items
router.get('/get-items/:type', getMenuItems);

// Update a menu item by ID
router.put('/item-details/:id', updateMenuItem);

// Delete a menu item by ID
router.delete('/remove-item/:id', deleteMenuItem);

export default router;
