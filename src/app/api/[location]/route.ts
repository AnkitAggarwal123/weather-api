// pages/api/[location].js
import { NextRequest,NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { location: string } }) {
  const location = params.location; // Extract the dynamic parameter

//   const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `http://api.weatherapi.com/v1/forecast.json?key=5f8554e2a21e417eae3100613243105&q=${location}&days=6&aqi=yes&alerts=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return NextResponse.json(data, {status: 200});
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 }); 
  }
}