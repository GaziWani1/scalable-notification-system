import express from 'express'
import { PORT } from './config/env.js';
import errorHandler from './middleware/error.middleware.js';
import authRoutes from './routes/auth.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import connectToDatabase from './db/mongodb.js'
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}))
app.use(errorHandler);

app.use('/api/v1/users', authRoutes);
app.use('/api/v1/notifications',notificationRoutes );

app.listen(PORT , async () => {
    console.log(`App is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;