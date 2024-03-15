import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const JWT_SECRET = "ajay@1234.";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload : JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }

  public static decodeToken(token: string) {
    const decoded = JWT.verify(token, JWT_SECRET);
    return decoded as JWTUser
  }
}

export default JWTService;