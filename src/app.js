 require("dotenv").config();
 const express = require("express");
 const cors = require("cors");
 const helmet = require("helmet");
 const bodyParser = require("body-parser");
 const rateLimit = require("express-rate-limit");
 const compression = require("compression");
 const path = require("path");
 const cookie = require("cookie-parser");
 const session = require("express-session");
 const MongoStore = require("connect-mongo");
 const morgan = require("morgan");
 const xss = require("xss-clean");
 const hpp = require("hpp");
 const mongoSanitize = require("express-mongo-sanitize");
 const ejs = require('ejs');

 const { attackMiddleware } = require("./middlewares/security.js");
 const { globalErrorHandler, notFoundHandler } = require("./middlewares/errorHandler.js");
 const { checkAppMode } = require("./middlewares/ui.js");



 const apiRouter = require("../src/routers/apiRouters.js");
 const viewRouter = require("../src/routers/viewRouters.js")

 // const MainRouter = express.Router();
 const app = express();

 // Rate Limiting
 const rateLimiter = rateLimit({
 	windowMs: 5 * 60 * 1000, // 5 minutes
 	max: 100, // limit each IP to 100 requests per window
 	message: 'Too many requests, please try again later',
 	standardHeaders: true,
 	legacyHeaders: false,
 });

 //  CORS Configuration
 const corsOptions = {
 	methods: ["DELETE", "GET", "POST", "PUT"],
 	allowedHeaders: ["Content-Type"],
 	optionsSuccessStatus: 200,
 	credentials: true,
 };

 // Trust proxy and template engine setup
 app.set("trust proxy", 1);
 app.engine('html', ejs.renderFile)
 app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views'));

 // Static File Serving
 app.use(express.static(path.join(__dirname, 'public')))

 // Security Middleware
 app.use(helmet({
 	contentSecurityPolicy: {
 		directives: {
 			defaultSrc: ["'self'"],
 			scriptSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://cdn.tailwindcss.com"],
 			styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://unpkg.com"],
 			imgSrc: ["'self'", "data:", "https:"],
 		},
 	},
 	referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
 }));


 // Middleware Setup
 app.use(xss());
 app.use(hpp());
 app.use(mongoSanitize());
 app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
 app.use(cors(corsOptions));
 app.use(compression());
 app.use(cookie());
 app.use(rateLimiter);
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(attackMiddleware);
 app.disable("x-powered-by");



 // Session Setup 
 app.use(
 	session({
 		secret: process.env.SESSION_SECRET,
 		resave: false,
 		saveUninitialized: false,
 		rolling: true, // Reset timer on each request
 		store: MongoStore.create({
 			mongoUrl: process.env.MONGODB_URI,
 			ttl: 24 * 60 * 60, // 1 day
 			autoRemove: "native",
 		}),
 		cookie: {
 			secure: process.env.NODE_ENV === "production",
 			maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
 			sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
 			httpOnly: true,
 		},
 	})
 );


 // Utility Routes
 app.get("/robots.txt", (req, res) => res.sendFile(path.join(__dirname, "/robots.txt")));

 // Enhanced Health Check
 app.get("/health", (req, res) => res.status(200).json({
 	status: 'healthy',
 	message: "Service is running 🚀",
 	timestamp: new Date().toISOString(),
 	uptime: process.uptime(),
 	memoryUsage: process.memoryUsage()
 }));



 // Main Routers
 app.use("/api", apiRouter);
 app.use("/", viewRouter)

 app.use(checkAppMode)
 app.use(globalErrorHandler); //error handler 
 app.use(notFoundHandler); // unknown routes
 module.exports = app;