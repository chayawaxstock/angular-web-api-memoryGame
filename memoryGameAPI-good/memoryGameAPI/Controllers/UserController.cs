using memoryGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace memoryGameAPI.Controllers
{
    public class UserController : ApiController
    {

        public IEnumerable<User> Get()
        {
            return Global.UserList.Where(user => user.PartnerUserName == null).ToList();
        }

        [Route("api/user/{userName}")]
        [HttpGet]
        public User Get([FromUri]string userName)
        {
            return Global.UserList.FirstOrDefault(user => user.Name.Equals(userName));
        }

        // POST api/user
        public IHttpActionResult Post([FromBody]User user)
        {
            if (user.Name.Length >= 2 && user.Name.Length <= 10 &&
                user.Age >= 18 && user.Age <= 120&&Global.UserList.FirstOrDefault(user1=>user1.Name.Equals(user.Name))==null)
            {

                lock (Global.UserList)
                {
                    Global.UserList.Add(user);
                }
                return Ok(true);
            }
            return Content(HttpStatusCode.BadRequest, "user details not valid");
        }

        [Route("api/user/{name}")]
        [HttpPut]
        // PUT api/user/
        public IHttpActionResult Put([FromUri]string name, [FromBody]User choosingUser)
        {
            try
            {
                User user1 = Global.UserList.First(user => user.Name.Equals(name));
                User user2 = Global.UserList.First(user => user.Name.Equals(choosingUser.Name));
                lock (Global.UserList)
                {
                    user1.PartnerUserName = choosingUser.Name.ToString();
                    user2.PartnerUserName = name;
                }
                Game game = new Game();
                game.Player1 = user1;
                game.Player2 = user2;
                game.CurrentTurn = name;
                lock (Global.Games)
                {
                    Global.Games.Add(game);
                }
                return Ok(true);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, "error can not choosing player to play in the game");
            }
        }

    }
}
