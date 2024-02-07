import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDPNDT8sJSIHTArrliqM-9kzccRLDQPbco",
    authDomain: "practica-profesional-dh.firebaseapp.com",
    projectId: "practica-profesional-dh",
    storageBucket: "practica-profesional-dh.appspot.com",
    messagingSenderId: "6636076810",
    appId: "1:6636076810:web:f6f3f82629ddd5da3644f3"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage();

const uploadCandidateImage = (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            // extrension del archivo
            const extention = file.name.split('.').pop();

            // nombre del archivo
            const fileName = `${Date.now()}.${extention}`;

            // ruta del archivo a guardarse en el storage
            const path = `candidates-images/${fileName}`

            // creamos una referencia con el storage y la ruta a guardarse
            const candidateImagesRef = ref(storage, path);

            // subimos el archivo a la nube
            const result = await uploadBytes(candidateImagesRef, file);
            console.log('result: ', result);

            // obtenemos la URL del archivo subido y retornamos
            const URL = await getDownloadURL(ref(storage, path));

            // retornamos como promesa resuelta con la URL del archivo
            return resolve(URL);
        } catch (error) {
            console.log(error);
            // retornamos como promesa rechazada con el error
            reject(error);
        }
    })
}

module.exports = { uploadCandidateImage };