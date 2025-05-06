// "use strict";

// import { customType } from "drizzle-orm/pg-core";
// import { createCipheriv, createDecipheriv } from "crypto";

// const argon2 = require("argon2");

// export const hash = async (password) => {
//   try {
//     const computedHash = await argon2.hash(password);
//     return computedHash;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const verify = async (hash, password) => {
//   try {
//     if (await argon2.verify(hash, password)) {
//       // password match
//       return true;
//     } else {
//       // password did not match
//       return false;
//     }
//   } catch (err) {
//     // internal failure
//     console.log(err);
//   }
// };

// export const encryptedText = customType({
//   dataType() {
//     return "text";
//   },
//   fromDriver(value) {
//     let decipher = createDecipheriv(
//       process.env.ENC_TYPE,
//       process.env.ENC_KEY,
//       process.env.ENC_IV,
//     );
//     let decrypted = decipher.update(value, "base64", "utf8");
//     return decrypted + decipher.final("utf8");
//   },
//   toDriver(value) {
//     let cipher = createCipheriv(
//       process.env.ENC_TYPE,
//       process.env.ENC_KEY,
//       process.env.ENC_IV,
//     );
//     let encrypted = cipher.update(value, "utf8", "base64");
//     encrypted += cipher.final("base64");
//     return encrypted;
//   },
// });
