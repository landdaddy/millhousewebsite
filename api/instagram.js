module.exports = async function handler(request, response) {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=3600");

  if (!token || !userId) {
    response.status(200).json({ configured: false, items: [] });
    return;
  }

  const version = process.env.INSTAGRAM_GRAPH_VERSION || "v21.0";
  const url = new URL(`https://graph.facebook.com/${version}/${userId}/media`);
  url.searchParams.set("fields", "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp");
  url.searchParams.set("limit", "8");
  url.searchParams.set("access_token", token);

  try {
    const instagramResponse = await fetch(url);
    const payload = await instagramResponse.json();

    if (!instagramResponse.ok) {
      throw new Error(payload.error?.message || "Instagram request failed");
    }

    const items = (payload.data || [])
      .filter((item) => item.media_url || item.thumbnail_url)
      .map((item) => ({
        id: item.id,
        caption: item.caption || "",
        media_type: item.media_type,
        media_url: item.media_url,
        thumbnail_url: item.thumbnail_url || item.media_url,
        permalink: item.permalink,
        timestamp: item.timestamp
      }));

    response.status(200).json({ configured: true, items });
  } catch (error) {
    console.error(error);
    response.status(502).json({ configured: true, items: [] });
  }
};
