// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export type Car = {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  fuel_type: 'electricity';
  highway_mpg: number;
  make: string;
  model: string;
  year: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Car[]>
) {
  const cars = await getCars();
  res.status(200).json(cars);
}

export const getCars = async () => {
  const fuel_type = 'electricity';
  const url =
    'https://api.api-ninjas.com/v1/cars?limit=30&year=2021&fuel_type=' +
    fuel_type;
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': '1jWdoWTjNTSm4cOtrn6k0w==tajmBTGKuhTvdlWc',
    },
    cache: 'force-cache',
  });
  if (response.ok) {
    return await response.json();
  }
};
