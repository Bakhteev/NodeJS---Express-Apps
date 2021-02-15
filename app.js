const express = require('express')
const morgan = require('morgan')

// express app
const app = express()

// listen for requests
app.listen(3000)

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(morgan('dev'))

const links = [{text:'Home', link:'/'},{text:'Articles', link:'/about'}]

const blogs = [
  {
    img: '/img/computer.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
  {
    img: '/img/peoples.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
  {
    img: '/img/computer2.png',
    title: 'long established',
    description:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    time: 'May 20th 2020',
  },
]

app.get('/', (request, responce) => {
  responce.render('index', { blogs, links }).status(200)
})
app.get('/about', (req, res) => {
  res.render('about', { blogs }).status(200)
})
app.get('/blogs/create', (req, res) => {
  res.render('create').status(200)
})
app.use((req, res) => {
  res.status(404).render('404')
})
