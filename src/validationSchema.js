import * as yup from 'yup';

const validationSchema = yup.object().shape({
  // name: yup.string().required(),
  // email: yup.string().email(),
  // username: yup.string().required(),
  // password: yup.string().required(),
  // passwordConfirm: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  // website: yup.string().url(),
  // createdOn: yup.date().default(function () {
  //   return new Date();
  // }),
  "mortgage-type": yup.string().required(),
  "agency-case-number": yup.string().required(),
  "lender-case-number": yup.string().required(),
  "amortization-type": yup.string().required(),
  "amount": yup.number().required().positive().integer(),
  "interest-rate": yup.number().required().positive(),
  "number-of-months": yup.number().required().positive().integer(),

  // ToDo Fix nested property-address
  "property-address-zip": yup.number().required().positive().integer(),
  "property-address-street": yup.string().required(),
  "property-address-city": yup.string().required(),
  "property-address-state": yup.string().required(),
  "year-built": yup.number().required().positive().integer(),
  "number-of-units": yup.number().required().positive().integer(),
  "legal-description": yup.string().required(),
  "purpose-of-loan": yup.string().required(),
  "property-will-be": yup.string().required(),
  "year-acquired": yup.number().required().positive().integer(),
  "original-cost": yup.number().required().positive().integer(),
});

export { validationSchema };
