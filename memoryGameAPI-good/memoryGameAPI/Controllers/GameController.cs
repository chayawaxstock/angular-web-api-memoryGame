using memoryGameAPI.HelpModel;
using memoryGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace memoryGameAPI.Controllers
{
    public class GameController : ApiController
    {

        [Route("api/game/{userName}")]
        public IHttpActionResult Get([FromUri]string userName)
        {
            Game currentGame = Global.Games.Find(game => game.Player1.Name.Equals(userName) || game.Player2.Name.Equals(userName));
            if (currentGame == null)
                return NotFound();
            return Ok(new HelpCardsAndCurrentTurn() { CardList = currentGame.CardArray, CurrentTurn = currentGame.CurrentTurn,CardsRandom=currentGame.CardsRandom });
        }

        
       
        [Route("api/game/{userName}")]
        [HttpPut]
        public IHttpActionResult Put([FromUri]string userName, [FromBody]string[] Cards)
        {
            Game currentGame = Global.Games.Find(game => game.Player1.Name.Equals(userName) || game.Player2.Name.Equals(userName));
            if (currentGame == null)
                return NotFound();
            if (Cards[0].Equals(Cards[1]))
            {
                lock (Global.Games)
                {
                    try
                    {
                        currentGame.CardArray[Cards[0]] = userName;
                        
                    }
                    catch (Exception)
                    {
                        return Content(HttpStatusCode.BadRequest, "error in this cards");
                    }

                }
                lock (Global.UserList)
                {
                    Global.UserList.Find(user => user.Name.Equals(userName)).Score++;
                }
            }
            lock (Global.Games)
            {
                currentGame.CurrentTurn = currentGame.CurrentTurn == currentGame.Player1.Name ? currentGame.Player2.Name : currentGame.Player1.Name;
            }
            return Ok(new HelpCardsAndCurrentTurn() { CardList = currentGame.CardArray, CurrentTurn = currentGame.CurrentTurn,CardsRandom=currentGame.CardsRandom });
        }

      
    }
}
