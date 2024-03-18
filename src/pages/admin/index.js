import { UserPrivate } from "../../components/atoms/Route/UserPrivate";
import { AdminHome } from "../../components/organims/AdminHome";
import { DashboardView } from "../../components/templates/DashboardView";

export default function AdminMain() {
  return (
    <UserPrivate>
      <DashboardView>
        <AdminHome />
      </DashboardView>
    </UserPrivate>
  );
}
