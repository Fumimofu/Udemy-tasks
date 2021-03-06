        /*
        GAME RULES:
        - The game has 2 players, playing in rounds
        - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
        - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
        - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
        - The first player to reach 100 points on GLOBAL score wins the game
        */

        let scores, roundScore, activePlayer, gamePlaying;

        init();

        document.querySelector('.btn-roll').addEventListener('click', function() {
            if (gamePlaying) {
                const dice = Math.floor (Math.random() * 6) + 1;

                const diceDOM = document.querySelector('.dice');
                diceDOM.style.display = 'block';
                diceDOM.src = 'dice-' + dice + '.png';

                if (dice !== 1) {
                    roundScore += dice;
                    document.getElementById('current-' + activePlayer).innerHTML = roundScore;
                } else {
                    nextPlayer();
                }
            }
        });

        document.querySelector('.btn-hold').addEventListener('click', function() {
            if (gamePlaying) {
                scores[activePlayer] += roundScore;
                document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];

                if (scores[activePlayer] >= 20) {
                    document.getElementById('name-' + activePlayer).innerHTML = 'Winner!';
                    document.querySelector('.dice').style.display = 'none';
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    gamePlaying = false;
                } else {
                    nextPlayer();
                }
            }
        });

        document.querySelector('.btn-new').addEventListener('click', init);

        function init() {
            scores = [0, 0];
            roundScore = 0;
            activePlayer = 0;

            gamePlaying = true;

            document.querySelector('.dice').style.display = 'none';

            document.getElementById('score-0').innerHTML = 0;
            document.getElementById('score-1').innerHTML = 0;

            document.getElementById('current-0').innerHTML = 0;
            document.getElementById('current-1').innerHTML = 0;

            document.getElementById('name-0').innerHTML = 'Player 1';
            document.getElementById('name-1').innerHTML = 'Player 2';

            document.querySelector('.player-0-panel').classList.remove('winner');
            document.querySelector('.player-1-panel').classList.remove('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');
            document.querySelector('.player-0-panel').classList.add('active');
        }

        function nextPlayer() {
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

            roundScore = 0;
            document.getElementById('current-0').innerHTML = roundScore;
            document.getElementById('current-1').innerHTML = roundScore;

            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
        }
