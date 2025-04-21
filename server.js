const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// CORS 설정
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// 정적 파일 서빙
app.use(express.static('.'));

// API 엔드포인트
app.get('/api/rent-loan-rate', async (req, res) => {
  console.log('API 요청 받음:', req.query);
  
  try {
    const apiUrl = 'http://apis.data.go.kr/B551408/rent-loan-rate-info/rate-list?serviceKey=Fd9vStrV5WKcvb5kTCXeBBw1zyOOxNrOysX80lQ02PLaIWqI7PFfY7PlcJopX/3kd5FYkiHYt6QYbhItGuhIhQ==&numOfRows=10&pageNo=1&dataType=xml';
    console.log('공공데이터 API 요청 URL:', apiUrl);
    console.log('요청 파라미터:', req.query);

    const response = await axios.get(apiUrl, {
      params: req.query,
      headers: {
        'Accept': 'application/json'
      }
    });

    console.log('공공데이터 API 응답:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('API 호출 오류:', error.message);
    if (error.response) {
      console.error('응답 상태:', error.response.status);
      console.error('응답 데이터:', error.response.data);
    }
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || '알 수 없는 오류'
    });
  }
});

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log('API 엔드포인트: /api/rent-loan-rate');
}); 