import { TokenConnectedResponse } from './../interfaces/connected';
export const tokenData: TokenConnectedResponse = {
  datos: {
    connected: false,
    tokens: [
      {
        slot: 1,
        serial: '203531650003002A',
        name: 'Feitian Technologies Co., Ltd',
        model: 'ePass2003',
      },
      {
        slot: 2,
        serial: '203531650008002A',
        name: 'LUIS FERNANDO ARGANDOÑA ESPADA',
        model: 'ePass2007',
      },
    ],
  },
  finalizado: false,
  mensaje: 'Tokens detectados correctamente',
};
