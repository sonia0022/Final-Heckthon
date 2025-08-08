import mongoose from 'mongoose';
import Hijab from './models/hijabStyle.js'; 
import dotenv from 'dotenv';
dotenv.config();
const hijabData = [
    {
        name: 'Elegant Satin',
        description: 'Smooth satin hijab, perfect for formal events',
        image: '',
    },
    {
        name: 'Casual Cotton',
        description: 'Breathable cotton hijab for everyday use',
        image: '',
    },
    {
        name: 'Sporty Jersey',
        description: 'Comfortable jersey hijab for active wear',
        image: '',
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI); // apni MongoDB URI yahan lagao

        // Purane data hata do taake duplicate na ho
        await Hijab.deleteMany({});

        // Naya data insert karo
        await Hijab.insertMany(hijabData);

        console.log('Hijab data seeded successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seed();
