import { Role } from "../entity/Role";
class PayloadJwt {
  name: string;
  email: string;
  userId: number;
  roles:Role[]
}

export default PayloadJwt