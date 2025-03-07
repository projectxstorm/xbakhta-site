/**
 * Utility functions for saving and loading data from JSON files via API
 */

// Function to save data to a JSON file
export async function saveToJsonFile<T>(type: string, content: T): Promise<{success: boolean, message: string}> {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, content }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error saving ${type} data:`, errorData);
      return {
        success: false,
        message: `Failed to save ${type} data: ${errorData.error || 'Unknown error'}`
      };
    }
    
    console.log(`Successfully saved ${type} data to JSON file`);
    return {
      success: true,
      message: `Successfully saved ${type} data`
    };
  } catch (error) {
    console.error(`Error saving ${type} data:`, error);
    return {
      success: false,
      message: `Error saving ${type} data: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Function to load data from a JSON file
export async function loadFromJsonFile<T>(type: string): Promise<T | null> {
  try {
    console.log(`Attempting to load ${type} data...`);
    
    const response = await fetch(`/api/data?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Disable caching to always get fresh data
    });
    
    console.log(`Load request for ${type} returned status: ${response.status}`);
    
    if (response.status === 404) {
      console.log(`No data found for ${type}, using defaults`);
      return null;
    }
    
    if (!response.ok) {
      let errorMessage = `HTTP error ${response.status}`;
      try {
        const errorData = await response.json();
        console.error(`Error loading ${type} data:`, errorData);
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {
        console.error(`Failed to parse error response for ${type}:`, jsonError);
      }
      console.error(`Failed to load ${type} data: ${errorMessage}`);
      return null; // Return null instead of throwing to prevent app crashes
    }
    
    let data;
    try {
      data = await response.json();
      console.log(`Successfully loaded ${type} data from JSON file`);
      
      if (!data.content) {
        console.error(`Data received for ${type} has no content property:`, data);
        return null;
      }
      
      return data.content as T;
    } catch (jsonError) {
      console.error(`Error parsing JSON for ${type}:`, jsonError);
      console.error(`Raw response:`, await response.text());
      return null;
    }
  } catch (error) {
    console.error(`Network error loading ${type} data:`, error);
    return null;
  }
} 