import { UserPrivate } from "../../../components/atoms/Route/UserPrivate";
import { DashboardEntity } from "../../../components/organims/DashboardEntity/DashboardEntity";
import { DashboardView } from "../../../components/templates/DashboardView";

function MyRegistresPage() {
  return (
    <>
      <UserPrivate>
        <DashboardView>
          <DashboardEntity />
        </DashboardView>
      </UserPrivate>
    </>
  );
}

export default MyRegistresPage;
