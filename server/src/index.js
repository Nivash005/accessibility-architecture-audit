import express from 'express';
import cors from 'cors';
import { listServices } from './services.js';

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ ok: true });
});

app.get('/api/services', (_request, response) => {
  response.json(listServices());
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log('Service catalogue API listening on http://localhost:' + port);
});
