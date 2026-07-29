import { Client } from '@notionhq/client';

// Logs quiz submissions to a Notion database.
// Env vars required (set in Vercel project settings): NOTION_API_KEY,
// NOTION_DATABASE_ID. The target database must be shared with the Notion
// integration that owns NOTION_API_KEY. See NOTION_SETUP.md.

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionApiKey || !databaseId) {
    res.status(200).json({
      success: true,
      notice: 'Submission received but not logged. Set NOTION_API_KEY and NOTION_DATABASE_ID in Vercel settings to record it in Notion.',
    });
    return;
  }

  try {
    const body = req.body ?? {};
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

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Failed to log submission to Notion:', error);
    res.status(500).json({ success: false, error: error.message || 'Submission error' });
  }
}
