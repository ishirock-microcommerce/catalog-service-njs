import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import { RegisterRoutes} from "./routes/routes";
import * as swaggerUI from "swagger-ui-express";
import { mongoose, mongoDbUri } from './config/database';   

let app: express.Express = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());


RegisterRoutes(app);

const swaggerJSON = require('./swagger/swagger.json');

app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

mongoose.connection.once('open', function() {
    console.info(`Connected to ${mongoDbUri}.`)
    app.emit('ready')
  })
  

export default app;