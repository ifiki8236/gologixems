from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import threading
from email_server import *

class requestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        try:
            # headers for response and allowed clients
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
            self.send_header('Access-Control-Allow-Methods', 'OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            response = {'Success': 'Preflight request received'}
            response_body = json.dumps(response).encode('utf-8')
            self.wfile.write(response_body)

        except Exception as e:
            print(f'Error creating response: {e}')

    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            received_data = self.rfile.read(content_length)
            json_data = json.loads(received_data)
            response = {'Success': 'Data received without errors'}
            # print(json_data)
            #email server script
            #thread started
            email_thread = threading.Thread(target=self.threaded_email_function, args=(json_data,))
            email_thread.start()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
            self.end_headers()
            response_body = json.dumps(response).encode('utf-8')
            self.wfile.write(response_body)

        except json.JSONDecodeError as e:
            print(f'Format for JSON incorrect: {e}')
            response = {'ERROR': 'Data not in proper JSON form'}
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
            self.end_headers()
            response_body = json.dumps(response).encode('utf-8')
            self.wfile.write(response_body)
        except Exception as e:
            print(f'Error creating response: {e}')
    def threaded_email_function(self, json_data):
        print(json_data)
        send_application(json_data)

#method that stores and initializes server
def runServer():
    PORT = 9999
    try:
        server = HTTPServer(('', PORT), requestHandler)
        print(f'Starting server at http://localhost:{PORT}...')
        server.serve_forever()
    except Exception as e:
        print(f'Error with starting server: {e}')
#
if __name__ == '__main__':
    login()
    runServer()