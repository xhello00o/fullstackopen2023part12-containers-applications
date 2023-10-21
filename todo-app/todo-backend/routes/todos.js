const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

// GET todo_counter

router.get('/added_counter',async(req,res)=> {
  const added_todos = await redis.getAsync('added_todos')
  res.json({added_todos})
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let added_todos = await redis.getAsync('added_todos')
  if (added_todos) {
    added_todos = parseInt(added_todos) + 1 
    await redis.setAsync('added_todos',added_todos)
  } else {
    await redis.setAsync('added_todos',1)
  }
  
  res.send(todo);
});



const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  console.log(req)
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.status(200).json(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const bodyReq = req.body
  bodyReq.done = Boolean(bodyReq.done)
  console.log("🚀 ~ file: todos.js:46 ~ singleRouter.put ~ bodyReq:", bodyReq)
  const result = await req.todo.updateOne( bodyReq, {lean: true})
  console.log("🚀 ~ file: todos.js:47 ~ singleRouter.put ~ result:",typeof result)
  if (result.ok) {
    res.status(205).json({...req.todo.toJSON(),...bodyReq})
  }
  ; // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
