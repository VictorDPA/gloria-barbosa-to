
import React from 'react';
import { Anamnese, YesNoDetail, YesNoDependency, YesNoMonths } from '@/lib/types';
import { formatDate } from '@/lib/utils';

type PrintViewProps = {
  data: Anamnese;
};

export const PrintView: React.FC<PrintViewProps> = ({ data }) => {
  // Função para renderizar campos yes/no com detalhes
  const renderYesNoDetail = (item: YesNoDetail | undefined) => {
    if (!item) return 'Não';
    
    if (item.yes) {
      return (
        <>
          <span className="font-semibold">Sim</span>
          {item.details && (
            <div className="mt-1 ml-4 text-sm">{item.details}</div>
          )}
        </>
      );
    }
    
    return 'Não';
  };
  
  // Função para renderizar campos yes/no com meses
  const renderYesNoMonths = (item: YesNoMonths | undefined) => {
    if (!item) return 'Não';
    
    if (item.yes) {
      return (
        <>
          <span className="font-semibold">Sim</span>
          {item.months && (
            <span className="ml-2">({item.months} meses)</span>
          )}
        </>
      );
    }
    
    return 'Não';
  };
  
  // Função para renderizar campos yes/no com dependência
  const renderYesNoDependency = (item: YesNoDependency | undefined) => {
    if (!item) return 'Não';
    
    if (item.yes) {
      let dependencyText = '';
      
      if (item.dependencyLevel.dependent) {
        dependencyText = 'Dependente';
      } else if (item.dependencyLevel.semiDependent) {
        dependencyText = 'Semi-dependente';
      } else if (item.dependencyLevel.independent) {
        dependencyText = 'Independente';
      }
      
      return (
        <>
          <span className="font-semibold">Sim</span>
          {dependencyText && (
            <span className="ml-2">({dependencyText})</span>
          )}
          {item.details && (
            <div className="mt-1 ml-4 text-sm">{item.details}</div>
          )}
        </>
      );
    }
    
    return 'Não';
  };
  
  // Função para renderizar um campo do formulário
  const renderField = (label: string, value: string | number | boolean | null | undefined) => {
    return (
      <div className="mb-2">
        <span className="font-semibold">{label}:</span>{' '}
        <span>{value ? value.toString() : '-'}</span>
      </div>
    );
  };
  
  // Função para renderizar uma seção do formulário
  const renderSection = (title: string, children: React.ReactNode) => {
    return (
      <div className="mb-6 break-inside-avoid">
        <h2 className="text-xl font-bold border-b border-slate-900 pb-1 mb-3">{title}</h2>
        <div className="pl-4">{children}</div>
      </div>
    );
  };
  
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto print:shadow-none print:p-0">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">ANAMNESE</h1>
        {data.patientIdentification.name && (
          <p className="text-lg font-medium mt-2">{data.patientIdentification.name}</p>
        )}
        <p className="text-sm mt-1">
          {formatDate(data.evaluation.evaluationDate) || 'Data não informada'}
        </p>
      </div>
      
      {/* Avaliação */}
      {renderSection('Avaliação', (
        <>
          {renderField('Data', formatDate(data.evaluation.evaluationDate))}
          {renderField('Dia da Semana', data.evaluation.weekDay)}
          {renderField('Horário', data.evaluation.time)}
        </>
      ))}
      
      {/* Identificação do Paciente */}
      {renderSection('Identificação do Paciente', (
        <>
          {renderField('Nome', data.patientIdentification.name)}
          {renderField('Data de Nascimento', formatDate(data.patientIdentification.dateOfBirth))}
          {renderField('Idade', data.patientIdentification.age)}
          {renderField('Local de Nascimento', data.patientIdentification.placeOfBirth)}
          {renderField('Endereço', data.patientIdentification.address)}
          {renderField('Telefone', data.patientIdentification.phone)}
          {renderField('Cidade/Bairro', data.patientIdentification.cityDistrict)}
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Informações do Pai:</h3>
            <div className="pl-4">
              {renderField('Nome', data.patientIdentification.father.name)}
              {renderField('Idade', data.patientIdentification.father.age)}
              {renderField('Profissão', data.patientIdentification.father.profession)}
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Informações da Mãe:</h3>
            <div className="pl-4">
              {renderField('Nome', data.patientIdentification.mother.name)}
              {renderField('Idade', data.patientIdentification.mother.age)}
              {renderField('Profissão', data.patientIdentification.mother.profession)}
            </div>
          </div>
        </>
      ))}