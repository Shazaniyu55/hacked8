import express from 'express';
// controllers
import deleteController from '../controller/delete.js';

const router = express.Router();

router
  .delete('/room/:roomId', deleteController.deleteRoomById)
  .delete('/message/:messageId', deleteController.deleteMessageById)

export default router;