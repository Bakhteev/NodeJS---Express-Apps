const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

const dbURL =
  'mongodb+srv://bogdan:323694m@blogs.qwr9y.mongodb.net/Blogs_Node_Js?retryWrites=true&w=majority'

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log('err', err))

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded())

app.use(morgan('dev'))

const links = [
  { text: 'Home', link: '/' },
  { text: 'Articles', link: '/about' },
  { text: 'Create', link: '/blogs/create' },
]

app.get('/', (request, responce) => {
  Blog.find().then((result) =>
    responce.render('index', { blogs: result, links })
  )
})

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body)
  blog.save().then(() => {
    res.redirect('/blogs')
  })
})

app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    imgUrl: '/img/computer.png',
    date: 'May 20th 2020',
  })
  blog.save().then((result) => res.send(result))
})

app.get('/blogs', (req, res) => {
  Blog.find().then((result) => res.render('index', { blogs: result, links }))
})
app.get('/about', (req, res) => {
  Blog.find().then((result) => res.render('about', { blogs: result, links }))
})
app.get('/blogs/create', (req, res) => {
  res.render('create').status(200)
})
app.get('/blogs/:id', (req, res)=>{
  const id = req.params.id
  Blog.findById(id).then((result)=> res.render('blogDetails', {blog: result, links}))
})
app.use((req, res) => {
  res.status(404).render('404')
})
