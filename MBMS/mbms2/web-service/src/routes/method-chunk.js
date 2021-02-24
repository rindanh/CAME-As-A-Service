import MethodChunk from '../controllers/method-chunk';
import authMiddleware from '../utils/jwt';

module.exports = api => {
  api.route('/method-chunk').get(MethodChunk.getAll);
  api.route('/method-chunk/:name_id').get(MethodChunk.getOne);
  api.route('/method-chunk').post(authMiddleware, MethodChunk.insert);
  api.route('/method-chunk').put(authMiddleware, MethodChunk.edit);
  api.route('/method-chunk/:name_id').delete(authMiddleware, MethodChunk.delete);
  api.route('/method-chunk/publish/:name_id').post(MethodChunk.publish);
};
