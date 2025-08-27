import express from 'express';
import { toDo } from '../models/todoModel.js';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const { title } = request.body;

    if (!title) {
      return response.status(400).json({ message: 'Send all required fields: title' });
    }

    const newToDo = await toDo.create({ title });

    return response.status(201).json(newToDo);

  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get('/', async (request, response) => {
  try {
    const todos = await toDo.find({});
    return response.status(200).json({ data: todos });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const { title } = request.body;

    if (!title) {
      return response.status(400).json({ message: 'You need to include request field: title' });
    }

    const updatedToDo = await toDo.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    if (!updatedToDo) {
      return response.status(404).json({ message: 'Todo not found' });
    }

    return response.status(200).json(updatedToDo);

  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const deletedToDo = await toDo.findByIdAndDelete(id);
    if (!deletedToDo) {
      return response.status(404).json({ message: 'Todo not found' });
    }

    return response.status(200).json(deletedToDo);

  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

export default router;