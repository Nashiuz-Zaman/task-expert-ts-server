// imports
import PinnedTaskModel from '../../models/PinnedTask/PinnedTask';

const removePinnedTask = async (req, res) => {
   try {
      if (req.decoded.email !== req.query.email) {
         return res
            .status(403)
            .send({ status: 'error', message: 'Forbidden Access' });
      }

      const filter = { _id: req.params.id };
      const result = await PinnedTaskModel.deleteOne(filter);

      if (!result.deletedCount) {
         return res
            .status(404)
            .send({ status: 'failed', message: 'Task not deleted' });
      }

      return res.send({ status: 'success' });
   } catch (error) {
      return res.status(500).send({ status: 'error' });
   }
};

export default removePinnedTask;
