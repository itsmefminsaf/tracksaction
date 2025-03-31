import crypto from "crypto";

const comparePasswords = async (
  password: string,
  passwordFromDB: { hash: string; salt: string },
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, passwordFromDB.salt, 64, (err, derivedKey) => {
      if (err) return reject(err);

      const hashBuffer = Buffer.from(derivedKey.toString("hex"), "hex");
      const hashFromDBBuffer = Buffer.from(passwordFromDB.hash, "hex");
      resolve(crypto.timingSafeEqual(hashBuffer, hashFromDBBuffer));
    });
  });
};

export default comparePasswords;
