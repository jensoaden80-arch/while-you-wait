import { Client } from '@notionhq/client';

// Logs quiz submissions to a Notion database.
// Env vars required (set in Vercel project settings): NOTION_API_KEY,
// NOTION_DATABASE_ID. The target database must be shared with the Notion
// integration that owns NOTION_API_KEY. See NOTION_SETUP.md.

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    return new Response(
      JSON.stringify({
        success: true,
        notice: 'Submission received but not logged. Set NOTION_API_KEY and NOTION_DATABASE_ID in Vercel settings to record it in Notion.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.json();
    const notion = new Client({ auth: notionApiKey });

    const richText = (value: string) => [{ text: { content: value } }];

    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: { title: richText(body.name || '') },
        Email: body.email ? { email: body.email } : { email: null },
        Q1: { rich_text: richText(body.q1 || '') },
        Q2: { rich_text: richText(body.q2 || '') },
        Q3: { rich_text: richText(body.q3 || '') },
        Q4: { rich_text: richText(body.q4 || '') },
        'Archetype Code': { rich_text: richText(body.code || '') },
        ...(body.archetype ? { 'Archetype Name': { select: { name: body.archetype } } } : {}),
      } as any,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Failed to log submission to Notion:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || 'Submission error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
