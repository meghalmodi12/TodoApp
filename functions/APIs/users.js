const { admin, db } = require('../util/admin')
const config = require('../util/config')
const { validateLoginData, validateSignUpData } = require('../util/validators')
const firebase = require('firebase')

firebase.initializeApp(config)

// Login
exports.loginUser = (request, response) => {
    const objUser = {
        email: request.body.email,
        password: request.body.password
    }

    const { errors, valid } = validateLoginData(objUser)

    if (!valid) {
        return response.status(400).json(errors)
    } else {
        firebase
        .auth()
        .signInWithEmailAndPassword(objUser.email, objUser.password)
        .then(data => {
            return data.user.getIdToken()
        })
        .then(token => {
            return response.json({ token })
        })
        .catch(err => {
            console.log(err)
            return response.status(403).json({ general: 'Wrong credentials, please try again!' })
        })
    }
}

// Signup
exports.signUpUser = (request, response) => {
    const objUser = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        country: request.body.country,
        password:request.body.password,
        confirmPassword: request.body.confirmPassword,
        username: request.body.username
    }

    const { errors, valid } = validateSignUpData(objUser)

    if (!valid) {
        return response.status(400).json(errors)
    } else {
        let token, userId

        db.doc(`/users/${objUser.username}`).get()
        .then(doc => {
            if (doc.exists) {
                return response.status(400).json({ username: 'This username is already taken!' })
            } else {
                return firebase.auth().createUserWithEmailAndPassword(objUser.email, objUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid
            return data.user.getIdToken()
        })
        .then(idtoken => {
            token = idtoken
            const userCredentials = {
                firstName: objUser.firstName,
                lastName: objUser.lastName,
                username: objUser.username,
                phoneNumber: objUser.phoneNumber,
                country: objUser.country,
                email: objUser.email,
                createdAt: new Date().toISOString(),
                userId
            }

            return db.doc(`/users/${objUser.username}`).set(userCredentials)
        })
        .then(() => {
            return response.status(201).json({ token })
        })
        .catch(err => {
            console.log(err)

            if(err.code === 'auth/email-already-in-use') {
                return response.status(400).json({ email: 'Email already in use!' })
            } else {
                return response.status(500).json({ general: 'Something went wrong!' })
            }
        })
    }
}

// Upload profile photo
deleteImage = (imageName) => {
    const bucket = admin.storage().bucket()
    const path = imageName

    return bucket.file(path).delete()
    .then(() => {
        return
    })
    .catch(err => {
        return
    })
}

exports.uploadProfilePhoto = (request, response) => {
    const BusBoy = require('busboy')
    const path = require('path')
    const os = require('os')
    const fs = require('fs')
    const busboy = new BusBoy({ headers: request.headers })

    let imageFileName
    let imageToBeUploaded = {}

    busboy.on('file', (fieldName, file, fileName, encoding, mimeType) => {
        if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
            return response.status(400).json({ error: 'Wrong file type provided!' })
        }

        const imageExtension = fileName.split('.')[fileName.split('.').length - 1]
        imageFileName = `${request.user.username}.${imageExtension}`

        const filePath = path.join(os.tmpdir(), imageFileName)
        imageToBeUploaded = {filePath, mimeType}
        file.pipe(fs.createWriteStream(filePath))
    })

    //deleteImage(imageFileName)

    busboy.on('finish', () => {
        admin.storage().bucket()
        .upload(imageToBeUploaded.filePath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimeType
                }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/users/${request.user.username}`).update({ imageUrl })
        })
        .then(() => {
            return response.json({ message: 'Image uploaded successfully!' })
        })
        .catch(err => {
            console.log(err)
            return response.status(500).json({ error: err.code })
        })
    })

    busboy.end(request.rawBody)
}

// Get user details
exports.getUserDetail = (request, response) => {
    let objUser = {}

    db.doc(`/users/${request.user.username}`).get()
    .then(doc => {
        if (doc.exists) {
            objUser.userCredentials = doc.data()
            return response.json(objUser)
        }
    })
    .catch(err => {
        console.error(err);
		return response.status(500).json({ error: err.code });
    })
}

// Update user details
exports.updateUserDetail = (request, response) => {
    let document = db.doc(`/users/${request.user.username}`)

    document.update(request.body)
    .then(() => {
        return response.json({ message: 'Updated successfully!' })
    })
    .catch(err => {
        console.log(err)
        return response.status(500).json({ message: "Cannot Update the value" })
    })
}
