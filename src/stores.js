import { writable } from 'svelte/store';

export const formData = writable({

  section1: {
    checkboxes: [
      { value: "VA", checked: false },
      { value: "Conventional", checked: false },
      { value: "Other(explain):", checked: false },
      { value: "FHA", checked: false },
      { value: "USDA / Rural Housing Service", checked: false }
    ],
    agencyCaseNumber: {
      type: "text",
      label: "Agency Case Number",
      value: ""
    },
    lenderCaseNumber: {
      type: "text",
      label: "Lender Case Number",
      value: ""
    }
  }
});
