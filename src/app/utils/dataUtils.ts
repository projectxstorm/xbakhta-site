/**
 * Utility functions for saving and loading data from JSON files via API
 */

// Function to save data to a JSON file
export async function saveToJsonFile<T>(type: string, content: T): Promise<void> {
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
      throw new Error(`Failed to save ${type} data`);
    }
    
    console.log(`Successfully saved ${type} data to JSON file`);
  } catch (error) {
    console.error(`Error saving ${type} data:`, error);
    throw error;
  }
}

// Function to load data from a JSON file
export async function loadFromJsonFile<T>(type: string): Promise<T | null> {
  try {
    const response = await fetch(`/api/data?type=${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.status === 404) {
      console.log(`No data found for ${type}, using defaults`);
      return null;
    }
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Error loading ${type} data:`, errorData);
      throw new Error(`Failed to load ${type} data`);
    }
    
    const data = await response.json();
    console.log(`Successfully loaded ${type} data from JSON file`);
    return data.content as T;
  } catch (error) {
    console.error(`Error loading ${type} data:`, error);
    return null;
  }
} 