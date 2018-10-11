using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace memoryGameAPI.Models
{
    
    public class Game
    {
        public static List<Game> Games;
        public User Player1 { get; set; }
        public User Player2 { get; set; }
        public string CurrentTurn { get; set; }
        public Dictionary<string,string> CardArray { get; set; }
        public List<string> CardsRandom { get; set; }

        public Game()
        {
            CardArray = new Dictionary<string, string>();
            CardsRandom = new List<string>();
            int i = 0;
            while (i<9)
            {       
               int numCard = new Random().Next(1, 100);
                if (CardArray.Keys.Contains(numCard.ToString()))
                    continue;
                CardArray.Add(numCard.ToString(), null);
                i++;
            }

            Random rnd = new Random();
            var listHelp = new List<string>();
            listHelp.AddRange(CardArray.Keys);
            listHelp.AddRange(CardArray.Keys);

            while(listHelp.Count>0)
            {
                int index = new Random().Next(0, listHelp.Count - 1);
                CardsRandom.Add(listHelp[index]);
                listHelp.RemoveAt(index);
            }
        }
    }
}