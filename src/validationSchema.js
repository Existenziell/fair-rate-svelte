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

});

export { validationSchema };
