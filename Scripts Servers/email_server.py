import smtplib

#SMTP server start
def login():
    smtp_server = 'smtp.gmail.com'
    port = 587 #port for emails and SSL protocol
    myServer = smtplib.SMTP(smtp_server, port) #initialize server

    #host email and password
    host_email = 'akpannetwork@gmail.com'
    password = 'hqelfmbluipdsrsy'
    #client email 
    client_email = 'isedemidiong@gmail.com'

     #start SMTP server
    try:
        myServer.starttls()
        print('[Server Started]')
    except Exception as e:
        print(f'Error {e}')
        exit()

    #log in to email
    try:
        myServer.login(host_email, password)
        print('Login successful')
    except Exception as e:
        print(e)
        exit()
    return myServer, host_email, client_email

def send_application(applicant):
    myServer, host_email, client_email = login()  

    #compose email
    subject = ('New Applicant')
    body = (applicant)
    composed_email = f'Subject: {subject}\n\n{body}'

    #send email
    try:
        myServer.sendmail(host_email, client_email, composed_email)
        print('Email Sent!')
    except Exception as e:
        print(e)
        exit()
        
    #close server
    myServer.quit()
