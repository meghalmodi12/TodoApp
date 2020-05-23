const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllTodos,
    getOneTodo,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetail
} = require('./APIs/users')

const auth = require('./util/auth')

// Todo
app.get('/todos', auth, getAllTodos)
app.get('/todo/:todoId', auth, getOneTodo)
app.post('/todo', auth, postOneTodo)
app.delete('/todo/:todoId', auth, deleteTodo)
app.put('/todo/:todoId', auth, editTodo)

// User
app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.post('/user/image', auth, uploadProfilePhoto)
app.get('/user', auth, getUserDetail)
app.put('/user', auth, updateUserDetail)

exports.api = functions.https.onRequest(app);