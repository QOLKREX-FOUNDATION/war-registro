import { AdopterPrivate } from "../../../components/atoms/Route/AdopterPrivate";
import { Password } from "../../../components/organims/Password";
import { DashboardView } from "../../../components/templates/DashboardView";

function PasswordPage() {
  return (
    <AdopterPrivate>
      <DashboardView>
        <Password />
      </DashboardView>
    </AdopterPrivate>
  );
}

export default PasswordPage;
