<script>
  // import createForm from "@spaceavocado/svelte-form";
  import createForm, { required, email } from "@spaceavocado/svelte-form";
  import TextInput from "./TextInput.svelte";
  import Button from "./Button.svelte";
  import Checkbox from "./Checkbox.svelte";
  import { afterUpdate } from "svelte";

  // https://www.npmjs.com/package/@spaceavocado/svelte-form#create-the-form
  const form = createForm(
    // Form fields
    {
      username: "",
      password: "",
    },
    // Form validation - optional
    // Collection of validation rules or single rule.
    {
      username: [
        required("This field is required"),
        email("Invalid email format"),
      ],
      password: required("This field is required"),
    }
  );

  // Get the form current data
  const data = form.data();
  console.log(data);
  console.log($form.valid);

  afterUpdate(async () => {
    console.log(data);
  });
</script>

<style type="text/scss">
  .application-form {
    width: 100%;
  }

  p {
    font-size: 12px;
    margin-bottom: 10px;
  }
</style>

<h1>Uniform Residential Loan Application</h1>
<p>
  This application is designed to be completed by the applicant(s) with the
  Lender’s assistance. Applicants should complete this form as “Borrower” or
  “Co-Borrower,” as applicable. Co-Borrower information must also be provided
  (and the appropriate box checked) when  the income or assets of a person other
  than the Borrower (including the Borrower’s spouse) will be used as a basis
  for loan qualification or  the income or assets of the Borrower’s spouse or
  other person who has community property rights pursuant to state law will not
  be used as a basis for loan qualification, but his or her liabilities must be
  considered because the spouse or other person has community property rights
  pursuant to applicable law and Borrower resides in a community property state,
  the security property is located in a community property state, or the
  Borrower is relying on other property located in a community property state as
  a basis for repayment of the loan.
</p>
<p>
  If this is an application for joint credit, Borrower and Co-Borrower each
  agree that we intend to apply for joint credit (sign below):
</p>

<form class="application-form">
  <TextInput {form} name="username" />
  <TextInput {form} name="password" />
  <Checkbox {form} name="ABC" />
  <Checkbox {form} name="DEF" />
  <Checkbox {form} name="GHI" />
  <Button {form} />
</form>
