import React from "react";
import { SwapiServiceConsumer } from "../swapi-service-context";

const withSwapiService = (mapMethodToProps) => (Wrapped) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
        {(swapiService) => {
          const serviceProps = mapMethodToProps(swapiService);
          return (
            <Wrapped {...props} {...serviceProps} swapiService={swapiService} />
          );
        }}
      </SwapiServiceConsumer>
    );
  };
};
export { withSwapiService };
