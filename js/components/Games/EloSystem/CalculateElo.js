//https://de.wikipedia.org/wiki/Elo-Zahl

//NewElo for user = 500

const CalculateNewElo = (EloUser1, EloUser2, user1Win, user2Win) => {
    Ea = 1 / (1 + 10 ^ ((EloUser1 - EloUser2) / 400))
    Eb = 1 -Ea

    NewElo = {
        NewEloUser1: 0,
        NewEloUser2: 0,
        EloGainUser1: 0,
        EloGainUser2: 0
    }

    if (user1Win === 1) {       //player 1 won
        NewElo.EloGainUser2 = 10 * (0 - Ea) 
        NewElo.NewEloUser2 = EloUser2 + NewElo.EloGainUser2
        NewElo.EloGainUser1 = 10 * (1 - Eb) 
        NewElo.NewEloUser1 = EloUser1 + NewElo.EloGainUser1
    }
    else if (user2Win === 1) {       //player 2 won
        NewElo.EloGainUser2 = 10 * (1 - Ea) 
        NewElo.NewEloUser2 = EloUser2 + NewElo.EloGainUser2
        NewElo.EloGainUser1 = 10 * (0 - Eb) 
        NewElo.NewEloUser1 = EloUser1 + NewElo.EloGainUser1
    }
    else {  //remi
        NewElo.EloGainUser2 = 10 * (0,5 - Ea) 
        NewElo.NewEloUser2 = EloUser2 + NewElo.EloGainUser2
        NewElo.EloGainUser1 = 10 * (0,5 - Eb) 
        NewElo.NewEloUser1 = EloUser1 + NewElo.EloGainUser1
    }
    return NewElo;
}

export default CalculateNewElo;