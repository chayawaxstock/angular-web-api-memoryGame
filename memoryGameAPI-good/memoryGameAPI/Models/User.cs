using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace memoryGameAPI.Models
{
    public class User
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string PartnerUserName { get; set; }
        public int Score { get; set; }
    }
}