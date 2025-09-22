import { API_CONFIG } from '../config/api';
export const wakeUpBackend = async (): Promise<void> => {
  try {
    const healthUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`;
    await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000), 
    });
    
  } catch (error) {
  }
};

export const initializeBackendWakeup = (): void => {
  wakeUpBackend();
};