import axios from 'axios';

export interface AddressData {
  street: string;
  number?: number;
  complement?: string
  district: string;
  city: string;
  state: string;
  zip_code: string;
  country?: string;
}

const getAddressFromCEP = async (cep: string): Promise<AddressData | null> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.cep) {
      const addressData: AddressData = {
        street: response.data.logradouro,
        district: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
        zip_code: response.data.cep
      };

      return addressData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao consultar o CEP:', error);
    return null;
  }
};

export default getAddressFromCEP;