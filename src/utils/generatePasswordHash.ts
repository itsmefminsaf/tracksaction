import crypto from "crypto";

const generatePasswordHash = async (
  password: string,
): Promise<{ hash: string; salt: string }> => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(64).toString("hex").normalize();
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      const hash = derivedKey.toString("hex").normalize();
      resolve({ hash, salt });
    });
  });
};

export default generatePasswordHash;
