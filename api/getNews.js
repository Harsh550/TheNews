// api/getNews.js

export default async function handler(req, res) {
    const { country, category, page, pageSize } = req.query;
  
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.status === "error") {
        return res.status(500).json({ error: data.message });
      }
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news." });
    }
  }
  