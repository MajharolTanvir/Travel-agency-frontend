import { redirect } from "next/navigation";

const Authentication = () => {
  return redirect("/authentication/signin");
};

export default Authentication;
