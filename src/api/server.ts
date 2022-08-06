import express from 'express';
import { checkContentTypeIsJSON, checkContentTypeIsSet, checkEmptyPayload } from './middlewares/checks';
import handleError from './middlewares/handleError';
import v1Router from './v1';

const app = express();

app.use(express.json());

app.use(checkEmptyPayload);
app.use(checkContentTypeIsSet);
app.use(checkContentTypeIsJSON);

app.use(v1Router);

app.use((_, res) => res.status(404).json({ success: false, message: 'Route does not exist' }));

app.use(handleError);

export default app;
