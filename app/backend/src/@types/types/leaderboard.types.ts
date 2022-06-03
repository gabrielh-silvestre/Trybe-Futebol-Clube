type Attributes = {
  id: number;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

type CreationAttributes = Omit<Attributes, 'id'>;

type Options = 'teamHome' | 'teamAway' | undefined;

export type LeaderBoardAttributes = Attributes;
export type LeaderBoardCreation = CreationAttributes;
export type LeaderBoardOptions = Options;

// {
// OK //   name: 'Palmeiras',
//   totalPoints: 13,  # vitórias * 3 | empates * 1 | derrotas * 0
// OK //   totalGames: 5,
//   totalVictories: 4,
//   totalDraws: 1,
//   totalLosses: 0,
// OK //   goalsFavor: 17,
// OK //   goalsOwn: 5,
//   goalsBalance: 12,
//   efficiency: 86.67,  # total de pontos / ( total de jogos * 3 ) * 100
// };

// Desempate: 1º: Total de Vitórias, 2º: Saldo de Gols, 3º: Gols a Favor, 4º: Gols Sofridos
// Somente partidas finalizadas
