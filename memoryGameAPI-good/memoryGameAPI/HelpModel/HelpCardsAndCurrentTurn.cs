using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace memoryGameAPI.HelpModel
{
    public class HelpCardsAndCurrentTurn
    {
        public string CurrentTurn { get; set; }
        public Dictionary<string,string> CardList { get; set; }
        public List<string> CardsRandom { get; set; }
    }
}