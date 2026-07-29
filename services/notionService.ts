
/**
 * Submits quiz results to Notion via the Vercel serverless function at
 * /api/submit (see api/submit.ts), which writes to the Quiz QnA database
 * using a Notion integration token. Credentials live in Vercel env vars,
 * never in the client bundle. See NOTION_SETUP.md to set that up.
 */

export const saveResultToNotion = async (data: any) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.notice) {
      console.warn(result.notice);
    } else if (!result.success) {
      console.error('Failed to log submission to Notion:', result.error);
    }
  } catch (error) {
    console.error('Failed to log submission to Notion:', error);
  }
};
