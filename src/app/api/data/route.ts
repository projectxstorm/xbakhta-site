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
} else {
  // Directory already exists
}

// Save data to a JSON file
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { type, content } = data;
    
    if (!type) {
      return NextResponse.json(
        { error: 'Missing required parameter: type' },
        { status: 400 }
      );
    }
    
    if (!content) {
      return NextResponse.json(
        { error: 'Missing required parameter: content' },
        { status: 400 }
      );
    }
    
    const filePath = path.join(DATA_DIR, `${type}.json`);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    } catch (fsError: unknown) {
      const errorMessage = fsError instanceof Error ? fsError.message : 'Unknown file system error';
      return NextResponse.json(
        { error: `File system error: ${errorMessage}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: `Data saved for ${type}` },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to save data: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Get data from a JSON file
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');
  
  try {
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
    
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      try {
        const content = JSON.parse(fileContents);
        return NextResponse.json(
          { success: true, type, content },
          { status: 200 }
        );
      } catch (parseError: unknown) {
        const errorMessage = parseError instanceof Error ? parseError.message : 'Failed to parse JSON';
        return NextResponse.json(
          { error: `Invalid JSON in file: ${errorMessage}` },
          { status: 500 }
        );
      }
    } catch (fsError: unknown) {
      const errorMessage = fsError instanceof Error ? fsError.message : 'Unknown file system error';
      return NextResponse.json(
        { error: `File system error: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to load data: ${errorMessage}` },
      { status: 500 }
    );
  }
} 