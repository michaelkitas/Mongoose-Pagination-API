const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose.connect(
  "mongodb+srv://test:test@cluster0.lvvgf.mongodb.net/sample_airbnb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const ListingsSchema = new mongoose.Schema({
  _id: String,
  listing_url: String,
  name: String,
  summary: String,
  space: String,
  description: String,
  neighborhood_overview: String,
  notes: String,
  transit: String,
  access: String,
  interaction: String,
  house_rules: String,
  property_type: String,
  room_type: String,
  bed_type: String,
  minimum_nights: String,
  maximum_nights: String,
  cancellation_policy: String,
  last_scraped: Date,
  calendar_last_scraped: Date,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
  number_of_reviews: Number,
  bathrooms: Number,
  amenities: Array,
  square_feet: Number,
  price: Number,
  security_deposit: Number,
  cleaning_fee: Number,
  extra_people: Number,
  guests_included: Number,
  images: Object,
  host: Object,
  availability: Object,
  review_scores: Object,
  reviews: Array,
});

const Listings = mongoose.model(
  "listingsAndReviews",
  ListingsSchema,
  "listingsAndReviews"
);

app.get("/listings/:page/:limit", (req, res) => {
  const page = parseInt(req.params.page);
  const limit = parseInt(req.params.limit) + 1;

  //implement pagination
  Listings.find({
    amenities: { $in: ["TV"] },
  })
    .skip(page * limit)
    .limit(limit)
    .exec((err, listings) => {
      if (err) {
        res.status(500).send(err);
      } else {

        Listings.estimatedDocumentCount({
          amenities: { $in: ["TV"] },
        }).exec((err, count) => {

          if (err) {
            console.log(err);}

          res.status(200).send({
            listings: listings,
            total: count,
          });
        });
      }
    });
});

app.listen(3000, () => {
  console.log("API is running on port 3000");
});
