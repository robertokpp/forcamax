import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;

if (!secret) {
  throw new Error("A variável SECRET é obrigatória.");
}

export const authConfig = {
  jwt: {
    secret,
    expiresIn: "24h" as const,
  },
};
