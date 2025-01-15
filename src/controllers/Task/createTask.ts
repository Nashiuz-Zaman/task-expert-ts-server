import TaskModel from './../../../models/Task/Task.js';

const createTask = async (req, res) => {
   try {
      // verify
      const newTask = req.body;
      const email = newTask.email;
      if (req.decoded.email !== email) {
         return res
            .status(403)
            .send({ status: 'error', message: 'Forbidden Access' });
      }

      // gather data
      const filter = { email };

      // create task
      const newCreatedTask = await TaskModel.create(newTask);

      if (newCreatedTask._id) {
         // set the sorting order
         const sortOption = { lastUpdated: 1 };
         const tasks = await TaskModel.find(filter).sort(sortOption);
         return res.send({ status: 'success', tasks });
      }
   } catch (error) {
      return res.status(500).send({ status: 'error' });
   }
};

export default createTask;
