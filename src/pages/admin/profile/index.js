import { UserPrivate } from "../../../components/atoms/Route/UserPrivate";
import { Profile } from "../../../components/organims/Profile";
import { DashboardView } from "../../../components/templates/DashboardView";

function ProfilePage() {
  return (
    <UserPrivate>
      <DashboardView>
        <Profile />
      </DashboardView>
    </UserPrivate>
  );
}

export default ProfilePage;
