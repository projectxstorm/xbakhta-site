import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Allow dynamic API routes in production
export const dynamic = 'force-dynamic';

// Directory to store JSON data files
const DATA_DIR = path.join(process.cwd(), 'public', 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log(`Created data directory at ${DATA_DIR}`);
} else {
  console.log(`Data directory exists at ${DATA_DIR}`);
}

// Save data to a JSON file
export async function POST(request: NextRequest) {
  console.log('Received POST request to /api/data');
  
  try {
    const data = await request.json();
    const { type, content } = data;
    
    if (!type) {
      console.error('Missing required parameter: type');
      return NextResponse.json(
        { error: 'Missing required parameter: type' },
        { status: 400 }
      );
    }
    
    if (!content) {
      console.error(`Missing required parameter: content for type ${type}`);
      return NextResponse.json(
        { error: 'Missing required parameter: content' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(DATA_DIR, `${type}.json`);
    console.log(`Writing to file: ${filePath}`);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
      console.log(`Successfully wrote to ${filePath}`);
    } catch (fsError: any) {
      console.error(`FS Error writing to ${filePath}:`, fsError);
      return NextResponse.json(
        { error: `File system error: ${fsError.message || 'Unknown file system error'}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: `Data saved for ${type}` },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: `Failed to save data: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}

// Get data from a JSON file
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  
  console.log(`Received GET request to /api/data for type: ${type}`);
  
  try {
    if (!type) {
      console.error('Missing required parameter: type');
      return NextResponse.json(
        { error: 'Missing required parameter: type' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(DATA_DIR, `${type}.json`);
    console.log(`Attempting to read file: ${filePath}`);
    
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      return NextResponse.json(
        { error: `No data found for ${type}` },
        { status: 404 }
      );
    }
    
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      console.log(`Successfully read file: ${filePath}`);
      
      try {
        const content = JSON.parse(fileContents);
        return NextResponse.json(
          { success: true, type, content },
          { status: 200 }
        );
      } catch (parseError: any) {
        console.error(`JSON parse error for ${filePath}:`, parseError);
        return NextResponse.json(
          { error: `Invalid JSON in file: ${parseError.message || 'Failed to parse JSON'}` },
          { status: 500 }
        );
      }
    } catch (fsError: any) {
      console.error(`FS Error reading ${filePath}:`, fsError);
      return NextResponse.json(
        { error: `File system error: ${fsError.message || 'Unknown file system error'}` },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error(`Error loading data for ${type}:`, error);
    return NextResponse.json(
      { error: `Failed to load data: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
} 