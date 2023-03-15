const myForm = document.getElementById('myForm');
const avatar = document.getElementById("avatar");
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    const response = fetch('http://localhost:4000/upload', {
        method: 'POST', body: formData
    })
    response.then()
})
const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    avatar.src = base64;
};
const myFile = document.getElementById('myFile');
myFile.addEventListener('change', (e) => {
    uploadImage(e);
});

function getNewToken() {
    fetch('http://localhost:4000').then(a => {

    })
}
function isLogged() {
    //localet storage ga token 
    const token='';
    if (!token) {
        window.location.href = "login.html";
    }
}
isLogged();