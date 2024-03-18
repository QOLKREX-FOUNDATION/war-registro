import { PageSectionContainer } from "../containers/PageSectionContainer";
import { Pet } from "../templates/PetWizard/Pet";

export const RegistryPet = () => {
  return (
    <PageSectionContainer category="opciones" title="ver mascota">
      <Pet />
    </PageSectionContainer>
  );
};
