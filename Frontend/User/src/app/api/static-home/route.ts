// Simple API route to serve a static home page
// This is a fallback for when the static generation fails

import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Slide - Transform Your Instagram Engagement</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background: linear-gradient(to bottom, #0a0f2d, #1e2455);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          color: white;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin-bottom: 2rem;
        }
        .button-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
        }
        .button-primary {
          background-color: #3b82f6;
          color: white;
        }
        .button-secondary {
          background-color: white;
          color: #0f172a;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Transform Your<br />Instagram Engagement<br />with Slide</h1>
        <p>
          Slide revolutionizes how you connect with your audience on Instagram. Automate 
          responses and boost engagement effortlessly, turning interactions into valuable business
          opportunities.
        </p>
        <div class="button-group">
          <a href="/dashboard" class="button button-primary">Get Started</a>
          <a href="#features" class="button button-secondary">Learn More</a>
        </div>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      'content-type': 'text/html',
    },
  });
}
