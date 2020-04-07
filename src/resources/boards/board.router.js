const router = require('express').Router();
const boardsService = require('./board.service');

router
  .get('/', async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
  .get('/:id', async (req, res) => {
    const board = await boardsService.getById(req.params.id);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({
        message: 'Board not found'
      });
    }
  })
  .post('/', async (req, res) => {
    const board = await boardsService.createBoard(req.body);
    res.status(200).json(board);
  })
  .put('/:id', async (req, res) => {
    const board = await boardsService.updateBoard(req.params.id, req.body);
    if (board) {
      res.status(200).json(board);
    } else {
      res.status(404).json({
        message: 'Board not found'
      });
    }
  })
  .delete('/:id', async (req, res) => {
    const board = await boardsService.deleteBoard(req.params.id);
    if (board) {
      res.sendStatus(204);
    } else {
      res.status(404).json({
        message: 'Board not found'
      });
    }
  });

module.exports = router;
