const { default: axios } = require("axios");
const createHttpError = require("http-errors");

require("dotenv").config();

async function zarinpalRequest({ user, amount, description = "خرید" }) {
  const result = await axios
    .post(
      process.env.ZARINPAL_REQUEST_URL,
      {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        callback_url: process.env.ZARINPAL_CALLBACK_URL,
        amount: amount * 10,
        description,
        metadata: {
          email: "example@gmail.com",
          mobile: user?.mobile,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
  console.log(result);

  if (result?.data?.authority) {
    return {
      authority: result?.data?.authority,
      payment_url: `${process.env.ZARINPAL_GATEWAY_URL}/${result?.data?.authority}`,
    };
  }
  throw createHttpError(400, "zarinpal service not available");
}
async function zarinpalVerify(amount, authority) {
  const result = await axios
    .post(
      process.env.ZARINPAL_VERIFY_URL,
      {
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        authority,
        amount: amount * 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => {
      return err;
    });
  if (result?.data?.code == 100) {
    return result?.data;
  } else if (result?.data?.code == 101) {
    throw createHttpError(409, "Already verified payment");
  }
  throw createHttpError(500, "some thing is wrong!");
}

module.exports = {
  zarinpalRequest,
  zarinpalVerify,
};
