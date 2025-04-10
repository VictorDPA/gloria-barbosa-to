import React from "react";
import { FormSection } from "@/components/ui/FormSection";
import { Input } from "@/components/ui/Input";
import { PatientIdentification } from "@/lib/types";

type PatientSectionProps = {
  data: PatientIdentification;
  onChange: (data: Partial<PatientIdentification>) => void;
};

export const PatientSection: React.FC<PatientSectionProps> = ({
  data,
  onChange,
}) => {
  const handleInputChange = (key: keyof PatientIdentification) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ [key]: e.target.value });
    };
  };

  const handleFatherChange = (key: keyof PatientIdentification["father"]) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        father: {
          ...data.father,
          [key]: e.target.value,
        },
      });
    };
  };

  const handleMotherChange = (key: keyof PatientIdentification["mother"]) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        mother: {
          ...data.mother,
          [key]: e.target.value,
        },
      });
    };
  };

  return (
    <FormSection
      title="Identificação do Paciente"
      description="Informações gerais sobre o paciente"
      id="patient-identification"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="patient-name"
          label="Nome"
          value={data.name}
          onChange={handleInputChange("name")}
          required
          fullWidth
        />

        <Input
          id="patient-date-of-birth"
          label="Data de Nascimento"
          type="date"
          value={data.dateOfBirth}
          onChange={handleInputChange("dateOfBirth")}
          fullWidth
        />

        <Input
          id="patient-age"
          label="Idade"
          value={data.age}
          onChange={handleInputChange("age")}
          fullWidth
        />

        <Input
          id="patient-place-of-birth"
          label="Local de Nascimento"
          value={data.placeOfBirth}
          onChange={handleInputChange("placeOfBirth")}
          fullWidth
        />

        <Input
          id="patient-address"
          label="Endereço"
          value={data.address}
          onChange={handleInputChange("address")}
          fullWidth
        />

        <Input
          id="patient-phone"
          label="Telefone"
          value={data.phone}
          onChange={handleInputChange("phone")}
          fullWidth
        />

        <Input
          id="patient-city-district"
          label="Cidade/Bairro"
          value={data.cityDistrict}
          onChange={handleInputChange("cityDistrict")}
          fullWidth
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Informações do Pai
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="father-name"
            label="Nome"
            value={data.father.name}
            onChange={handleFatherChange("name")}
            fullWidth
          />

          <Input
            id="father-age"
            label="Idade"
            value={data.father.age}
            onChange={handleFatherChange("age")}
            fullWidth
          />

          <Input
            id="father-profession"
            label="Profissão"
            value={data.father.profession}
            onChange={handleFatherChange("profession")}
            fullWidth
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Informações da Mãe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="mother-name"
            label="Nome"
            value={data.mother.name}
            onChange={handleMotherChange("name")}
            fullWidth
          />

          <Input
            id="mother-age"
            label="Idade"
            value={data.mother.age}
            onChange={handleMotherChange("age")}
            fullWidth
          />

          <Input
            id="mother-profession"
            label="Profissão"
            value={data.mother.profession}
            onChange={handleMotherChange("profession")}
            fullWidth
          />
        </div>
      </div>
    </FormSection>
  );
};
