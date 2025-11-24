import express from 'express';
import { 
  getAllUsersHandler, 
  getCurrentUserHandler, 
  updateCurrentUserHandler, 
  deleteCurrentUserHandler, 
  getCurrentUserReviewsHandler,
  updateUserRoleHandler 
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import { validateUserUpdate, validateRoleUpdate } from '../middleware/userValidators.js';

const router = express.Router();

// Admin only route
router.get('/', authenticate, authorizeRoles('admin'), getAllUsersHandler);

// User-specific routes (authenticated users only)
router.get('/me', authenticate, getCurrentUserHandler);
router.put('/me', authenticate, validateUserUpdate, updateCurrentUserHandler);
router.delete('/me', authenticate, deleteCurrentUserHandler);
router.get('/me/reviews', authenticate, getCurrentUserReviewsHandler);

// Admin only route for updating user roles
router.patch('/:id/role', authenticate, authorizeRoles('admin'), validateRoleUpdate, updateUserRoleHandler);

export default router;


