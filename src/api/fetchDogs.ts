import axios from 'axios';

export const fetchDogs = async ({ limitNumber }: any) => {
  try {
    const response = await axios.get('https://api.thedogapi.com/v1/images/search', {
      params: {
        limit: limitNumber,
        size: 'small',
        has_breeds: true,
      },
      headers: {
        'x-api-key': import.meta.env.VITE_THEDOG_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error API dogs:', error);
  }
};
