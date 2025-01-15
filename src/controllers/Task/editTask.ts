import TaskModel from './../../../models/Task/Task.js';

// basically updating a single task's status and lastUpdated
const editTask = async (req, res) => {
   try {
      // verify
      const filter = { _id: req.params.id };
      const taskToEdit = await TaskModel.findOne(filter);
      if (req.decoded.email !== taskToEdit.email) {
         return res
            .status(403)
            .send({ status: 'error', message: 'Forbidden Access' });
      }

      const editData = req.body;
      Object.assign(taskToEdit, editData);
      const updatedTask = await taskToEdit.save();

      if (!updatedTask) {
         return res
            .status(404)
            .send({ status: 'failed', message: 'Task not updated' });
      }

      return res.send({ status: 'success' });
   } catch (error) {
      return res.status(500).send({ status: 'error' });
   }
};

export default editTask;
