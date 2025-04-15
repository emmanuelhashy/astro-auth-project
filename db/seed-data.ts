interface SeedVehicle {
  description: string;
  images: string[];
  stock: number;
  price: number;
  brand: string;
  slug: string;
  name: string;
  type: VehicleTypes;
  tags: string[];
}
type VehicleTypes = 'COUPE' | 'SEDAN' | 'SPORTS CAR' | 'CONVERTIBLE' | 'TRUCK' | 'STATION WAGON';

export const seedVehicles: SeedVehicle[] = [
  {
    description:
      'Sleek burgundy luxury car with multi-spoke rims in a minimalist beige and brown indoor setting, exuding elegance and modern design.',
    images: ['burgundy_1.jpeg', 'burgundy_2.jpeg'],
    stock: 7,
    price: 750,
    brand: 'Tesla',
    slug: 'luxury_burgundy_car',
    name: 'Luxury Burgundy Car',
    type: 'COUPE',
    tags: ['sleek vehicle', 'luxury car', 'modern design']
  },
  {
    description:
      'Sleek black SUV with futuristic design parked in front of a modern building with warm lighting and glass panels.',
    images: ['luxury_suv_1.jpeg', 'luxury_suv_2.jpeg'],
    stock: 3,
    price: 900,
    brand: 'Tesla',
    slug: 'range_rover_luxury_suv',
    name: 'Range Rover Luxury SUV',
    type: 'COUPE',
    tags: ['SUV', 'luxury car', 'modern design']
  },
  {
    description:
      'Front view of a vibrant orange sports car with sharp LED headlights, bold grille, and dramatic lighting in a dark setting.',
    images: ['nissan_sport_1.jpeg', 'nissan_sport_2.jpeg'],
    stock: 6,
    price: 1200,
    brand: 'Nissan',
    slug: 'nissan_sport_car',
    name: 'Nissan Sport Car',
    type: 'SPORTS CAR',
    tags: ['aerodynamics', 'sports', 'speed']
  },
]

