import React, { useState } from "react";
import Service from './Service'





const Services = ({ services, selectedService, onSelectService }) => {
  return (
    <div className="services-container w-100">
      {services.map((service) => (
        <Service
          key={service.id}
          id={service.id}
          name={service.name}
          desc={service.desc}
          selectedService={selectedService}
          onSelectService={onSelectService}
        />
      ))}
    </div>
  );
};

export default Services