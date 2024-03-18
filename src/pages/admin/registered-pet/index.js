import { UserPrivate } from "../../../components/atoms/Route/UserPrivate";
import { RegisteredPet } from "../../../components/organims/RegisteredPet/RegisteredPet";
import { DashboardView } from "../../../components/templates/DashboardView";

function MyRegistresPage() {
	return (
		<>
			<UserPrivate>
				<DashboardView>
					<RegisteredPet />
				</DashboardView>
			</UserPrivate>
		</>
	);
}

export default MyRegistresPage;
