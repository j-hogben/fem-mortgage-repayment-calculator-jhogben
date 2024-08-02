// const { doc } = require("prettier");

const calculatorForm = document.querySelector("#mortgage-calculator");

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ SHOW RESULTS SECTION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
const showResults = () => {
  const emptyResults = document.querySelector("#empty-results");
  const completedResults = document.querySelector("#completed-results");

  emptyResults.classList.add("hidden");
  completedResults.classList.remove("hidden");
};

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ MORTGAGE CALCULATOR FUNCTION ~ ~ ~ ~ ~ ~ ~ ~ ~

const calculateMortgage = () => {
  // REMOVE COMMA SEPARATORS FROM INCOMING INPUT VALUES
  const mortgageAmount = parseFloat(
    calculatorForm.querySelector("#mortgage-amount").value.replace(/,/g, ""),
  );
  const mortgageTerm = parseFloat(
    calculatorForm.querySelector("#mortgage-term").value.replace(/,/g, ""),
  );
  const interestRate = parseFloat(
    calculatorForm.querySelector("#interest-rate").value.replace(/,/g, ""),
  );
  const mortgageType = calculatorForm.querySelector(
    'input[name="mortgage-type"]:checked',
  ).value;
  //
  const monthlyRepaymentResult = document.querySelector("#monthly-repayments");
  const totalRepaymentResult = document.querySelector("#total-repayment");
  const P = mortgageAmount; /* principal mortgage amount */
  const r = interestRate / 100 / 12; /* monthly interest rate */
  const n = mortgageTerm * 12; /* number of repayments */

  const repaymentMortgage = () => {
    // CALCULATION:
    // M = P * (r * ((1+r) to the power of n)) / (((1+r) to the power of n) -1);

    // MONTHLY REPAYMENT
    const monthlyRepayment =
      P * ((r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

    // TOTAL REPAYMENT
    const totalRepayment = monthlyRepayment * n;

    // RETURN OBJECT WITH MONTHLY AND TOTAL REPAYMENT AMOUNTS
    return {
      monthly: monthlyRepayment,
      total: totalRepayment,
    };
  };

  const interestOnlyMortgage = () => {
    // CALCULATION:
    // M = P * r;

    // MONTHLY REPAYMENT
    const monthlyRepayment = P * r;

    // TOTAL REPAYMENT
    const totalRepayment = monthlyRepayment * n;

    return {
      monthly: monthlyRepayment,
      total: totalRepayment,
    };
  };

  // FORMAT REPAYMENT CURRENCY AMOUNTS
  const formatCurrency = (value) => {
    // ROUND VALUE TO 2 DECIMAL PLACES
    value = value.toFixed(2);
    /* IF AFTER ROUNDING, THE VALUE IS AN INTEGER (OR ENDS .00), 
    REMOVE ANY DECIMAL AND ANY SUBSEQUENT ZEROS */
    const isInteger = value % 1 === 0;
    return `£${new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: isInteger ? 0 : 2,
      maximumFractionDigits: isInteger ? 0 : 2,
    }).format(value)}`;
  };

  // UPDATE HTML RESULTS TEXT CONTENT
  if (!mortgageType) {
    console.log("No mortgage type selected");
  } else if (mortgageType === "repayment") {
    const repaymentResult = repaymentMortgage();
    monthlyRepaymentResult.textContent = formatCurrency(
      repaymentResult.monthly,
    );
    totalRepaymentResult.textContent = formatCurrency(repaymentResult.total);
  } else if (mortgageType === "interest-only") {
    const interestOnlyResult = interestOnlyMortgage();
    monthlyRepaymentResult.textContent = formatCurrency(
      interestOnlyResult.monthly,
    );
    totalRepaymentResult.textContent = formatCurrency(interestOnlyResult.total);
  }
};

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ SELECT FIRST RADIO BUTTON ON NAVIGATION ~ ~ ~ ~ ~ ~ ~

document.addEventListener("DOMContentLoaded", () => {
  // MAKE NODELIST OF ALL RADIO GROUPS
  const radioGroups = document.querySelectorAll(".radio-group");
  /* FOR EACH RADIO GROUP, MAKE A NODELIST OF ALL RADIO BUTTONS WITHIN.
  WHEN FOCUSING IN THE GROUP, IF NO RADIO BUTTON IS CHECKED, CHECK THE 
  FIRST ONE AUTOMATICALLY */
  radioGroups.forEach((group) => {
    const radios = group.querySelectorAll('input[type="radio"]');
    group.addEventListener("focusin", () => {
      if (!Array.from(radios).some((radio) => radio.checked)) {
        radios[0].checked = true;
      }
    });
  });
});

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ FORMAT NUMBERS ON INPUT ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

document.addEventListener("DOMContentLoaded", () => {
  const numbersToFormat = calculatorForm.querySelectorAll(".format-input");

  /* ON INPUT, FORMAT FIELD VALUE BY REMOVING ANY CHARACTER OTHER THAN DIGITS 
  AND ONE DECIMAL POINT */
  numbersToFormat.forEach((number) => {
    number.addEventListener("input", (event) => {
      let input = event.target;
      let value = input.value.replace(/[^\d.]/g, "");

      // MATCH ADDS ALL (IN THIS CASE DECIMAL POINTS) TO AN ARRAY
      let decimalCount = (value.match(/\./g) || []).length;
      /* THEN IF THAT ARRAY HAS A LENGTH OF MORE THAN ONE, REMOVES SUBSEQUENT 
      DECIMAL POINTS ON INPUT */
      if (decimalCount > 1) {
        value = value.replace(/\./, "x").replace(/\./g, "").replace(/x/, ".");
      }

      input.value = value;
    });

    /* WHEN INPUT IS NO LONGER IN FOCUS, UPDATE FORMATTING TO 2 DECIMAL PLACES*/
    number.addEventListener("blur", (event) => {
      let input = event.target;
      let value = input.value;
      console.log(value);
      console.log(typeof value);
      if (value && !value.includes(",")) {
        let numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          if (!Number.isInteger(numValue)) {
            value = numValue.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          } else {
            value = numValue.toLocaleString();
          }
        }
      } else if (!value.includes(",")) {
        console.log(value);
        value = "";
      }
      input.value = value;
    });
  });
});

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CUSTOM FORM VALIDATION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// IGNORE HTML VALIDATION IF JAVASCRIPT IS ENABLED
calculatorForm.setAttribute("novalidate", "");

// VALIDATE FORM FUNCTION
const validateForm = (formSelector) => {
  // TOTAL FORM ERROR COUNT
  let formErrorCount = 0;

  // INPUT VALIDATION OPTIONS
  const validationOptions = [
    {
      attribute: "required",
      isValid: (input) => {
        if (input.type === "radio" || input.type === "checkbox") {
          // MAKE NODELIST OF ELEMENTS WITH SAME NAME ATTRIBUTE AS THE INPUT
          const selectionGroup = document.getElementsByName(input.name);
          // MAKE ARRAY FROM NODELIST AND CHECK FOR ANY CHECKED INPUT, RETURN BOOLEAN
          return Array.from(selectionGroup).some((option) => option.checked);
        } else {
          // CHECK FOR INPUT VALUE OF OTHER INPUT TYPES
          return input.value.trim() !== "";
        }
      },
      errorMessage: "This field is required",
    },
  ];

  // RUN THIS FUNCTION ON EACH FORMGROUP FROM 'FORMGROUPS' ARRAY
  const validateSingleFormGroup = (formGroup) => {
    const input = formGroup.querySelector("input");
    const errorContainer = formGroup.querySelector(".error");
    const inputContainer = formGroup.querySelector(".input-container");
    const inputUnit = formGroup.querySelector(".input-unit");

    // TEST INPUT AGAINST RELEVANT VALIDATION OPTIONS
    let formGroupError = false;
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage;
        formGroupError = true;
        if (input.type !== "radio" && input.type !== "checkbox") {
          inputContainer.classList.add("text-input-default-error");
          inputUnit.classList.add("input-unit-error");
          formErrorCount++;
        }
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      if (input.type !== "radio" && input.type !== "checkbox") {
        inputContainer.classList.remove("text-input-default-error");
        inputUnit.classList.remove("input-unit-error");
      }
    }
  };

  // MAKE ARRAY OF ALL FORM-GROUP CLASS ELEMENTS, AND RUN VALIDATION ON EACH
  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".form-group"),
    );

    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
    });
  };

  // RUN VALIDATION FUNCTION
  validateAllFormGroups(formSelector);

  return formErrorCount === 0;
};

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ON FORM SUBMIT ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validateForm(calculatorForm)) {
    calculateMortgage();
    showResults();
  }
});
