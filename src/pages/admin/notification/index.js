import { AdopterPrivate } from "../../../components/atoms/Route/AdopterPrivate";
import { UserPrivate } from "../../../components/atoms/Route/UserPrivate";
import { PageSectionContainer } from "../../../components/containers/PageSectionContainer";
import { NotificationView } from "../../../components/organims/Notification";
import { DashboardView } from "../../../components/templates/DashboardView";
import { SocketProvider } from "../../../contexts/Socket/SocketProvider";

function ProfilePage() {
    return (
        <UserPrivate>
            <DashboardView>
                <PageSectionContainer
                    title="Notificaciones"
                    category=""
                >
                    <SocketProvider>
                        <NotificationView />
                    </SocketProvider>
                </PageSectionContainer>
            </DashboardView>
        </UserPrivate >
    );
}

export default ProfilePage;
