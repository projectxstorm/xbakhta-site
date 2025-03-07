import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Directory to store JSON data files
const DATA_DIR = path.join(process.cwd(), 'public', 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Save data to a JSON file
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { type, content } = data;
    
    if (!type || !content) {
      return NextResponse.json(
        { error: 'Missing required parameters: type and content' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(DATA_DIR, `${type}.json`);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    
    return NextResponse.json(
      { success: true, message: `Data saved for ${type}` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    );
  }
}

// Get data from a JSON file
export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type');
    
    if (!type) {
      return NextResponse.json(
        { error: 'Missing required parameter: type' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(DATA_DIR, `${type}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `No data found for ${type}` },
        { status: 404 }
      );
    }
    
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    return NextResponse.json(
      { success: true, type, content },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error loading data:', error);
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    );
  }
} 