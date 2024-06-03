const express = require('express');
const app = express();
const expressStatusMonitor = require('express-status-monitor');
const rtspRelay = require('rtsp-relay');

app.use(expressStatusMonitor());
const { proxy, scriptUrl } = rtspRelay(app);

const handler = proxy({
  url: 'rtsp://user:password@youripordomain:port/Streaming/Channels/123',
  verbose: true,
  additionalFlags: [
    '-vf', 'scale=3840:2160,eq=saturation=1.5:contrast=1.2:brightness=0.05,unsharp=5:5:0.5:3', // Adjust saturation, contrast, brightness, and sharpen
    '-r', '30',
    '-b:v', '16000k', // Increased bitrate to improve quality
    '-preset', 'ultrafast', // Fastest encoding preset for reduced blocking effect
    '-crf', '18' // Lower CRF value for improved image quality
  ],
  transport: 'udp',
});

app.ws('/api/stream', handler);

app.get('/', (req, res) => {
  res.send(`
    <canvas id="canvas"></canvas>
    <script src="${scriptUrl}"></script>
    <script>
      loadPlayer({
        url: 'ws://' + location.host + '/api/stream',
        canvas: document.getElementById('canvas'),
        videoBufferSize: 3840 ** 2,
      });
    </script>
  `);
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
