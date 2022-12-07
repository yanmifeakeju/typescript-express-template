import express from 'express';
import { errorHandler } from '../handlers/requests/error';
import { checkContentTypeIsJSON, checkContentTypeIsSet, checkEmptyPayload } from './middlewares/checks';
import v1Router from './v1';

const app = express();

app.use(express.json());
app.use(checkContentTypeIsSet);
app.use(checkEmptyPayload);
app.use(checkContentTypeIsJSON);

app.use('/v1', v1Router);

app.use((_, res) => res.status(404).json({ success: false, message: 'Route does not exist' }));

app.use(errorHandler);

export default app;
