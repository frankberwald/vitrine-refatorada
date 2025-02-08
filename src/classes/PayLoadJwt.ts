import { Role } from "../entity/Role";
class PayloadJwt {
  firstName: string;
  email: string;
  userId: number;
  roles:Role[]
}

export default PayloadJwt