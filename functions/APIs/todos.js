const { db } = require('../util/admin')

// Get todos
exports.getAllTodos = (request, response) => {
    db.collection('todos').where('username', '==', request.user.username).orderBy('createdAt', 'desc').get()
    .then((data) => {
        let arrTodo = []

        data.forEach(doc => {
            arrTodo.push({
                todoId: doc.id,
                title: doc.data().title,
                body: doc.data().body,
                createdAt: doc.data().createdAt,
            })
        })

        return response.json(arrTodo)
    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ error: err.code })
    })
}

// Get one todo
exports.getOneTodo = (request, response) => {
    let objTodo = {}
    const document = db.doc(`/todos/${request.params.todoId}`).get()

    document
    .then(doc => {
        if (doc.exists) {
            objTodo = doc.data()
            return response.json(objTodo)
        } else {
            return response.status(404).json({ message: 'Document not found!' })
        }
    })
    .catch(err => {
        console.log(err)
        return response.status(500).json({ error: err.code })
    })
}

// Create todo
exports.postOneTodo = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty!' })
    }

    if (request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty!' })
    }

    const objTodo = {
        title: request.body.title,
        body: request.body.body,
        createdAt: new Date().toISOString(),
        username: request.user.username
    }

    db.collection('todos').add(objTodo)
    .then(doc => {
        const responseTodoItem = objTodo
        responseTodoItem.id = doc.id
        return response.json(responseTodoItem)
    })
    .catch(err => {
        console.log(err)
        return response.status(500).json({ error: 'Something went wrong!' })
    })

}

// Delete todo
exports.deleteTodo = (request, response) => {
    const document = db.doc(`/todos/${request.params.todoId}`)
    
    document.get()
    .then(doc => {
        if (doc.exists) {
            if (doc.data().username !== request.user.username) {
                return response.status(403).json({ error: 'Unauthorized' })
            } else {
                return document.delete()
            }
        } else {
            return response.status(404).json({ error: 'Document not found' })
        }
    })
    .then(() => {
        response.json({ message: 'Document deleted successfully!' })
    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ error: err.code })
    })
}

// Edit todo
exports.editTodo = (request, response) => {
    if (request.body.todoId || request.body.createdAt) {
        return response.status(403).json({ message: 'Field can not be modified' })
    }

    let document = db.doc(`/todos/${request.params.todoId}`)
    
    document.update(request.body)
    .then(() => {
        response.json({ message: 'Document updated successfully!' })
    })
    .catch(err => {
        console.log(err);
        return response.status(500).json({ error: err.code })
    })
}