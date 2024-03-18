import { firuApi } from "../../../../api";
import { UserPrivate } from "../../../components/atoms/Route/UserPrivate";
import { PageSectionContainer } from "../../../components/containers/PageSectionContainer";
import { FormsManage } from "../../../components/organims/FormsManage/FormsManage";
import { DashboardView } from "../../../components/templates/DashboardView";

function ProfilePage() {
  return (
    <UserPrivate>
      <DashboardView>
        <PageSectionContainer title="" category="">
          <FormsManage isQr={true} />
        </PageSectionContainer>
      </DashboardView>
    </UserPrivate>
  );
}

export default ProfilePage;

// export const getStaticProps = async (ctx) => {
//   const { data } = await firuApi.get("/form");

//   console.log(data.forms);

//   return {
//     props: {
//       forms: data.forms,
//     },
//   };
// };
