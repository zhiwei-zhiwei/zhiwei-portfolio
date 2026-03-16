import { NextResponse } from 'next/server'

export async function POST() {
  // Mock contact endpoint
  return NextResponse.json({
    success: true,
    message: 'Message received!',
  })
}
