const calculatorForm = document.querySelector("#mortgage-calculator");



// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ CUSTOM FORM VALIDATION ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// IGNORE HTML VALIDATION IF JAVASCRIPT IS ENABLED
calculatorForm.setAttribute("novalidate", "");

// VALIDATE FORM FUNCTION
const validateForm = (formSelector) => {
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
        if (input.type !== "radio" || input.type !== "checkbox") {
          inputContainer.classList.add("text-input-default-error");
          inputUnit.classList.add("input-unit-error");
        }
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      if (input.type !== "radio" || input.type !== "checkbox") {
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
};

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ MORTGAGE CALCULATOR FUNCTION ~ ~ ~ ~ ~ ~ ~ ~ ~

// //////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////

// ~ ~ ~ ~ ~ ~ ~ ~ ~ RUN VALIDATION ON FORM SUBMIT ~ ~ ~ ~ ~ ~ ~ ~ ~

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm(calculatorForm);
});
