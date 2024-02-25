from http.server import BaseHTTPRequestHandler, HTTPServer
import sqlite3
import json
import traceback

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/check_cmd':
            self.handle_new_endpoint_post()
        else:
            pass
        
    def handle_new_endpoint_post(self):
        try:
            # self.send_response(200)
            # self.send_header('Content-type', 'application/json')
            # self.end_headers()

            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            lines = post_data.split('\r\n')

            data = {}

            for line in lines:
                line = line.strip('{}').replace('"', '')
                print(line)
                if line:
                    key_value = line.split(': ')
                    if len(key_value) == 2:
                        key, value = key_value
                        data[key] = value
            
            print()
            
            res = cur.execute(data['cmd'])
            
            s = str(res.fetchone())[2:-3]   # get rid of tuple jazz

            response_data = {'message': s}
            print(json.dumps(response_data).encode('utf-8'))
            
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            
        except Exception as e:
            print(traceback.format_exc())

def run_server():
    server_address = ('', 8001)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print('Starting server on port 8001...')
    httpd.serve_forever()

if __name__ == '__main__':
    con = sqlite3.connect("tutorial.db")
    cur = con.cursor()

    run_server()