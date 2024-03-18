import { AdopterPrivate } from "../../../components/atoms/Route/AdopterPrivate";
import { PageSectionContainer } from "../../../components/containers/PageSectionContainer";
import { NotificationView } from "../../../components/organims/Notification";
import { DashboardView } from "../../../components/templates/DashboardView";
import { SocketProvider } from "../../../contexts/Socket/SocketProvider";

function ProfilePage() {
    return (
        <AdopterPrivate>
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
        </AdopterPrivate>
    );
}

export default ProfilePage;
