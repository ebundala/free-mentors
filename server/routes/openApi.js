
import Express from 'express';
import swaggerUi from 'swagger-ui-express';

const YAML = require('yamljs');

const openApiSpec = YAML.load('openapi.yaml');
const router = Express.Router();
router.use('/api/v1/api-docs', swaggerUi.serve);
router.get('/api/v1/api-docs', swaggerUi.setup(openApiSpec));

export default router;
