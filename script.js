// javascript code
const mortage_amount = document.querySelector("#amount");
const mortage_term = document.querySelector("#term");
const mortage_rate = document.querySelector("#rate");
const button = document.querySelector(".cal");
const clear_all = document.querySelector(".clear-all");
const result = document.querySelector(".result");
const REPAYMENT = document.querySelector("#repayment");
const INTEREST = document.querySelector("#interset");
const radioButtons = document.querySelectorAll('input[name="mortage"]');
const output = document.querySelector("#output");

let count = 0;
let int = 0; // this is useful for dont repeat the result

button.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  // Clear previous output
  output.innerHTML = "";

  //validate inputs

  if (!validateInputs()) {
    return; // Stop execution if validation fails
  }

  let mortageamount = parseFloat(mortage_amount.value);
  let mortageterm = parseInt(mortage_term.value);
  let mortagerate = parseFloat(mortage_rate.value) / 100 / 12; // Convert annual rate to monthly and percentage to decimal

  // Calculate the number of payments
  let n = mortageterm * 12; // Assuming the term is in years

  // Check which radio button is selected
  let selectedCalculationType = document.querySelector(
    'input[name="mortage"]:checked'
  ).value;

  if (selectedCalculationType === "repayment") {
    // Calculate the monthly payment using the formula
    let monthlyPayment =
      (mortageamount * mortagerate * Math.pow(1 + mortagerate, n)) /
      (Math.pow(1 + mortagerate, n) - 1);

    let totalRepayment = monthlyPayment * n;

    showResult(monthlyPayment, totalRepayment);
  } else if (selectedCalculationType === "interest") {
    // Calculate the monthly interest payment
    let interestPayment = mortageamount * mortagerate; // Monthly interest payment
    showInterestResult(interestPayment); //pass arguments
  }
});

//validate function

function validateInputs() {
  let isValid = true;
  let errorMessage = "";

  // Validate mortgage amount
  if (
    !mortage_amount.value ||
    isNaN(mortage_amount.value) ||
    parseFloat(mortage_amount.value) <= 0
  ) {
    errorMessage += "Please enter a valid mortgage amount.\n";
    isValid = false;
  }

  // Validate mortgage term
  if (
    !mortage_term.value ||
    isNaN(mortage_term.value) ||
    parseInt(mortage_term.value) <= 0
  ) {
    errorMessage += "Please enter a valid mortgage term in years.\n";
    isValid = false;
  }

  // Validate mortgage rate
  if (
    !mortage_rate.value ||
    isNaN(mortage_rate.value) ||
    parseFloat(mortage_rate.value) <= 0
  ) {
    errorMessage += "Please enter a valid interest rate.\n";
    isValid = false;
  }

  // If not valid, alert the user
  if (!isValid) {
    alert(errorMessage);
  }

  return isValid;
}

//function of showresult
function showResult(monthlyPayment, totalRepayment) {
  // pass parameters
  count++;

  if (count > 0) {
    output.innerHTML = `<h1 class="outpara">Your results</h1>
            <p class="pout">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>

             <div class="result-container">
              <p>Your monthly repayments</p>
              <p class="month">$ ${monthlyPayment.toFixed(
                2
              )}</p><hr style="color: hsl(202, 55%, 16%);">
              <p>Total you'll repay over the term</p>
              <p class="totalincome">$ ${totalRepayment.toFixed(2)}</p>
            </div> `;

    output.style.display = "flex";
    output.style.flexDirection = "column"; // Ensure vertical stacking
    output.style.alignItems = "center";
    // output.style.display = "block";
    result.style.display = "none";
  } else {
    return;
  }
}

//interset result

function showInterestResult(interestPayment) {
  int++;

  if (int > 0) {
    output.innerHTML = `<h1 class="outpara">Your results</h1>
            <p class="pout">Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate interest" again.</p>

             <div class="result-container">
              <p>Your monthly interest payment</p>
              <p class="interest">$ ${interestPayment.toFixed(
                2
              )}</p><hr style="color: hsl(202, 55%, 16%);">
            </div> `;

    // output.style.display = "block";
    output.style.display = "flex";
    output.style.flexDirection = "column";
    output.style.alignItems = "center";
    result.style.display = "none";
  } else {
    return;
  }
}

// button.addEventListener("click", showResult);

//  clear all the data
clear_all.addEventListener("click", () => {
  location.reload();
});
