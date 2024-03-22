const yup = require("yup")

const car = {
    year: 200,
    model: "Hyundai",
    engine: "Petrol",
    price: 2000
  }

  const yupObject = yup.object().shape({
    price: yup.number(),
    year: yup.number().required(),
    model: yup.string().required(),
    engine: yup.string().required()
  })


  yupObject
  .validate(car)
  .then(function(value) {
    console.log(value); // returns car object
  })
  .catch(function(err) {
    console.log(err);
  });