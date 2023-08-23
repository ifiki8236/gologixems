const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const choice = document.getElementById('choices');
const resume = document.getElementById('myFile');
const submit_button = document.getElementById('submitBttn');

const inputs = document.getElementsByTagName('input');

function pdfToByteCode(resume, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const byteData = new Uint8Array(event.target.result);
        const base64Data = byteCodeToBase64(byteData);
        callback(base64Data);
    };

    reader.readAsArrayBuffer(resume);

    function byteCodeToBase64(byteData) {
        let binary = '';
        const bytes = new Uint8Array(byteData);
        const len = bytes.byteLength;
    
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
    
        return btoa(binary);
    }
}
function check_all_fields(inputs, choice, applicationData) { 
    let not_empty = true;
    if (inputs[0].value == '' || choice.value == 'empty-option') {
        not_empty = false;
    }
    else {
        for (let i = 1; i < inputs.length && not_empty === true; i++) {
        if(inputs[i].value == '') {
            not_empty = false;
            console.log('this is empty')
        } else {
            console.log('not empty', inputs[i].value)
            }
        }
    } 
    if (not_empty == true) {
        console.log('all fields full')
        to_json(applicationData);
    } else {
        alert('One or more fields are empty!')
    }
}

function to_json(applicationData) {
    fetch('http://localhost:9999', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Server:', data);
        alert('SUBMITTED!')
    }) 
    .catch(error => {
        console.error('ERROR:', error);
    })
}
function pull_from_DOM(event) {
    event.preventDefault();
    let resume_uploaded = true;
    const applicationData = {
        'First Name': first_name.value,
        'Last Name': last_name.value,
        'Email': email.value,
        'Phone Number': phone.value,
        'Position Chosen': choice.value
    };
    try {
        pdfToByteCode(resume.files[0], function(base64Data) {
        applicationData.Resume = base64Data;
        });
    } catch(error) {
        alert('Resume Field Cannot be Empty!', error);
        console.error('Resume field empty!', error)
        resume_uploaded = false;
    }
    if (resume_uploaded) {
        check_all_fields(inputs, choice, applicationData);
    }
    console.log()
}
 submit_button.addEventListener('click', pull_from_DOM)
