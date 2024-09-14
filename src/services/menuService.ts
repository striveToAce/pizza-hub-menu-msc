import { PrismaClient } from '@prisma/client';
import { MenuItemSize, MenuItemType } from '../types/menu';

const prisma = new PrismaClient();

// Create a new menu item
export const createMenuItemService = async (data: { name: string; description?: string; price: number; size: MenuItemSize; type: MenuItemType }) => {
  return await prisma.menuItem.create({
    data,
  });
};

// Get all menu items
export const getMenuItemsService = async () => {
  return await prisma.menuItem.findMany();
};

// Update a menu item
export const updateMenuItemService = async (id: string, data: { name?: string; description?: string; price?: number; size?: MenuItemSize; type?: MenuItemType }) => {
  return await prisma.menuItem.update({
    where: { id },
    data,
  });
};

// Delete a menu item
export const deleteMenuItemService = async (id: string) => {
  return await prisma.menuItem.delete({
    where: { id },
  });
};
