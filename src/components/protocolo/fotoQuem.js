// Colagem do bloco "Quem": quadros reais do SIOK 2025 (vídeos em Drive "Fotos - Vídeos/Siok/Takes - Siok Tiago")
// e o bastidor de uma gravação com médico (jun/2026). A primeira é a principal. Nos quadros menores
// aparece a outra pessoa junto (pedido do Tiago: ele não fica isolado). Cor tratada igual nas cinco.
import palco from "../../assets/protocolo/colagem/palco.webp";
import conversa from "../../assets/protocolo/colagem/conversa.webp";
import escuta from "../../assets/protocolo/colagem/escuta.webp";
import mesa from "../../assets/protocolo/colagem/mesa.webp";
import gravacao from "../../assets/protocolo/colagem/gravacao.webp";

export const colagem = [
  { src: palco, alt: "Tiago Santos no palco do SIOK 2025, com o microfone" },
  { src: conversa, alt: "Tiago Santos explicando a um médico no simpósio" },
  { src: escuta, alt: "Médico ouvindo Tiago Santos no simpósio" },
  { src: mesa, alt: "Tiago Santos na mesa de operação do evento" },
  { src: gravacao, alt: "Bastidor de uma gravação com médico" },
];

export const legendaColagem = "Bastidores do SIOK 2025 e de uma gravação com médico";
