# RTSP Video Streaming Server

This project sets up an RTSP video streaming server using Node.js, Express, and the RTSP Relay library.

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Installation

1. Clone the repository or download the code files to your local machine.
2. Open a terminal and navigate to the project directory.
3. Install the necessary dependencies by running:

    ```sh
    npm install express express-status-monitor rtsp-relay
    ```

## Configuration

The RTSP stream URL and additional FFmpeg flags are configured in the code. Ensure you replace the `url` parameter with your actual RTSP stream URL. For example:

```javascript
const handler = proxy({
  url: 'rtsp://admin:abcd1234@sanbongthanhcong.cameraddns.net:555/Streaming/Channels/101',
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
```

Running the Server
Start the server by running:

```node server.js```
The server will start running on port 8080. Open your web browser and navigate to http://localhost:8080 to view the video stream.

Project Structure
server.js: Main server file that sets up the Express server and RTSP proxy.
Additional Notes:
Ensure your RTSP stream URL is correct and accessible from your server.
Adjust the FFmpeg flags as needed to optimize video quality and performance based on your requirements and available resources.
Enter /status to see the performance status of the web interface.

License
This project is licensed under the MIT License.
