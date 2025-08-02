import { API_CONFIG } from '../config/api';

/**
 * Silent backend wake-up service for Render free-tier servers
 * Makes a single health check request to wake up sleeping backend
 * Designed to be fire-and-forget with no user-visible impact
 */

/**
 * Performs a silent health check to wake up the backend server
 * This function is designed to fail silently and not impact user experience
 */
export const wakeUpBackend = async (): Promise<void> => {
  try {
    // Create the health check URL
    const healthUrl = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`;
    
    // Make a simple GET request with minimal timeout
    // Using fetch directly to avoid the apiRequest wrapper's error logging
    await fetch(healthUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Short timeout to avoid blocking user experience
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });
    
    // If successful, backend is awake - no action needed
    // Success is silent, just like failures
    
  } catch (error) {
    // Silently ignore all errors:
    // - Network errors (backend sleeping)
    // - Timeout errors (backend taking too long to wake)
    // - Any other errors (CORS, etc.)
    // 
    // The goal is just to trigger the wake-up process
    // We don't need to know if it succeeded
  }
};

/**
 * Initiates backend wake-up process on app startup
 * Call this function as early as possible in your app lifecycle
 */
export const initializeBackendWakeup = (): void => {
  // Run immediately, but don't block app initialization
  wakeUpBackend();
};