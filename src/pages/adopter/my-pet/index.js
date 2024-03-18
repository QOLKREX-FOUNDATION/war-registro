import { AdopterPrivate } from "../../../components/atoms/Route/AdopterPrivate";
import { MyPet } from "../../../components/organims/MyPet/MyPet";
import { DashboardView } from "../../../components/templates/DashboardView";

function MyPetPage() {
  return (
    <AdopterPrivate>
      <DashboardView>
        <MyPet />
      </DashboardView>
    </AdopterPrivate>
  );
}

export default MyPetPage;
