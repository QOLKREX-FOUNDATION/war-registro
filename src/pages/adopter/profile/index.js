import { AdopterPrivate } from "../../../components/atoms/Route/AdopterPrivate";
import { Profile } from "../../../components/organims/Profile";
import { DashboardView } from "../../../components/templates/DashboardView";

function ProfilePage() {
  return (
    <AdopterPrivate>
      <DashboardView>
        <Profile />
      </DashboardView>
    </AdopterPrivate>
  );
}

export default ProfilePage;
