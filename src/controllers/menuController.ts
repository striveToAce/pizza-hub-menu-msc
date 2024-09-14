import { Request, Response } from "express";
import Joi from "joi";
import {
  createMenuItemService,
  getMenuItemsService,
  updateMenuItemService,
  deleteMenuItemService,
} from "../services/menuService";
import { MenuItemSize, MenuItemType } from "../types/menu";

// Joi schema for validating menu items
const menuItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  size: Joi.string()
    .valid(...Object.values(MenuItemSize))
    .required(),
  type: Joi.string()
    .valid(...Object.values(MenuItemType))
    .required(),
});

// Create a new menu item
export const createMenuItem = async (req: Request, res: Response) => {
  const { error } = menuItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description, price, size, type } = req.body;

  try {
    const menuItem = await createMenuItemService({
      name,
      description,
      price,
      size,
      type,
    });
    return res.status(201).json(menuItem);
  } catch (error) {
    return res.status(500).json({ error: "Error creating menu item" });
  }
};

// Get all menu items
export const getMenuItems = async (req: Request, res: Response) => {
  try {
    const menuItems = await getMenuItemsService();
    return res.status(200).json(menuItems);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching menu items" });
  }
};

// Update a menu item by ID
export const updateMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { error } = menuItemSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, description, price, size, type } = req.body;

  try {
    const updatedMenuItem = await updateMenuItemService(id, {
      name,
      description,
      price,
      size,
      type,
    });
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    return res.status(200).json(updatedMenuItem);
  } catch (error) {
    return res.status(500).json({ error: "Error updating menu item" });
  }
};

// Delete a menu item by ID
export const deleteMenuItem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedMenuItem = await deleteMenuItemService(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    return res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting menu item" });
  }
};
