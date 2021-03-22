import express from "express";


const router = express.Router();

//controllers
import { showMessage } from '../controllers/auth';

router.get('/',showMessage);

module.exports = router;