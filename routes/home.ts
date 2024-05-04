import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'My Express App',
        message: 'Hello'
    });
});

export default router;