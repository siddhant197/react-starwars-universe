export const fetchHomePlanet = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch planet name.');

    const data = await response.json();
    return data;
  } catch {
    throw new Error('Failed to fetch planet name.');
  }
};
