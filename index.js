const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2ijdq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err)
  const adminCollection = client.db("photography").collection("admin");
  const serviceCollection = client.db("photography").collection("services");
  const reviewCollection = client.db("photography").collection("reviews");
  const bookingCollection = client.db("photography").collection("bookings");
  //console.log('successful')


  app.get('/service', (req, res) => {
    serviceCollection.find({})
    .toArray((err, items) => {
        res.send(items)
    })
})

app.get('/review', (req, res) => {
  reviewCollection.find({})
  .toArray((err, items) => {
      res.send(items)
  })
})

app.get('/allBooking', (req, res) => {
  bookingCollection.find({})
  .toArray((err, items) => {
      res.send(items)
  })
})


app.get('/bookings', (req, res) => {
  console.log(req.query.email);
  bookingCollection.find({email: req.query.email})
  .toArray((err, documents) => {
      res.send(documents)
  })
})


  app.post('/addAdmin', (req, res) => {
    const admin = req.body;
      console.log(admin)
      adminCollection.insertOne(admin)
      .then(result => {
        //console.log('data added successfully');
        res.send('success');
      })
    })

      app.post('/addService', (req, res) => {
        const service = req.body;
          console.log(service)
          serviceCollection.insertOne(service)
          .then(result => {
            //console.log('data added successfully');
            res.send('success');
          })
        })

        app.post('/addReview', (req, res) => {
          const review = req.body;
            console.log(review)
            reviewCollection.insertOne(review)
            .then(result => {
              //console.log('data added successfully');
              res.send('success');
            })
          })

          app.post('/addBooking', (req, res) => {
            const booking = req.body;
              console.log(booking)
              bookingCollection.insertOne(booking)
              .then(result => {
                console.log('data added successfully');
                res.send('success');
              })
            })
  

            app.post('/isAdmin', (req, res) => {
              const email = req.body.email;
              adminCollection.find({email: email})
                .toArray((err, admins) => {
                  res.send(admins.length > 0);
                })
            })
  




//   client.close();
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})