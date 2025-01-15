import TaskModel from './../../../models/Task/Task.js';

// basically updating a single task's status and lastUpdated
const updateTask = async (req, res) => {
   try {
      // verify
      const filter = { _id: req.params.id };
      const taskToUpdateStatusOf = await TaskModel.findOne(filter);
      if (req.decoded.email !== taskToUpdateStatusOf.email) {
         return res
            .status(403)
            .send({ status: 'error', message: 'Forbidden Access' });
      }

      // gather data
      const { lastUpdated, statusLevel } = req.body;
      const updatedStatusData = {
         lastUpdated,
         statusLevel: parseInt(statusLevel),
      };

      // updata task status
      Object.assign(taskToUpdateStatusOf, updatedStatusData);
      const updatedTask = await taskToUpdateStatusOf.save();

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

export default updateTask;
