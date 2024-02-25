from http.server import BaseHTTPRequestHandler, HTTPServer

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        response_data = {'message': 'Hello, World from Python!', 'data': data}
        self.wfile.write(json.dumps(response_data).encode('utf-8'))

def run_server():
    server_address = ('', 8001)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print('Starting server on port 8001...')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()