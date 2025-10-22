export interface SmartBuoyStatistics {
  numberOfDevices: number;
  numberOfBuoys: number;
  numberOfBookings: number;
}

const DEFAULT_API_URL = 'https://core-api.dev.smartbuoy.eu/statistics';
const DEFAULT_API_KEY = '2d29a429-7337-4777-867e-ecdd6808025d';

const buildStatisticsUrl = (baseUrl: string, apiKey?: string) => {
  try {
    const url = new URL(baseUrl);

    if (apiKey && !url.searchParams.has('apiKey')) {
      url.searchParams.set('apiKey', apiKey);
    }

    return url.toString();
  } catch (error) {
    console.error('[statistics] Invalid statistics API url', error);
    return baseUrl;
  }
};

export const fetchStatistics = async (): Promise<SmartBuoyStatistics | null> => {
  const apiUrl = import.meta.env.STATISTICS_API_URL ?? DEFAULT_API_URL;
  const apiKey = import.meta.env.STATISTICS_API_KEY ?? DEFAULT_API_KEY;

  const requestUrl = buildStatisticsUrl(apiUrl, apiKey);

  try {
    const response = await fetch(requestUrl, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[statistics] Request failed', response.status, response.statusText);
      return null;
    }

    const data = (await response.json()) as SmartBuoyStatistics;

    if (
      typeof data?.numberOfBookings !== 'number' ||
      typeof data?.numberOfBuoys !== 'number' ||
      typeof data?.numberOfDevices !== 'number'
    ) {
      console.error('[statistics] Received malformed payload', data);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[statistics] Failed to fetch statistics', error);
    return null;
  }
};
