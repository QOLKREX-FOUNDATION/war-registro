import { UserPrivate } from "../../../components/atoms/Route/UserPrivate";
import { Dashboard } from "../../../components/organims/Dashboard/Dashboard";
import { DashboardView } from "../../../components/templates/DashboardView";

function MyRegistresPage() {
    return (
        <>
            <UserPrivate>
                <DashboardView>
                    <Dashboard />
                </DashboardView>
            </UserPrivate>
        </>
    );
}

export default MyRegistresPage;
