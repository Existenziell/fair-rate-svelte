<script>
  import createForm, { required, email } from "@spaceavocado/svelte-form";
  import TextInput from "./TextInput.svelte";
  import Button from "./Button.svelte";
  import { afterUpdate, beforeUpdate } from "svelte";
  import { formData } from "../stores";
  import Section1 from "./Section1.svelte";
  import Intro from "./Intro.svelte";
  import Section9 from "./Section9.svelte";

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

  const handleSubmit = () => {
    if ($form.valid) {
      console.log("VALID");
      // save(form);
    }
  };

  beforeUpdate(async () => {
    console.log($formData);
  });

  afterUpdate(async () => {
    // Get the form current data
    // const data = form.data();
    // console.log(data);
    // console.log(`valid: ${$form.valid}`);
    console.log($formData);
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

<Intro />

<form on:submit|preventDefault={handleSubmit} class="application-form">
  <Section1 {form} />

  <section>
    <h2>II. PROPERTY INFORMATION AND PURPOSE OF LOAN</h2>
    <TextInput {form} name="username" />
    <TextInput {form} name="password" />
  </section>
  <section>
    <h2>III. BORROWER INFORMATION</h2>
  </section>
  <section>
    <h2>IV. EMPLOYMENT INFORMATION</h2>
  </section>
  <section>
    <h2>V. MONTHLY INCOME AND COMBINED HOUSING EXPENSE INFORMATION</h2>
  </section>
  <section>
    <h2>VI. ASSETS AND LIABILITIES</h2>
  </section>
  <section>
    <h2>VII. DETAILS OF TRANSACTION</h2>
  </section>
  <section>
    <h2>VIII. DECLARATIONS</h2>
  </section>

  <Section9 />

  <section>
    <h2>X. INFORMATION FOR GOVERNMENT MONITORING PURPOSES</h2>
    <p>
      The following information is requested by the Federal Government for
      certain types of loans related to a dwelling in order to monitor the
      lender's compliance with equal credit opportunity, fair housing and ho me
      mortgage disclosure laws . You are no t requ ired to furnish this in
      formation, bu t are en couraged to do so . Th e law p rovides t hat a le
      nder may not discriminate ei ther o n t he bas is of t his information, or
      on whether you choose to furnish it. If y ou furnish the information,
      please provide both ethnicity and race. Fo r race, you may check m ore
      than one designation. If you do not furnish ethnicity, race, or sex, under
      Federal regulations, this lender is required to note the information on
      the basis of visual observation and surname if you have made this
      application in person. If you do not wish to furnish the information,
      please check the box below. (Lender must review the above material to
      assure that the disclosures satisfy all requirements to which the lender
      is subject under applicable state law for the particular type of loan
      applied for.)
    </p>
  </section>
  <section>
    <h2>CONTINUATION SHEET/RESIDENTIAL LOAN APPLICATION</h2>
  </section>
  <Button />
</form>
