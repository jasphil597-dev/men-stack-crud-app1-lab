import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
	name: String,
	isAvailable: Boolean,
});

const Car = mongoose.model('Car', carSchema);

export default Car;

// import mongoose from 'mongoose';

// const carSchema = new mongoose.Schema({
// 	model: { type: String, required: true },
// 	brand: { type: String, required: true },
// 	year: { type: Number, required: true },
// 	color: { type: String, required: true }, // Color selection
// });

// const Car = mongoose.model('Car', carSchema);

// export default Car;
