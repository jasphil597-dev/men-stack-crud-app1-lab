// NPM packages
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';
import methodOverride from 'method-override';

dotenv.config();

// Custom modules
import './db/connection.js';
import Car from './models/car.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));

// Home route
app.get('/', (req, res) => {
	res.render('index.ejs');
});

// New car template route
app.get('/cars/new', (req, res) => {
	res.render('cars/new.ejs');
});

app.get('/cars/:carId', async (req, res) => {
	const foundCar = await Car.findById(req.params.carId);
	res.render('cars/show.ejs', { car: foundCar });
});

app.get('/cars/:carId/edit', async (req, res) => {
	const foundCar = await Car.findById(req.params.fruitId);
	res.render('cars/edit.ejs', { car: foundCar });
});

app.get('/cars', async (req, res) => {
	const allCars = await Car.find();
	res.render('cars/index.ejs', { cars: allCars });
});

//  POST /cars
app.post('/cars', async (req, res) => {
	if (req.body.isAvailable === 'on') {
		req.body.isAvailable = true;
	} else {
		req.body.isAvailable = false;
	}
	await Car.create(req.body);
	res.redirect('/cars/new');
});

app.put('/cars/:carId', async (req, res) => {
	if (req.body.isAvailable === 'on') {
		req.body.isAvailable = true;
	} else {
		req.body.isAvailable = false;
	}

	// Update the fruit in the database
	await Car.findByIdAndUpdate(req.params.carId, req.body);

	// Redirect to the fruit's show page to see the updates
	res.redirect(`/cars/${req.params.carId}`);
});

// DELETE
app.delete('/cars/:carId', async (req, res) => {
	try {
		const id = req.params.carId;
		const deletedCar = await Car.findByIdAndDelete(id);

		res.status(200).redirect('/cars');
	} catch (error) {
		console.error(error);
		res.status(500).send('Could not delete the car');
	}
});

app.listen(3001, () => {
	console.log('Listening on port 3001');
});
