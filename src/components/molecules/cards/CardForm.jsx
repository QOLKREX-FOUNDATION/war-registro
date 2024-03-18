import { CardContainer } from "../../containers/CardContainer";

const Title = ({ title }) => {
  return (
    <div className="self-center mb-6 text-lg font-light text-gray-600 dark:text-white">
      {title}
    </div>
  );
};

const Content = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export const CardForm = ({ title = "default", children }) => {
  return (
    <CardContainer>
      <section className="px-8 py-10 text-center">
        <Title title={title} />
        <Content>{children}</Content>
      </section>
    </CardContainer>
  );
};
