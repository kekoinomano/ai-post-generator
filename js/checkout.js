// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = Stripe("pk_live_51LcZjBFnusA8ZhWluRs2Plg5H4jo72uRvc0qJ3xOyYVwTTaaBrvF5T7RG5HKyDBrnS8I43eS5CplI8edvvd1yzKJ00q7fztJE3");
//const stripe = Stripe("pk_test_51LcZjBFnusA8ZhWlGYT0WIgXJr5tjXDBvyK2gItNh7UZJyP7Ul5pNjetw9pDQYVxzNVqaDsdXvZNZcSp7HX3Fzyp00rNFegZuh");


let elements;

checkStatus();


// Fetches a payment intent and captures the client secret
async function initialize(price) {

  setLoading(true);
  
  var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText);
      console.log(response.clientSecret);
      const clientSecret = response.clientSecret;
      elements = stripe.elements({ clientSecret });

      const paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");
      setLoading(false);
    }else if (this.readyState == 4 && this.status != 200){
      console.log("Error");
    }
  }
  xmlhttp.open("POST","https://webator.es/gpt3_api/create.php",true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("price=" + price);
}


async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: window.location.href,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  switch (paymentIntent.status) {
    case "succeeded":
    console.log(paymentIntent)
      showMessage("Payment succeeded!");
      console.log(paymentIntent.client_secret);
      update_token(200, paymentIntent.client_secret);
      break;
    case "processing":
      showMessage("Your payment is processing.");
      break;
    case "requires_payment_method":
      showMessage("Your payment was not successful, please try again.");
      break;
    default:
      showMessage("Something went wrong.");
      break;
  }
}

// ------- UI helpers -------

function showMessage(messageText) {
  const messageContainer = document.querySelector("#payment-message");

  messageContainer.classList.remove("hidden");
  messageContainer.textContent = messageText;

  setTimeout(function () {
    messageContainer.classList.add("hidden");
    messageText.textContent = "";
  }, 4000);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("#submit").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("#submit").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
}