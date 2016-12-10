require('../../ch7/animateworld');
require('./actiontypes');
require('./direction');
require('./elements');
require('./wolrd');

animateWorld(new LifelikeWorld(['####################################################',
    '#                 ####         ****              ###',
    '#   *  @  ##                 ########       OO    ##',
    '#   *    ##        O O                 ****       *#',
    '#       ##*                        ##########     *#',
    '#      ##***  *         ****                     **#',
    '#* **  #  *  ***      #########                  **#',
    '#* **  #      *               #   *              **#',
    '#     ##              #   O   #  ***          ######',
    '#*            @       #       #   *        O  #    #',
    '#*                    #  ######                 ** #',
    '###          ****          ***                  ** #',
    '#       O                        @         O       #',
    '#   *     ##  ##  ##  ##               ###      *  #',
    '#   **         #              *       #####  O     #',
    '##  **  O   O  #  #    ***  ***        ###      ** #',
    '###               #   *****                    ****#',
    '####################################################'], { '#': Wall,
    '@': Tiger,
    'O': SmartPlantEater,
    '*': Plant }));
