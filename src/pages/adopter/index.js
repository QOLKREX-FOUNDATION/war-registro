import { AdopterPrivate } from "../../components/atoms/Route/AdopterPrivate";
import { AdopterHome } from "../../components/organims/AdopterHome";
import { DashboardView } from "../../components/templates/DashboardView";

export default function AdopterMain() {
  return (
    <AdopterPrivate>
      <DashboardView>
        <AdopterHome />
      </DashboardView>
    </AdopterPrivate>
  );
}
