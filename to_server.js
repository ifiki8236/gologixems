const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const choice = document.getElementById('choices');
const resume = document.getElementById('myFile');
const check_mark = document.getElementById('check-mark');
const submit_button = document.getElementById('submitBttn');
const inputs = document.getElementsByTagName('input');

check_mark.style.display = 'none'

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
            console.log('field filled')
            // console.log('not empty', inputs[i].value)
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

resume.addEventListener('change', function(){
    if(resume.files.length > 0) {
        check_mark.style.display = 'block';
        console.log('PDF uploading...')
    }
})

function to_json(applicationData) {
    console.log(applicationData)
    fetch('http://ifiki8236.pythonanywhere.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Response from Server:', data);
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = null
        }
        choice.value = 'empty-option';
        if(resume.files.length <= 0) {
            check_mark.style.display = 'none';
        }
        alert('SUBMITTED!');
    }) 
    .catch(error => {
        console.error('ERROR:', error);
    })
}
async function pull_from_DOM(event) {
    event.preventDefault();
    let resume_uploaded = true;
    const applicationData = {
        'Applicant': {
            'First Name': first_name.value,
            'Last Name': last_name.value,
            'Email': email.value,
            'Phone Number': phone.value,
            'Position Chosen': choice.value,
        }
    };
    
    try {
        const base64Data = await new Promise((resolve, reject) => {
            pdfToByteCode(resume.files[0], function(base64Data) {
                resolve(base64Data);
            });
        });
        applicationData.Applicant.Resume = base64Data;
    } catch(error) {
        alert('Resume Field Cannot be Empty!', error);
        // console.error('Resume field empty!', error)
        resume_uploaded = false;
    }
    
    if (resume_uploaded) {
        check_all_fields(inputs, choice, applicationData);
    }
}
 submit_button.addEventListener('click', pull_from_DOM)
