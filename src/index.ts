import express from 'express';
import {RespnseStatus} from './helper'
import usr_route from './routes/usr_route'
import tag_route from './routes/tag_route';
import content_route from './routes/content_route';
import link_route  from './routes/link_route'
import {connectDb} from './db'

const app = express();

app.use(express.json());


app.use('/api/v1/brain', usr_route);
app.use('/api/v1/brain', tag_route);
app.use('/api/v1/brain', content_route);
app.use('/api/v1/brain', link_route)

app.listen(3000,() => {
    console.log(`server is running on port 3000`);
    connectDb();
});





